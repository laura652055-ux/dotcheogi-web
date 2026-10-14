import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { MODES } from '../data/shared.js'
import { getChapter } from '../data/subjects/index.js'
import { answerText } from '../lib/grade.js'
import { report, verdictText } from '../lib/score.js'
import { byId } from '../lib/quiz.js'
import { useStore } from '../store.jsx'
import { Badge, Bar, Box, Btn, Divider, cx } from '../components/Pixel.jsx'
import Mascot, { moodFor } from '../components/Mascot.jsx'

export default function Result() {
  const { state: nav } = useLocation()
  const navigate = useNavigate()
  const { subject, recordResult } = useStore()

  // 채점 결과를 화면 안에서 다시 손볼 수 있게 로컬 복사본으로 들고 있는다
  // (약술형은 여기서 O/X 를 누른다)
  const [summary, setSummary] = useState(() => nav?.summary ?? [])

  // 새로고침하면 nav state 가 사라진다. 그때는 과목 홈으로 돌린다.
  if (!nav?.summary) return <Navigate to={`/${subject.id}`} replace />

  const r = report(subject, summary)

  const markManual = (id, ok) => {
    recordResult(id, ok)
    setSummary((list) =>
      list.map((s) => (s.id === id ? { ...s, status: ok ? 'correct' : 'wrong' } : s)),
    )
  }

  const wrongIds = summary.filter((s) => s.status === 'wrong').map((s) => s.id)

  return (
    <div className="stack-lg" style={{ display: 'flex', flexDirection: 'column' }}>
      <Box raised thick title="결과" right={MODES[nav.mode]?.label ?? nav.mode}>
        <div className="stack">
          <div className="row" style={{ gap: 'var(--d4)' }}>
            <Mascot
              mood={r.passed ? 'happy' : 'sad'}
              size={80}
              title={r.passed ? '합격권' : '더 필요함'}
            />
            <div className="grow">
              <div className="t-tiny t-dim">
                {nav.chapter ? getChapter(subject, nav.chapter)?.name : '전체 범위'}
              </div>
              <div className="t-num" style={{ fontSize: 44, marginTop: 'var(--d1)' }}>
                {r.score}
                <span style={{ fontSize: 16 }}>점</span>
              </div>
              <div className="t-tiny" style={{ marginTop: 'var(--d1)' }}>
                {r.correct} / {r.total} 정답
                {r.pending > 0 && ` · 자가채점 ${r.pending}문항 남음`}
              </div>
            </div>
          </div>

          <Bar value={r.correct} max={r.total} cells={20} />

          <p className="t-tiny t-dim">
            {subject.scoreNote}
            <br />
            {verdictText(subject, r)}
          </p>
        </div>
      </Box>

      {/* 과락이 있는 시험은 총점만 보여주면 거짓말이 된다 */}
      {r.parts.length > 0 && (
        <Box title="과목별" right={`과락 ${subject.partPassRate}%`}>
          <ul className="stack-sm" style={{ display: 'flex', flexDirection: 'column' }}>
            {r.parts.map((p, i) => (
              <li key={p.id}>
                {i > 0 && <Divider dashed />}
                <div
                  className="stack-sm"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    paddingTop: i > 0 ? 'var(--d2)' : 0,
                  }}
                >
                  <div className="row-between">
                    <span className="row t-tiny" style={{ gap: 'var(--d2)', minWidth: 0 }}>
                      <span className="t-dim">{p.code}</span>
                      <span>{p.name}</span>
                      {!p.passed && <Badge solid>과락</Badge>}
                    </span>
                    <span className="t-mono t-tiny" style={{ flex: 'none' }}>
                      {p.correct}/{p.total} · {p.rate}%
                    </span>
                  </div>
                  <Bar value={p.correct} max={p.total} cells={16} />
                </div>
              </li>
            ))}
          </ul>
        </Box>
      )}

      <section className="stack">
        <h2 style={{ fontSize: 16 }}>문항별</h2>
        <ul className="stack-sm" style={{ display: 'flex', flexDirection: 'column' }}>
          {summary.map((s, i) => {
            const q = byId(subject, s.id)
            if (!q) return null
            return (
              <li key={s.id} className="box">
                <div className="stack-sm" style={{ display: 'flex', flexDirection: 'column' }}>
                  <div className="row-between">
                    <span className="row" style={{ gap: 'var(--d2)', minWidth: 0 }}>
                      <Mascot mood={moodFor(s.status)} size={24} />
                      <span className="t-tiny t-dim">
                        Q{String(i + 1).padStart(2, '0')}
                      </span>
                      <Badge>{getChapter(subject, q.chapter)?.code}</Badge>
                    </span>
                    <span
                      className={cx('t-head')}
                      style={{ fontSize: 18, flex: 'none' }}
                    >
                      {s.status === 'correct' ? 'O' : s.status === 'wrong' ? 'X' : '?'}
                    </span>
                  </div>

                  <p style={{ fontSize: 15 }}>{q.question}</p>

                  <Divider dashed />

                  <div className="t-tiny">
                    <div>
                      <span className="t-dim">내 답 </span>
                      <span className="t-mono">{showResponse(q, s.response)}</span>
                    </div>
                    <div>
                      <span className="t-dim">정답 </span>
                      <strong className="t-mono">{answerText(q)}</strong>
                    </div>
                  </div>

                  {s.status === 'manual' && (
                    <div className="row" style={{ gap: 'var(--d2)' }}>
                      <Btn size="sm" solid onClick={() => markManual(s.id, true)}>
                        맞음
                      </Btn>
                      <Btn size="sm" onClick={() => markManual(s.id, false)}>
                        틀림
                      </Btn>
                    </div>
                  )}

                  {q.explanation && s.status !== 'correct' && (
                    <p className="t-tiny" style={{ whiteSpace: 'pre-wrap', opacity: 0.85 }}>
                      {q.explanation}
                    </p>
                  )}
                </div>
              </li>
            )
          })}
        </ul>
      </section>

      <div className="stack-sm" style={{ display: 'flex', flexDirection: 'column' }}>
        {wrongIds.length > 0 && (
          <Btn
            solid
            size="lg"
            block
            onClick={() => navigate(`/${subject.id}/quiz/wrong`)}
          >
            틀린 {wrongIds.length}문제 다시 풀기
          </Btn>
        )}
        <Link to={`/${subject.id}`} className="btn btn-block btn-lg">
          홈으로
        </Link>
      </div>
    </div>
  )
}

/** 유형별로 사용자가 낸 답을 사람이 읽을 수 있게 만든다 */
function showResponse(question, response) {
  if (response == null || response === '') return '(무응답)'
  if (question.type === 'choice') {
    const picked = Array.isArray(response) ? response : [response]
    if (picked.length === 0) return '(무응답)'
    return picked.map((i) => `${i + 1}. ${question.choices?.[i] ?? ''}`).join(', ')
  }
  if (question.type === 'blank') {
    const given = Array.isArray(response) ? response : []
    if (given.every((v) => !String(v ?? '').trim())) return '(무응답)'
    return given.map((v, i) => `(${i + 1}) ${v || '—'}`).join('  ')
  }
  return String(response)
}
