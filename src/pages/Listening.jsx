import { Link } from 'react-router-dom'
import { HOWTO, SECTIONS, TOOLS } from '../data/listening.js'
import { Badge, Box, Divider } from '../components/Pixel.jsx'
import EnglishNav from '../components/EnglishNav.jsx'
import Mascot from '../components/Mascot.jsx'

/**
 * 영어 듣기 자료 목록. 과목이 아니라 바깥 링크 모음이라 SubjectShell 밖에 있고
 * 학습 기록도 남기지 않는다. 푸는 화면이 아니라 읽고 나가는 화면이다.
 */
export default function Listening() {
  return (
    <div className="stack-lg" style={{ display: 'flex', flexDirection: 'column' }}>
      <section
        className="t-center stack"
        style={{ paddingTop: 'var(--d6)', alignItems: 'center' }}
      >
        <Mascot mood="happy" size={96} title="닷처기 마스코트" />
        <h1 className="logo">
          듣기<span className="caret" />
        </h1>
        <p className="t-tiny t-dim">영어 리스닝 · 쉐도잉 자료</p>
      </section>

      <EnglishNav />

      <Box title="쉐도잉 순서" right="한 영상 × 4번">
        <ol className="stack-sm" style={{ display: 'flex', flexDirection: 'column' }}>
          {HOWTO.map((step, i) => (
            <li key={step} className="row" style={{ alignItems: 'flex-start' }}>
              <Badge solid>{i + 1}</Badge>
              <span className="grow" style={{ fontSize: 14 }}>
                {step}
              </span>
            </li>
          ))}
        </ol>
      </Box>

      {SECTIONS.map((section) => (
        <section key={section.id} className="stack">
          <div className="row-between">
            <h2 style={{ fontSize: 16 }}>{section.title}</h2>
            <span className="t-tiny t-dim t-mono">{section.items.length}개</span>
          </div>

          {section.note && (
            <p className="t-tiny" style={{ opacity: 0.75 }}>
              {section.note}
            </p>
          )}

          <ul className="stack-sm" style={{ display: 'flex', flexDirection: 'column' }}>
            {section.items.map((item) => (
              <li key={item.name}>
                <Item {...item} />
              </li>
            ))}
          </ul>
        </section>
      ))}

      <section className="stack">
        <h2 style={{ fontSize: 16 }}>도구</h2>
        <ul className="stack-sm" style={{ display: 'flex', flexDirection: 'column' }}>
          {TOOLS.map((tool) => (
            <li key={tool.name}>
              {tool.url ? (
                <Item {...tool} />
              ) : (
                <div className="box">
                  <div className="t-head" style={{ fontSize: 15 }}>
                    {tool.name}
                  </div>
                  <p className="t-tiny" style={{ opacity: 0.75, marginTop: 'var(--d1)' }}>
                    {tool.blurb}
                  </p>
                </div>
              )}
            </li>
          ))}
        </ul>
      </section>

      <footer className="t-center t-tiny t-dim">
        <Divider dashed />
        <p style={{ marginTop: 'var(--d2)' }}>
          여기는 기록을 남기지 않습니다. 링크는 새 탭에서 열립니다.
        </p>
        <p style={{ marginTop: 'var(--d1)' }}>
          <Link to="/" style={{ textDecoration: 'underline' }}>
            ← 과목으로
          </Link>
        </p>
      </footer>
    </div>
  )
}

/** 바깥으로 나가는 링크 한 줄. a 안에 button 을 넣을 수 없어 a 에 버튼 스타일을 준다. */
function Item({ name, url, level, pick, warn, blurb }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="btn btn-block"
      style={{
        flexDirection: 'column',
        alignItems: 'stretch',
        gap: 'var(--d2)',
        padding: 'var(--d3)',
        textAlign: 'left',
      }}
    >
      <span className="row-between" style={{ width: '100%' }}>
        <span className="row wrap" style={{ gap: 'var(--d2)', minWidth: 0 }}>
          <span className="t-head" style={{ fontSize: 16 }}>
            {name}
          </span>
          {pick && <Badge solid>먼저</Badge>}
        </span>
        {level && <Level value={level} />}
      </span>

      <span className="t-tiny" style={{ opacity: 0.75 }}>
        {blurb}
      </span>

      {/* 카드에 마우스를 올리면 배경이 잉크로 뒤집히므로 반전 칩 대신 글자로 쓴다 */}
      {warn && <span className="t-tiny">※ {warn}</span>}
    </a>
  )
}

/** 듣기 난이도 1~3. 색을 못 쓰니 채운 칸 수로 보여준다. */
function Level({ value }) {
  return (
    <Badge>
      <span className="sr">듣기 난이도 {value} / 3</span>
      <span aria-hidden="true" className="t-mono">
        {'■'.repeat(value)}
        {'□'.repeat(3 - value)}
      </span>
    </Badge>
  )
}
