import { QUESTION_TYPES } from '../data/shared.js'
import { getChapter } from '../data/subjects/index.js'
import { useSubject } from '../store.jsx'
import { answerText } from '../lib/grade.js'
import { Badge, Box, Btn, CodeBlock, Divider, cx } from './Pixel.jsx'

/**
 * 문제 한 개의 본문 + 답안 입력 + (공개 시) 정답/해설.
 *
 * 입력은 부모가 들고 있는 controlled 컴포넌트다.
 * 채점 결과(result)가 들어오면 입력을 잠그고 정답을 펼친다.
 */
export default function QuestionCard({
  question,
  index,
  total,
  response,
  onChange,
  result,
  onSelfGrade,
  onSubmit,
}) {
  const locked = Boolean(result)
  const subject = useSubject()
  const chapter = getChapter(subject, question.chapter)

  return (
    <Box
      raised
      title={`Q${String(index + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`}
      right={`${chapter?.code ?? ''} · ${QUESTION_TYPES[question.type]?.label ?? question.type}`}
    >
      <div className="stack">
        <div className="row wrap t-tiny">
          <Badge>{chapter?.name}</Badge>
          <Badge>{question.topic}</Badge>
          <Badge>{'★'.repeat(question.difficulty ?? 1)}</Badge>
        </div>

        <p style={{ fontSize: 17, lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>{question.question}</p>

        {question.code && (
          <CodeBlock lang={question.code.lang}>{question.code.body}</CodeBlock>
        )}

        {question.bank && (
          <div>
            <div className="t-tiny t-dim" style={{ marginBottom: 'var(--d1)' }}>
              &lt;보기&gt;
            </div>
            <div className="bank">
              {question.bank.map((item) => (
                <Badge key={item}>{item}</Badge>
              ))}
            </div>
          </div>
        )}

        <Divider dashed />

        <AnswerInput
          question={question}
          response={response}
          onChange={onChange}
          locked={locked}
          result={result}
          onSubmit={onSubmit}
        />

        {result && (
          <Reveal question={question} result={result} onSelfGrade={onSelfGrade} />
        )}
      </div>
    </Box>
  )
}

/* ---------------- 유형별 입력 ---------------- */

function AnswerInput({ question, response, onChange, locked, result, onSubmit }) {
  // Enter 로 제출 (textarea 는 줄바꿈이 필요하니 제외)
  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !locked) {
      e.preventDefault()
      onSubmit?.()
    }
  }

  switch (question.type) {
    case 'choice':
      return (
        <ul className="stack-sm" style={{ display: 'flex', flexDirection: 'column' }}>
          {question.choices.map((choice, i) => {
            const picked = Array.isArray(response) && response.includes(i)
            const isAnswer = question.answer.includes(i)
            return (
              <li key={i}>
                <button
                  type="button"
                  className="choice"
                  aria-pressed={picked}
                  disabled={locked}
                  onClick={() => onChange([i])}
                  style={
                    locked && isAnswer
                      ? { boxShadow: 'inset 0 0 0 var(--border) var(--ink)' }
                      : undefined
                  }
                >
                  <span className="choice-key">{i + 1}</span>
                  <span className="grow">{choice}</span>
                  {locked && isAnswer && <span className="t-tiny">정답</span>}
                </button>
              </li>
            )
          })}
        </ul>
      )

    case 'blank':
      return (
        <div className="stack-sm" style={{ display: 'flex', flexDirection: 'column' }}>
          {question.answer.map((_, i) => (
            <label key={i} className="row">
              <span className="t-tiny" style={{ flex: 'none', width: 'var(--d8)' }}>
                ({i + 1})
              </span>
              <input
                className={cx('field', 'grow')}
                value={(Array.isArray(response) ? response[i] : '') ?? ''}
                disabled={locked}
                onKeyDown={onKeyDown}
                onChange={(e) => {
                  const next = Array.isArray(response) ? [...response] : []
                  next[i] = e.target.value
                  onChange(next)
                }}
                placeholder={`빈칸 ${i + 1}`}
              />
              {result?.perBlank && (
                <span className="t-head" style={{ flex: 'none', width: 'var(--d6)' }}>
                  {result.perBlank[i] ? 'O' : 'X'}
                </span>
              )}
            </label>
          ))}
        </div>
      )

    case 'essay':
      return (
        <textarea
          className="field"
          value={response ?? ''}
          disabled={locked}
          onChange={(e) => onChange(e.target.value)}
          placeholder="키워드를 빠뜨리지 말고 서술해 보세요."
        />
      )

    default:
      return (
        <input
          className="field"
          value={response ?? ''}
          disabled={locked}
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          onKeyDown={onKeyDown}
          onChange={(e) => onChange(e.target.value)}
          placeholder={question.type === 'code' ? '실행 결과를 입력' : '정답을 입력'}
        />
      )
  }
}

/* ---------------- 채점 결과 + 해설 ---------------- */

function Reveal({ question, result, onSelfGrade }) {
  return (
    <div className="stack">
      {result.status === 'manual' ? (
        <>
          <div className="verdict verdict-x">
            <span>자가 채점</span>
          </div>
          {question.keywords?.length > 0 && (
            <div>
              <div className="t-tiny t-dim">키워드 체크</div>
              <div className="row wrap" style={{ marginTop: 'var(--d1)' }}>
                {question.keywords.map((k) => {
                  const hit = result.matchedKeywords?.includes(k)
                  return (
                    <Badge key={k} solid={hit}>
                      {hit ? '✓ ' : '· '}
                      {k}
                    </Badge>
                  )
                })}
              </div>
            </div>
          )}
        </>
      ) : (
        <div className={cx('verdict', result.status === 'correct' ? 'verdict-o' : 'verdict-x')}>
          <span className="t-num" style={{ fontSize: 20 }}>
            {result.status === 'correct' ? 'O' : 'X'}
          </span>
          <span>{result.status === 'correct' ? '정답' : '오답'}</span>
        </div>
      )}

      <div className="box dither-25" style={{ padding: 0 }}>
        <div className="box" style={{ border: 'none', margin: 'var(--border)', background: 'var(--paper)' }}>
          <div className="stack-sm" style={{ display: 'flex', flexDirection: 'column' }}>
            <div>
              <span className="t-tiny t-dim">정답 </span>
              <strong className="t-mono">{answerText(question)}</strong>
            </div>
            {question.explanation && (
              <>
                <Divider dashed />
                <p style={{ whiteSpace: 'pre-wrap', fontSize: 15 }}>{question.explanation}</p>
              </>
            )}
            {question.source && (
              <div className="t-tiny t-dim t-right">출처 · {question.source}</div>
            )}
          </div>
        </div>
      </div>

      {result.status === 'manual' && onSelfGrade && (
        <div className="row" style={{ gap: 'var(--d2)' }}>
          <Btn block solid onClick={() => onSelfGrade(true)}>
            맞았음 (O)
          </Btn>
          <Btn block onClick={() => onSelfGrade(false)}>
            틀렸음 (X)
          </Btn>
        </div>
      )}
    </div>
  )
}
