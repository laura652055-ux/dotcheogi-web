import { useNavigate, useParams } from 'react-router-dom'
import { MODES } from '../data/shared.js'
import { chapterNo, groupChapters } from '../data/subjects/index.js'
import { chapterStats } from '../lib/storage.js'
import { percent } from '../lib/quiz.js'
import { useStore } from '../store.jsx'
import { Bar, Badge, Btn, Divider } from '../components/Pixel.jsx'

/** 챕터 선택 화면. 모드는 URL 에서 온다. (/adsp/select/study) */
export default function Select() {
  const { mode } = useParams()
  const navigate = useNavigate()
  const { subject, state } = useStore()

  const stats = chapterStats(subject.questions, state.records)
  const modeInfo = MODES[mode] ?? MODES.study

  // 오답 모드에서는 틀린 문제가 있는 챕터만 보여준다
  const wrongByChapter = new Set(
    state.wrongIds
      .map((id) => subject.questions.find((q) => q.id === id)?.chapter)
      .filter(Boolean),
  )

  const start = (chapter) =>
    navigate(
      chapter == null
        ? `/${subject.id}/quiz/${mode}`
        : `/${subject.id}/quiz/${mode}/${chapter}`,
    )

  const row = (ch) => {
    const s = stats.get(ch.id) ?? { total: 0, seen: 0, correct: 0, attempts: 0 }
    const empty = s.total === 0
    const disabled = empty || (mode === 'wrong' && !wrongByChapter.has(ch.id))
    const rate = s.attempts === 0 ? null : percent(s.correct, s.attempts)

    return (
      <li key={ch.id}>
        <button
          type="button"
          className="btn btn-block"
          disabled={disabled}
          onClick={() => start(ch.id)}
          style={{
            flexDirection: 'column',
            alignItems: 'stretch',
            gap: 'var(--d2)',
            padding: 'var(--d3)',
            textAlign: 'left',
          }}
        >
          <span className="row-between" style={{ width: '100%' }}>
            <span className="row" style={{ gap: 'var(--d2)', minWidth: 0 }}>
              <span
                className="t-tiny"
                style={{ flex: 'none', opacity: 0.6, width: 'var(--d6)' }}
              >
                {String(chapterNo(ch)).padStart(2, '0')}
              </span>
              <span className="t-head" style={{ fontSize: 15 }}>
                {ch.name}
              </span>
            </span>
            <span className="t-tiny" style={{ flex: 'none' }}>
              {empty ? '문제 없음' : `${s.seen}/${s.total}`}
              {rate != null && ` · ${rate}%`}
            </span>
          </span>
          {!empty && <Bar value={s.seen} max={s.total} cells={12} />}
        </button>
      </li>
    )
  }

  return (
    <div className="stack-lg" style={{ display: 'flex', flexDirection: 'column' }}>
      <header className="stack-sm">
        <div className="row" style={{ gap: 'var(--d2)' }}>
          <Badge solid>{modeInfo.label}</Badge>
          <span className="t-tiny t-dim">{modeInfo.desc}</span>
        </div>
        <h1 className="t-xl">범위 선택</h1>
      </header>

      <Btn size="lg" solid block onClick={() => start(null)}>
        전체 범위로 시작
      </Btn>

      {/* 과락이 있는 시험은 과목 단위가 곧 합격 판정 단위라, 그 묶음을 그대로 보여준다 */}
      {subject.parts ? (
        subject.parts.map((part) => (
          <section key={part.id} className="stack-sm">
            <div className="row-between">
              <h2 style={{ fontSize: 15 }}>
                <span className="t-dim">{part.code}</span> {part.name}
              </h2>
              <span className="t-tiny t-dim">{part.count}문항</span>
            </div>
            <Divider dashed />
            <ul className="stack-sm" style={{ display: 'flex', flexDirection: 'column' }}>
              {subject.chapters.filter((c) => c.part === part.id).map(row)}
            </ul>
          </section>
        ))
      ) : (
        // 과락은 없지만 범위 성격이 다른 과목은 묶음 제목을 달아 나눠 보여준다 (정처기: 빈틈 문제 / 용어 암기)
        groupChapters(subject).map((group) => (
          <section key={group.id ?? 'all'} className="stack-sm">
            {group.name && (
              <>
                <div className="row-between">
                  <h2 style={{ fontSize: 15 }}>{group.name}</h2>
                  <span className="t-tiny t-dim">
                    {group.chapters.reduce((n, c) => n + (stats.get(c.id)?.total ?? 0), 0)}문항
                  </span>
                </div>
                {group.desc && <p className="t-tiny t-dim">{group.desc}</p>}
                <Divider dashed />
              </>
            )}
            <ul className="stack-sm" style={{ display: 'flex', flexDirection: 'column' }}>
              {group.chapters.map(row)}
            </ul>
          </section>
        ))
      )}
    </div>
  )
}
