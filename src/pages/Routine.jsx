import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CHECKUP, TALK_QUESTIONS, WEEKDAY, WEEKEND } from '../data/routine.js'
import { todayKey } from '../lib/storage.js'
import {
  activeDays,
  blocksOn,
  isWeekend,
  load,
  monthNumber,
  notesWithin,
  recentDays,
  reset,
  save,
  streak,
  talkProgress,
  toggleBlock,
} from '../lib/english.js'
import { Badge, Bar, Box, Btn, Divider, cx } from '../components/Pixel.jsx'
import EnglishNav from '../components/EnglishNav.jsx'
import Mascot from '../components/Mascot.jsx'

const HEATMAP_WEEKS = 13 // 3개월

/**
 * 매일 뭘 할지와 오늘의 셀프토크 질문을 보여주는 화면.
 * 과목이 아니라 채점도 문항도 없고, 체크한 것만 기록한다.
 */
export default function Routine() {
  const [state, setState] = useState(load)
  const update = (next) => setState(save(next))

  const day = todayKey()
  const weekend = isWeekend()
  const blocks = weekend ? WEEKEND : WEEKDAY
  const checked = blocksOn(state, day)
  const month = monthNumber(state)

  const { done: talkDone, index: talkIndex, lap } = talkProgress(state, TALK_QUESTIONS.length)
  const question = TALK_QUESTIONS[talkIndex]

  const days = activeDays(state)
  const weekNotes = notesWithin(state, 7).length
  const checkupDue = days > 0 && days % CHECKUP.every === 0

  const confirmReset = () => {
    if (window.confirm('영어 루틴 기록과 덩어리 노트를 모두 지웁니다. 되돌릴 수 없습니다.')) {
      setState(reset())
    }
  }

  return (
    <div className="stack-lg" style={{ display: 'flex', flexDirection: 'column' }}>
      <section
        className="t-center stack"
        style={{ paddingTop: 'var(--d6)', alignItems: 'center' }}
      >
        <Mascot mood={checked.length > 0 ? 'happy' : 'think'} size={96} title="닷처기 마스코트" />
        <h1 className="logo">
          루틴<span className="caret" />
        </h1>
        <p className="t-tiny t-dim">
          {day} · {weekend ? '주말' : '평일'} · {month}개월차
        </p>
      </section>

      <EnglishNav />

      <section className="row" style={{ gap: 'var(--d3)', alignItems: 'stretch' }}>
        <Stat label="연속" value={streak(state.days)} unit="일" />
        <Stat label="셀프토크" value={talkDone} unit="회" />
        <Stat label="덩어리" value={state.notes.length} unit="개" />
      </section>

      {/* 하루 15분밖에 없는 날에도 이건 해야 한다 — 그래서 제일 위에 크게 둔다 */}
      <Box
        title="오늘의 셀프토크"
        right={`${talkIndex + 1} / ${TALK_QUESTIONS.length}${lap > 0 ? ` · ${lap + 1}바퀴` : ''}`}
        raised
      >
        <div className="stack">
          <div className="row wrap" style={{ gap: 'var(--d2)' }}>
            <Badge solid>{question.cat}</Badge>
            {lap > 0 && <Badge>한 바퀴 돌아 다시</Badge>}
          </div>

          <p className="t-lg" style={{ lineHeight: 1.5 }}>
            {question.q}
          </p>

          <p className="t-tiny" style={{ opacity: 0.75 }}>
            노릴 것 — {question.hint}
          </p>

          <Divider dashed />

          <ol
            className="stack-sm t-tiny"
            style={{ display: 'flex', flexDirection: 'column', opacity: 0.85 }}
          >
            <li>① 준비 없이 1분 말하며 녹음</li>
            <li>② 되들으며 막힌 곳 · 한국어로 먼저 생각한 곳 표시</li>
            <li>③ 표시한 부분만 찾아서 채우기</li>
            <li>④ 같은 질문으로 다시 1분 녹음 ← 오늘의 결과물</li>
          </ol>
        </div>
      </Box>

      <section className="stack">
        <div className="row-between">
          <h2 style={{ fontSize: 16 }}>{weekend ? '주말' : '평일'} 블록</h2>
          <span className="t-tiny t-mono">
            {checked.length}/{blocks.length}
          </span>
        </div>

        <Bar value={checked.length} max={blocks.length} cells={blocks.length} />

        <ul className="stack-sm" style={{ display: 'flex', flexDirection: 'column' }}>
          {blocks.map((block) => (
            <li key={block.id}>
              <BlockRow
                block={block}
                checked={checked.includes(block.id)}
                locked={block.fromMonth != null && month < block.fromMonth}
                onToggle={() => update(toggleBlock(state, block.id, day))}
              />
            </li>
          ))}
        </ul>

        <p className="t-tiny t-dim">
          시간이 진짜 없는 날은 <strong>1분 셀프토크만</strong> 한다. 나머지는 주말에 벌충되지만
          말하기 빈도는 벌충이 안 된다.
        </p>
      </section>

      {weekend && (
        <Box title="이번 주 덩어리" right={`${weekNotes}개`}>
          <p className="t-tiny" style={{ opacity: 0.75 }}>
            최근 7일에 적은 덩어리가 {weekNotes}개다. 이걸 하나의 이야기로 엮어서 3분 말하고
            녹음하는 게 주말의 핵심이다.
          </p>
          <Link
            to="/notes"
            className="btn btn-sm"
            style={{ marginTop: 'var(--d2)', display: 'inline-flex' }}
          >
            노트 열기 →
          </Link>
        </Box>
      )}

      <section className="stack">
        <div className="row-between">
          <h2 style={{ fontSize: 16 }}>최근 3개월</h2>
          <span className="t-tiny t-dim">{days}일 기록</span>
        </div>
        <Heatmap days={state.days} />
        <div className="row t-tiny t-dim" style={{ gap: 'var(--d1)' }}>
          <span>안 함</span>
          {[0, 25, 50, 75, 100].map((lv) => (
            <span key={lv} className={`heat-cell dither-${lv}`} style={{ display: 'inline-block' }} />
          ))}
          <span>다 함</span>
        </div>
      </section>

      <Box title="자가진단" right={`${CHECKUP.every}일마다`}>
        <div className="stack">
          {checkupDue && <Badge solid>오늘 다시 잴 차례</Badge>}
          <p className="t-tiny" style={{ opacity: 0.75 }}>
            아래 세 질문에 각 1분씩, 준비 없이 녹음해서 보관한다. 체감은 늘 "안 느는 것 같다"고
            하지만 녹음은 그렇지 않다. <strong>이게 유일하게 정직한 지표다.</strong>
          </p>
          <ol className="stack-sm t-tiny" style={{ display: 'flex', flexDirection: 'column' }}>
            {CHECKUP.questions.map((q) => (
              <li key={q} className="t-mono">
                · {q}
              </li>
            ))}
          </ol>
          <Divider dashed />
          <ul
            className="stack-sm t-tiny"
            style={{ display: 'flex', flexDirection: 'column', opacity: 0.85 }}
          >
            {CHECKUP.scale.map(([desc, grade]) => (
              <li key={grade} className="row-between" style={{ alignItems: 'flex-start' }}>
                <span className="grow">{desc}</span>
                <Badge>{grade}</Badge>
              </li>
            ))}
          </ul>
        </div>
      </Box>

      <footer className="stack-sm" style={{ display: 'flex', flexDirection: 'column' }}>
        <Divider dashed />
        <p className="t-center t-tiny t-dim">기록은 이 브라우저에만 저장됩니다.</p>
        <Btn size="sm" onClick={confirmReset}>
          영어 루틴 기록 삭제
        </Btn>
      </footer>
    </div>
  )
}

