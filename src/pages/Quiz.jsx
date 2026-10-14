import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import QuestionCard from '../components/QuestionCard.jsx'
import Flashcard from '../components/Flashcard.jsx'
import { Bar, Badge, Box, Btn } from '../components/Pixel.jsx'
import { MODES } from '../data/shared.js'
import { getChapter } from '../data/subjects/index.js'
import { grade, isBlankResponse } from '../lib/grade.js'
import { buildSet, cursorKey } from '../lib/quiz.js'
import { cursorOf } from '../lib/storage.js'
import { useStore } from '../store.jsx'

/** 유형별 응답 초기값 */
const emptyResponse = (q) => {
  if (q.type === 'choice') return []
  if (q.type === 'blank') return q.answer.map(() => '')
  return ''
}

export default function Quiz() {
  const { mode = 'study', chapter } = useParams()
  const chapterId = chapter ? Number(chapter) : null
  const navigate = useNavigate()
  const { subject, state, recordResult, endSession, setCursor } = useStore()

  // 문제 묶음은 진입 시점에 한 번만 만들고 고정한다.
  // (오답 모드에서 정답을 맞히면 state.wrongIds 가 줄어드는데,
  //  그때마다 다시 만들면 풀던 문제가 사라진다)
  const [items] = useState(() => buildSet(subject, mode, chapterId, state))

  // 이어서 풀기는 문제 순서가 고정된 모드에서만 쓴다.
  // 모의고사·암기는 매번 섞이고, 오답 모드는 맞힐수록 목록이 줄어 자리가 의미를 잃는다.
  const resumable = mode === 'study'
  const cursor = resumable ? cursorKey(mode, chapterId) : null

  // 지난번에 나간 자리에서 시작한다.
  const [resumedAt] = useState(() => {
    if (!cursor) return 0
    const qid = cursorOf(state, cursor)
    if (qid) {
      // 그 문항이 목록에 없으면(데이터가 바뀌었으면) 처음부터
      const at = items.findIndex((q) => q.id === qid)
      return at > 0 ? at : 0
    }
    // 이 기능이 생기기 전에 풀던 기록도 살린다 — 아직 안 푼 첫 문항부터
    const fresh = items.findIndex((q) => !state.records[q.id])
    return fresh > 0 ? fresh : 0
  })

  const [idx, setIdx] = useState(resumedAt)
  const [showResumed, setShowResumed] = useState(resumedAt > 0)
  const [responses, setResponses] = useState({})
  const [results, setResults] = useState({})

  // 머문 자리를 따라 저장해 둔다. 중간에 그만둬도 다음에 여기서 이어진다.
  // setCursor 는 매 렌더 새로 만들어지므로 의존성에 넣지 않는다 (넣으면 무한 루프).
  // 같은 자리를 다시 저장하면 storage 가 state 를 그대로 돌려주므로 렌더도 돌지 않는다.
  useEffect(() => {
    if (cursor) setCursor(cursor, items[idx]?.id)
  }, [cursor, idx, items])

  const isExam = mode === 'exam'
  const isRecall = mode === 'recall'
  const current = items[idx]
  const last = idx === items.length - 1

  const response = current
    ? (responses[current.id] ?? emptyResponse(current))
    : null
  const result = current ? results[current.id] : null

  const setResponse = useCallback(
    (value) => setResponses((r) => ({ ...r, [current.id]: value })),
    [current],
  )

  /** 학습/오답 모드: 즉시 채점하고 해설을 편다 */
  const submit = useCallback(() => {
    if (!current || results[current.id]) return
    const r = grade(current, responses[current.id] ?? emptyResponse(current))
    setResults((prev) => ({ ...prev, [current.id]: r }))
    // 약술형은 사용자가 O/X 를 누를 때 기록한다
    if (r.status !== 'manual') recordResult(current.id, r.status === 'correct')
  }, [current, responses, results, recordResult])

  /**
   * 약술형/암기 카드 자가 채점.
   * 마지막 문항이면 setResults 반영을 기다리지 않고 갱신본을 finish 에 직접 넘긴다.
   * (그러지 않으면 결과 화면에서 이 문항이 다시 '미채점'으로 뜬다)
   */
  function selfGrade(correct) {
    if (!current) return
    const updated = {
      ...results,
      [current.id]: { ...results[current.id], status: correct ? 'correct' : 'wrong' },
    }
    setResults(updated)
    recordResult(current.id, correct)
    if (last) finish(updated)
    else setIdx((i) => i + 1)
  }

  function finish(finalResults = results) {
    const graded = items.map((q) => ({
      question: q,
      response: responses[q.id] ?? emptyResponse(q),
      result: finalResults[q.id] ?? grade(q, responses[q.id] ?? emptyResponse(q)),
    }))
    const correct = graded.filter((g) => g.result.status === 'correct').length

    // 끝까지 풀었으니 이어서 풀 자리를 지운다. 다음엔 처음부터 시작한다.
    if (cursor) setCursor(cursor, null)
    endSession({ mode, chapter: chapterId, total: items.length, correct })
    navigate(`/${subject.id}/result`, {
      replace: true,
      state: {
        mode,
        chapter: chapterId,
        summary: graded.map((g) => ({
          id: g.question.id,
          status: g.result.status,
          response: g.response,
        })),
      },
    })
  }

  /** 모의고사: 마지막에 한 번에 채점한다 */
  function submitExam() {
    const finalResults = {}
    for (const q of items) {
      const r = grade(q, responses[q.id] ?? emptyResponse(q))
      finalResults[q.id] = r
      if (r.status !== 'manual') recordResult(q.id, r.status === 'correct')
    }
    setResults(finalResults)
    finish(finalResults)
  }

  function goNext() {
    if (last) finish()
    else setIdx((i) => i + 1)
  }

  if (items.length === 0) {
    return (
      <Box raised title="풀 문제가 없습니다">
        <div className="stack">
          <p className="t-tiny">
            {mode === 'wrong'
              ? '틀린 문제가 없습니다. 먼저 학습이나 모의고사를 진행해 주세요.'
              : '이 범위에 등록된 문제가 아직 없습니다. 문제 데이터를 채워 넣어야 합니다.'}
          </p>
          <Btn solid block onClick={() => navigate(`/${subject.id}`)}>
            홈으로
          </Btn>
        </div>
      </Box>
    )
  }

  return (
    <div className="stack-lg" style={{ display: 'flex', flexDirection: 'column' }}>
      <header className="stack-sm">
        <div className="row-between t-tiny">
          <span className="row" style={{ gap: 'var(--d1)' }}>
            <Badge solid>{MODES[mode]?.label ?? mode}</Badge>
            <Badge>{chapterId ? getChapter(subject, chapterId)?.name : '전체 범위'}</Badge>
          </span>
          <span className="t-mono">
            {String(idx + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
          </span>
        </div>
        <Bar value={idx + (result ? 1 : 0)} max={items.length} cells={20} />
      </header>

      {/* 이어서 시작했다는 사실은 그 문항에 머무는 동안만 알려주면 된다 */}
      {showResumed && idx === resumedAt && (
        <div className="box dither-25" style={{ padding: 'var(--border)' }}>
          <div className="box" style={{ border: 'none' }}>
            <div className="row-between" style={{ gap: 'var(--d2)' }}>
              <span className="t-tiny">
                지난번에 <strong className="t-mono">{String(resumedAt).padStart(2, '0')}</strong>
                번까지 풀었습니다. 이어서 시작합니다.
              </span>
              <Btn
                size="ghost"
                onClick={() => {
                  setIdx(0)
                  setShowResumed(false)
                }}
              >
                처음부터
              </Btn>
            </div>
          </div>
        </div>
      )}

      {isRecall ? (
        <Flashcard
          key={current.id}
          question={current}
          index={idx}
          total={items.length}
          onSelfGrade={selfGrade}
        />
      ) : (
        <QuestionCard
          key={current.id}
          question={current}
          index={idx}
          total={items.length}
          response={response}
          onChange={setResponse}
          result={isExam ? null : result}
          onSelfGrade={selfGrade}
          onSubmit={isExam ? goNext : submit}
        />
      )}

      {!isRecall && (
        <div className="row" style={{ gap: 'var(--d2)' }}>
          {isExam ? (
            <>
              <Btn
                onClick={() => setIdx((i) => Math.max(0, i - 1))}
                disabled={idx === 0}
              >
                ← 이전
              </Btn>
              {last ? (
                <Btn solid block size="lg" onClick={submitExam}>
                  제출하고 채점하기
                </Btn>
              ) : (
                <Btn solid block size="lg" onClick={goNext}>
                  다음 →
                </Btn>
              )}
            </>
          ) : !result ? (
            <Btn
              solid
              block
              size="lg"
              onClick={submit}
              disabled={isBlankResponse(current, response)}
            >
              제출 (Enter)
            </Btn>
          ) : (
            result.status !== 'manual' && (
              <Btn solid block size="lg" onClick={goNext} autoFocus>
                {last ? '결과 보기' : '다음 문제 →'}
              </Btn>
            )
          )}
        </div>
      )}

      <Btn size="ghost" onClick={() => navigate(`/${subject.id}`)}>
        그만두기
      </Btn>
    </div>
  )
}
