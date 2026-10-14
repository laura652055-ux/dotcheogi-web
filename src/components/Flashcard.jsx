import { useState } from 'react'
import { Badge, Box, Btn, CodeBlock, Divider } from './Pixel.jsx'
import Mascot from './Mascot.jsx'
import { getChapter } from '../data/subjects/index.js'
import { useSubject } from '../store.jsx'
import { answerText } from '../lib/grade.js'

/**
 * 암기 모드 카드. 입력 없이 "떠올렸는지"만 스스로 체크한다.
 * 앞면(문제) → 뒤집기 → 뒷면(정답+해설) → O/X.
 */
export default function Flashcard({ question, index, total, onSelfGrade }) {
  const [flipped, setFlipped] = useState(false)
  const subject = useSubject()
  const chapter = getChapter(subject, question.chapter)

  return (
    <Box
      raised
      thick
      title={`CARD ${String(index + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`}
      right={chapter?.code}
    >
      <div className="stack" style={{ minHeight: 260 }}>
        <div className="row wrap t-tiny">
          <Badge>{chapter?.name}</Badge>
          <Badge>{question.topic}</Badge>
        </div>

        <p style={{ fontSize: 17, lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>{question.question}</p>

        {question.code && (
          <CodeBlock lang={question.code.lang}>{question.code.body}</CodeBlock>
        )}

        <Divider dashed />

        {flipped ? (
          <div className="stack">
            <div className="row" style={{ gap: 'var(--d3)' }}>
              <Mascot mood="happy" size={48} />
              <div className="grow">
                <div className="t-tiny t-dim">정답</div>
                <strong className="t-mono" style={{ fontSize: 18 }}>
                  {answerText(question)}
                </strong>
              </div>
            </div>
            {question.explanation && (
              <p className="t-tiny" style={{ whiteSpace: 'pre-wrap', lineHeight: 1.8 }}>
                {question.explanation}
              </p>
            )}
            <div className="row" style={{ gap: 'var(--d2)' }}>
              <Btn block solid onClick={() => onSelfGrade(true)}>
                알았음 (O)
              </Btn>
              <Btn block onClick={() => onSelfGrade(false)}>
                몰랐음 (X)
              </Btn>
            </div>
          </div>
        ) : (
          <div className="stack t-center" style={{ alignItems: 'center' }}>
            <Mascot mood="think" size={56} />
            <Btn size="lg" block solid onClick={() => setFlipped(true)}>
              뒤집어서 정답 보기
            </Btn>
          </div>
        )}
      </div>
    </Box>
  )
}
