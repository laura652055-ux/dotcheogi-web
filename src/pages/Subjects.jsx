import { Link, useNavigate } from 'react-router-dom'
import { SUBJECTS } from '../data/subjects/index.js'
import { load, overallRate } from '../lib/storage.js'
import { Bar, Badge, Divider } from '../components/Pixel.jsx'
import Mascot from '../components/Mascot.jsx'

/**
 * 과목 선택. 앱의 첫 화면이다.
 *
 * 각 과목의 진도는 localStorage 에서 바로 읽는다. 과목마다 StoreProvider 를
 * 띄울 필요 없이 한 번 읽고 끝내면 되는 값이라 그렇다.
 */
export default function Subjects() {
  const navigate = useNavigate()

  const rows = SUBJECTS.map((subject) => {
    const state = load(subject.id)
    const solved = Object.keys(state.records).length
    return {
      subject,
      solved,
      total: subject.questions.length,
      rate: overallRate(state.records),
      wrong: state.wrongIds.length,
    }
  })

  const started = rows.some((r) => r.solved > 0)

  return (
    <div className="stack-lg" style={{ display: 'flex', flexDirection: 'column' }}>
      <section
        className="t-center stack"
        style={{ paddingTop: 'var(--d6)', alignItems: 'center' }}
      >
        <Mascot mood={started ? 'happy' : 'idle'} size={96} title="닷처기 마스코트" />
        <h1 className="logo">
          닷처기<span className="caret" />
        </h1>
        <p className="t-tiny t-dim">자격증 도트 문제풀이</p>
      </section>

      <section className="stack">
        <h2 style={{ fontSize: 16 }}>과목 선택</h2>
        <ul className="stack-sm" style={{ display: 'flex', flexDirection: 'column' }}>
          {rows.map(({ subject, solved, total, rate, wrong }) => (
            <li key={subject.id}>
              <button
                type="button"
                className="btn btn-block"
                onClick={() => navigate(`/${subject.id}`)}
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
                    <span className="t-head" style={{ fontSize: 17 }}>
                      {subject.name}
                    </span>
                    {subject.isSample && <Badge>{subject.sampleBadge}</Badge>}
                    {wrong > 0 && <Badge>오답 {wrong}</Badge>}
                  </span>
                  <span className="t-tiny t-mono" style={{ flex: 'none' }}>
                    {solved}/{total}
                    {rate != null && ` · ${Math.round(rate * 100)}%`}
                  </span>
                </span>

                <span className="t-tiny" style={{ opacity: 0.75 }}>
                  {subject.fullName} · {subject.blurb}
                </span>

                <Bar value={solved} max={total} cells={16} />
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="stack">
        <div className="row-between">
          <h2 style={{ fontSize: 16 }}>곁다리 — 영어</h2>
          <span className="t-tiny t-dim">문제 아님</span>
        </div>
        <ul className="stack-sm" style={{ display: 'flex', flexDirection: 'column' }}>
          {EXTRAS.map((extra) => (
            <li key={extra.to}>
              <Link
                to={extra.to}
                className="btn btn-block"
                style={{
                  flexDirection: 'column',
                  alignItems: 'stretch',
                  gap: 'var(--d2)',
                  padding: 'var(--d3)',
                  textAlign: 'left',
                }}
              >
                <span className="row" style={{ gap: 'var(--d2)' }}>
                  <span className="t-head" style={{ fontSize: 17 }}>
                    {extra.name}
                  </span>
                  <Badge>{extra.tag}</Badge>
                </span>
                <span className="t-tiny" style={{ opacity: 0.75 }}>
                  {extra.blurb}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <footer className="t-center t-tiny t-dim">
        <Divider dashed />
        <p style={{ marginTop: 'var(--d2)' }}>
          기록은 과목별로 이 브라우저에만 저장됩니다.
        </p>
      </footer>
    </div>
  )
}

/** 과목이 아닌 영어 화면들. 문제도 채점도 없다. */
const EXTRAS = [
  {
    to: '/routine',
    name: '루틴',
    tag: '매일 체크',
    blurb: '평일·주말 블록 체크 + 오늘의 셀프토크 질문 (90일치)',
  },
  {
    to: '/notes',
    name: '덩어리 노트',
    tag: '적는 곳',
    blurb: '들은 표현을 내 문장으로 바꿔 모아두는 곳',
  },
  {
    to: '/listening',
    name: '듣기 자료',
    tag: '링크만',
    blurb: '쉐도잉·팟캐스트 유튜브 채널 모음',
  },
]
