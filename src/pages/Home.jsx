import { Link, useNavigate } from 'react-router-dom'
import { MODES } from '../data/shared.js'
import { examCount } from '../lib/quiz.js'
import { overallRate, streak } from '../lib/storage.js'
import { useStore } from '../store.jsx'
import { Badge, Box, Divider } from '../components/Pixel.jsx'
import Mascot from '../components/Mascot.jsx'

export default function Home() {
  const { subject, state } = useStore()
  const navigate = useNavigate()

  const total = subject.questions.length
  const solved = Object.keys(state.records).length
  const rate = overallRate(state.records)
  const days = streak(state.days)
  const wrongCount = state.wrongIds.length
  const examSize = examCount(subject)

  // 마스코트 표정으로 상태를 알려준다. 아직 푼 게 없으면 갸웃.
  const mood = solved === 0 ? 'think' : rate != null && rate >= 0.6 ? 'happy' : 'idle'

  return (
    <div className="stack-lg" style={{ display: 'flex', flexDirection: 'column' }}>
      <section
        className="t-center stack"
        style={{ paddingTop: 'var(--d6)', alignItems: 'center' }}
      >
        <Mascot mood={mood} size={96} title="닷처기 마스코트" />
        <h1 className="logo">
          {subject.name}
          <span className="caret" />
        </h1>
        <p className="t-tiny t-dim">
          {subject.fullName} · {subject.tagline}
        </p>
      </section>

      {subject.isSample && (
        <div className="box dither-25" style={{ padding: 'var(--border)' }}>
          <div className="box" style={{ border: 'none' }}>
            <div className="t-tiny">
              <strong>
                지금은 {subject.sampleLabel} {total}개로 돌아가는 중입니다.
              </strong>
              <br />
              {subject.sampleNote}
            </div>
          </div>
        </div>
      )}

      <section className="stack">
        <div className="row-between">
          <h2 style={{ fontSize: 16 }}>오늘</h2>
          <Link to={`/${subject.id}/stats`} className="t-tiny t-dim">
            전체 통계 →
          </Link>
        </div>
        <div className="row" style={{ gap: 'var(--d3)', alignItems: 'stretch' }}>
          <Stat label="연속 학습" value={days} unit="일" />
          <Stat label="푼 문제" value={solved} unit={`/ ${total}`} />
          <Stat
            label="정답률"
            value={rate == null ? '—' : Math.round(rate * 100)}
            unit={rate == null ? '' : '%'}
          />
        </div>
      </section>

      <section className="stack">
        <h2 style={{ fontSize: 16 }}>모드 선택</h2>
        <div className="grid-2">
          {Object.entries(MODES).map(([key, mode]) => {
            const disabled = key === 'wrong' && wrongCount === 0
            // 모의고사만 문항 수를 과목에서 가져와 실제 분량을 보여준다
            const desc = key === 'exam' ? `${examSize}문항 · 마지막에 채점` : mode.desc

            return (
              <button
                key={key}
                type="button"
                className="btn"
                disabled={disabled}
                onClick={() =>
                  navigate(
                    key === 'exam'
                      ? `/${subject.id}/quiz/${key}`
                      : `/${subject.id}/select/${key}`,
                  )
                }
                style={{
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  padding: 'var(--d3)',
                  gap: 'var(--d1)',
                  textAlign: 'left',
                }}
              >
                <span className="row-between" style={{ width: '100%' }}>
                  <span className="t-head" style={{ fontSize: 16 }}>
                    {mode.label}
                  </span>
                  {key === 'wrong' && <Badge>{wrongCount}</Badge>}
                </span>
                <span className="t-tiny" style={{ opacity: 0.75 }}>
                  {disabled ? '아직 틀린 문제가 없습니다' : desc}
                </span>
              </button>
            )
          })}
        </div>
      </section>

      {state.sessions.length > 0 && (
        <section className="stack">
          <h2 style={{ fontSize: 16 }}>최근 기록</h2>
          <Box>
            <ul className="stack-sm" style={{ display: 'flex', flexDirection: 'column' }}>
              {state.sessions.slice(0, 5).map((s, i) => (
                <li key={s.at}>
                  {i > 0 && <Divider dashed />}
                  <div
                    className="row-between t-tiny"
                    style={{ paddingTop: i > 0 ? 'var(--d1)' : 0 }}
                  >
                    <span>
                      <Badge>{MODES[s.mode]?.label ?? s.mode}</Badge>{' '}
                      {new Date(s.at).toLocaleDateString('ko-KR', {
                        month: 'numeric',
                        day: 'numeric',
                      })}
                    </span>
                    <span className="t-mono">
                      {s.correct} / {s.total}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </Box>
        </section>
      )}

      <footer className="t-center t-tiny t-dim">
        <Divider dashed />
        {/* 남의 자료를 쓰는 과목은 출처를 홈에서 지우지 않는다 */}
        {subject.sourceLabel && (
          <p style={{ marginTop: 'var(--d2)' }}>
            문제 출처 ·{' '}
            {subject.sourceUrl ? (
              <a href={subject.sourceUrl} target="_blank" rel="noreferrer">
                {subject.sourceLabel}
              </a>
            ) : (
              subject.sourceLabel
            )}
          </p>
        )}
        <p style={{ marginTop: 'var(--d2)' }}>기록은 이 브라우저에만 저장됩니다.</p>
      </footer>
    </div>
  )
}

function Stat({ label, value, unit }) {
  return (
    <div className="box grow t-center" style={{ padding: 'var(--d3) var(--d2)' }}>
      <div className="t-tiny t-dim">{label}</div>
      <div className="t-num" style={{ marginTop: 'var(--d1)' }}>
        {value}
        <span style={{ fontSize: 13 }}> {unit}</span>
      </div>
    </div>
  )
}
