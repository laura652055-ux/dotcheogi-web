import { Link } from 'react-router-dom'
import {
  chapterStats,
  overallRate,
  partStats,
  streak,
  todayKey,
} from '../lib/storage.js'
import { percent } from '../lib/quiz.js'
import { chapterNo, groupChapters } from '../data/subjects/index.js'
import { useStore } from '../store.jsx'
import { Bar, Badge, Box, Btn, Divider, cx } from '../components/Pixel.jsx'
import Mascot from '../components/Mascot.jsx'

const HEATMAP_WEEKS = 12

export default function Stats() {
  const { subject, state, resetAll } = useStore()

  const stats = chapterStats(subject.questions, state.records)
  const parts = partStats(subject, state.records)
  const rate = overallRate(state.records)
  const solved = Object.keys(state.records).length
  const attempts = Object.values(state.records).reduce(
    (sum, r) => sum + r.correct + r.wrong,
    0,
  )

  // 약한 순으로 정렬. 어디부터 봐야 하는지가 통계의 핵심이다.
  const weakest = subject.chapters
    .map((ch) => {
      const s = stats.get(ch.id) ?? { total: 0, seen: 0, correct: 0, attempts: 0 }
      return { ch, ...s, rate: s.attempts === 0 ? null : s.correct / s.attempts }
    })
    .filter((row) => row.attempts > 0)
    .sort((a, b) => a.rate - b.rate)
    .slice(0, 3)

  const confirmReset = () => {
    const msg = `${subject.fullName}의 학습 기록을 지웁니다. 되돌릴 수 없습니다. 진행할까요?`
    if (window.confirm(msg)) resetAll()
  }

  const chapterRow = (ch) => {
    const s = stats.get(ch.id) ?? { total: 0, seen: 0, correct: 0, attempts: 0 }
    const r = s.attempts === 0 ? null : percent(s.correct, s.attempts)
    return (
      <li key={ch.id} className="box" style={{ padding: 'var(--d2) var(--d3)' }}>
        <div className="row-between">
          <span className="t-tiny">
            <span className="t-dim">{String(chapterNo(ch)).padStart(2, '0')} </span>
            {ch.name}
          </span>
          <span className="t-mono t-tiny">
            {s.total === 0 ? '—' : `${s.seen}/${s.total}`}
            {r != null && ` · ${r}%`}
          </span>
        </div>
        {s.total > 0 && (
          <div style={{ marginTop: 'var(--d1)' }}>
            <Bar value={s.seen} max={s.total} cells={16} />
          </div>
        )}
      </li>
    )
  }

  return (
    <div className="stack-lg" style={{ display: 'flex', flexDirection: 'column' }}>
      <header className="row" style={{ gap: 'var(--d3)' }}>
        <Mascot mood={rate != null && rate >= 0.6 ? 'happy' : 'think'} size={56} />
        <div>
          <h1 className="t-xl">학습 통계</h1>
          <p className="t-tiny t-dim">
            {subject.fullName} · 연속 {streak(state.days)}일 · 총 {attempts}회 시도 ·{' '}
            {solved}/{subject.questions.length}문제 접함
          </p>
        </div>
      </header>

      <Box title="학습 잔디" right={`최근 ${HEATMAP_WEEKS}주`}>
        <Heatmap days={state.days} />
        <div className="row t-tiny t-dim" style={{ marginTop: 'var(--d2)', gap: 'var(--d1)' }}>
          <span>적음</span>
          {[0, 25, 50, 75, 100].map((lv) => (
            <span
              key={lv}
              className={`heat-cell dither-${lv}`}
              style={{ display: 'inline-block' }}
            />
          ))}
          <span>많음</span>
        </div>
      </Box>

      {/* 과락이 있는 시험은 누적 정답률도 과목 단위로 봐야 한다 */}
      {subject.parts && (
        <Box title="과목별 누적" right={`과락 ${subject.partPassRate}%`}>
          <ul className="stack-sm" style={{ display: 'flex', flexDirection: 'column' }}>
            {subject.parts.map((part, i) => {
              const s = parts.get(part.id) ?? { total: 0, seen: 0, correct: 0, attempts: 0 }
              const r = s.attempts === 0 ? null : percent(s.correct, s.attempts)
              const risky = r != null && r < subject.partPassRate
              return (
                <li key={part.id}>
                  {i > 0 && <Divider dashed />}
                  <div style={{ paddingTop: i > 0 ? 'var(--d2)' : 0 }}>
                    <div className="row-between">
                      <span className="row t-tiny" style={{ gap: 'var(--d2)', minWidth: 0 }}>
                        <span className="t-dim">{part.code}</span>
                        <span>{part.name}</span>
                        {risky && <Badge solid>과락권</Badge>}
                      </span>
                      <span className="t-mono t-tiny" style={{ flex: 'none' }}>
                        {s.seen}/{s.total}
                        {r != null && ` · ${r}%`}
                      </span>
                    </div>
                    <div style={{ marginTop: 'var(--d1)' }}>
                      <Bar value={s.seen} max={s.total} cells={16} />
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </Box>
      )}

      {weakest.length > 0 && (
        <Box title="지금 약한 범위">
          <ul className="stack-sm" style={{ display: 'flex', flexDirection: 'column' }}>
            {weakest.map((row, i) => (
              <li key={row.ch.id}>
                {i > 0 && <Divider dashed />}
                <div className="row-between" style={{ paddingTop: i > 0 ? 'var(--d2)' : 0 }}>
                  <span className="t-tiny">{row.ch.name}</span>
                  <span className="t-mono t-tiny">{Math.round(row.rate * 100)}%</span>
                </div>
              </li>
            ))}
          </ul>
        </Box>
      )}

      <section className="stack">
        <h2 style={{ fontSize: 16 }}>{subject.chapterLabel}별</h2>
        {subject.parts ? (
          subject.parts.map((part) => (
            <div key={part.id} className="stack-sm">
              <div className="t-tiny t-dim">
                {part.code} · {part.name}
              </div>
              <ul className="stack-sm" style={{ display: 'flex', flexDirection: 'column' }}>
                {subject.chapters.filter((c) => c.part === part.id).map(chapterRow)}
              </ul>
            </div>
          ))
        ) : (
          groupChapters(subject).map((group) => (
            <div key={group.id ?? 'all'} className="stack-sm">
              {group.name && <div className="t-tiny t-dim">{group.name}</div>}
              <ul className="stack-sm" style={{ display: 'flex', flexDirection: 'column' }}>
                {group.chapters.map(chapterRow)}
              </ul>
            </div>
          ))
        )}
      </section>

      <div className="stack-sm" style={{ display: 'flex', flexDirection: 'column' }}>
        <Link to={`/${subject.id}`} className="btn btn-block btn-lg">
          홈으로
        </Link>
        <Btn size="sm" onClick={confirmReset}>
          {subject.name} 학습 기록 삭제
        </Btn>
      </div>
    </div>
  )
}

/** 잔디: 7행 x N열. 색 대신 디더링 농도로 빈도를 표현한다. */
function Heatmap({ days }) {
  const total = HEATMAP_WEEKS * 7
  const cells = []
  const cursor = new Date()
  // 이번 주 일요일까지 채워서 열이 깔끔하게 떨어지게 한다
  cursor.setDate(cursor.getDate() + (6 - cursor.getDay()))

  for (let i = 0; i < total; i += 1) {
    const key = todayKey(cursor)
    cells.unshift({ key, count: days[key] ?? 0 })
    cursor.setDate(cursor.getDate() - 1)
  }

  return (
    <div className="heatmap">
      {cells.map((cell) => (
        <span
          key={cell.key}
          className={cx('heat-cell', `dither-${level(cell.count)}`)}
          title={`${cell.key} · ${cell.count}문제`}
        />
      ))}
    </div>
  )
}

const level = (count) => {
  if (count === 0) return 0
  if (count < 5) return 25
  if (count < 15) return 50
  if (count < 30) return 75
  return 100
}