/** 블록 한 줄. 제목 줄이 토글이고, 관련 화면 링크는 버튼 밖에 따로 둔다. */
function BlockRow({ block, checked, locked, onToggle }) {
  return (
    <div className={cx('box', checked && 'box-raised')} style={{ padding: 'var(--d3)' }}>
      <button
        type="button"
        onClick={onToggle}
        aria-pressed={checked}
        className="row-between"
        style={{
          width: '100%',
          textAlign: 'left',
          padding: 0,
          background: 'none',
          border: 'none',
        }}
      >
        <span className="row" style={{ gap: 'var(--d2)', minWidth: 0 }}>
          <span className="t-mono" aria-hidden="true" style={{ fontSize: 18, lineHeight: 1 }}>
            {checked ? '■' : '□'}
          </span>
          <span className="t-head" style={{ fontSize: 16 }}>
            {block.name}
          </span>
          {block.core && <Badge solid>필수</Badge>}
          {locked && <Badge>{block.fromMonth}개월차부터</Badge>}
        </span>
        <span className="t-tiny t-mono" style={{ flex: 'none' }}>
          {block.min}분
        </span>
      </button>

      <p className="t-tiny" style={{ marginTop: 'var(--d2)', opacity: checked ? 0.45 : 0.8 }}>
        {block.how}
      </p>

      {block.to && (
        <Link
          to={block.to}
          className="btn btn-sm"
          style={{ marginTop: 'var(--d2)', display: 'inline-flex' }}
        >
          {block.toLabel} →
        </Link>
      )}
    </div>
  )
}

function Stat({ label, value, unit }) {
  return (
    <div className="box grow t-center">
      <div className="t-tiny t-dim">{label}</div>
      <div className="t-num">{value}</div>
      <div className="t-tiny t-dim">{unit}</div>
    </div>
  )
}

/** 잔디: 7행 x 13열. 그날 체크한 블록 수로 농도를 정한다. */
function Heatmap({ days }) {
  const total = HEATMAP_WEEKS * 7
  // 이번 주 토요일까지 채워서 열이 깔끔하게 떨어지게 한다
  const end = new Date()
  end.setDate(end.getDate() + (6 - end.getDay()))
  const keys = recentDays(total, end)

  return (
    <div className="heatmap">
      {keys.map((key) => {
        const count = days[key]?.length ?? 0
        return (
          <span
            key={key}
            className={cx('heat-cell', `dither-${level(count)}`)}
            title={`${key} · ${count}블록`}
          />
        )
      })}
    </div>
  )
}

const level = (count) => {
  if (count === 0) return 0
  if (count === 1) return 25
  if (count === 2) return 50
  if (count === 3) return 75
  return 100
}
