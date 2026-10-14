import { useMemo, useState } from 'react'
import { todayKey } from '../lib/storage.js'
import {
  addNote,
  groupByDay,
  lastNoteDay,
  load,
  notesOn,
  notesWithin,
  removeNote,
  save,
  toText,
} from '../lib/english.js'
import { Badge, Box, Btn, Divider } from '../components/Pixel.jsx'
import EnglishNav from '../components/EnglishNav.jsx'
import Mascot from '../components/Mascot.jsx'

const DAILY_GOAL = 5

/**
 * 덩어리 노트.
 *
 * 칸이 두 개인 게 핵심이다. 들은 표현만 베껴 적으면 끝까지 남의 문장으로
 * 남고, 내 일상 문장으로 바꿔 적어야 입에서 나온다. 그래서 둘 다 채워야
 * 저장된다.
 */
export default function Notes() {
  const [state, setState] = useState(load)
  const [heard, setHeard] = useState('')
  const [mine, setMine] = useState('')
  const [source, setSource] = useState('')
  const [filter, setFilter] = useState('')
  const [copied, setCopied] = useState(false)

  const update = (next) => setState(save(next))

  const day = todayKey()
  const today = notesOn(state, day)
  const reviewDay = lastNoteDay(state, day)
  const review = reviewDay ? notesOn(state, reviewDay) : []

  const ready = heard.trim() !== '' && mine.trim() !== ''

  const submit = (e) => {
    e.preventDefault()
    if (!ready) return
    update(addNote(state, { heard, mine, source }))
    setHeard('')
    setMine('')
    // 출처는 같은 영상에서 여러 개 뽑는 경우가 많아 지우지 않는다
  }

  const filtered = useMemo(() => {
    const q = filter.trim().toLowerCase()
    if (!q) return state.notes
    return state.notes.filter((n) =>
      [n.heard, n.mine, n.source].some((v) => v?.toLowerCase().includes(q)),
    )
  }, [state.notes, filter])

  const copyAll = async () => {
    try {
      await navigator.clipboard.writeText(toText(state.notes))
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="stack-lg" style={{ display: 'flex', flexDirection: 'column' }}>
      <section
        className="t-center stack"
        style={{ paddingTop: 'var(--d6)', alignItems: 'center' }}
      >
        <Mascot
          mood={today.length >= DAILY_GOAL ? 'happy' : 'idle'}
          size={96}
          title="닷처기 마스코트"
        />
        <h1 className="logo">
          덩어리<span className="caret" />
        </h1>
        <p className="t-tiny t-dim">
          오늘 {today.length} / {DAILY_GOAL} · 누적 {state.notes.length}개
        </p>
      </section>

      <EnglishNav />

      <Box title="덩어리 하나 적기" raised>
        <form className="stack" onSubmit={submit}>
          <label className="stack-sm" style={{ display: 'flex', flexDirection: 'column' }}>
            <span className="t-tiny t-dim">들은 표현 — 영상에 나온 그대로</span>
            <input
              className="field"
              value={heard}
              onChange={(e) => setHeard(e.target.value)}
              placeholder="I ended up staying home all weekend."
            />
          </label>

          <label className="stack-sm" style={{ display: 'flex', flexDirection: 'column' }}>
            <span className="t-tiny t-dim">
              내 문장 — <strong>내 일상으로 바꿔서.</strong> 이 칸이 이 노트의 전부다
            </span>
            <input
              className="field"
              value={mine}
              onChange={(e) => setMine(e.target.value)}
              placeholder="I ended up watching three episodes instead of studying."
            />
          </label>

          <label className="stack-sm" style={{ display: 'flex', flexDirection: 'column' }}>
            <span className="t-tiny t-dim">어디서 (선택)</span>
            <input
              className="field"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              placeholder="MrBallen · Easy English · Trash Taste ..."
            />
          </label>

          <Btn solid block type="submit" disabled={!ready}>
            {ready ? '적기' : '두 칸을 다 채워야 저장된다'}
          </Btn>

          <p className="t-tiny t-dim">
            적고 끝내지 말고 <strong>내 문장을 소리내어 말해야</strong> 한 개가 완성된다.
          </p>
        </form>
      </Box>

      {review.length > 0 && (
        <Box title="복습" right={reviewDay}>
          <p className="t-tiny" style={{ opacity: 0.75, marginBottom: 'var(--d2)' }}>
            지난번에 적은 {review.length}개다. 눈으로 보지 말고 소리내어 읽는다.
          </p>
          <ul className="stack-sm" style={{ display: 'flex', flexDirection: 'column' }}>
            {review.map((note) => (
              <li key={note.id} className="t-tiny">
                <span className="t-dim">{note.heard}</span>
                <br />
                <strong className="t-mono">→ {note.mine}</strong>
              </li>
            ))}
          </ul>
        </Box>
      )}

      <section className="stack">
        <div className="row-between">
          <h2 style={{ fontSize: 16 }}>모아둔 것</h2>
          <span className="t-tiny t-mono">
            {filter ? `${filtered.length} / ` : ''}
            {state.notes.length}개
          </span>
        </div>

        {state.notes.length > 0 && (
          <div className="row wrap" style={{ gap: 'var(--d2)' }}>
            <input
              className="field grow"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="검색 — 표현 · 내 문장 · 출처"
            />
            <Btn size="sm" onClick={copyAll}>
              {copied ? '복사됨' : '전체 복사'}
            </Btn>
          </div>
        )}

        {state.notes.length === 0 ? (
          <div className="box t-center t-tiny t-dim" style={{ padding: 'var(--d6)' }}>
            아직 없다. 오늘 들은 것에서 다섯 개만 뽑아보자.
          </div>
        ) : filtered.length === 0 ? (
          <div className="box t-center t-tiny t-dim" style={{ padding: 'var(--d6)' }}>
            검색 결과가 없다.
          </div>
        ) : (
          <ul className="stack" style={{ display: 'flex', flexDirection: 'column' }}>
            {groupByDay(filtered).map(([noteDay, items]) => (
              <li key={noteDay} className="stack-sm" style={{ display: 'flex', flexDirection: 'column' }}>
                <div className="row-between">
                  <span className="t-tiny t-mono t-invert">{noteDay}</span>
                  <span className="t-tiny t-dim">{items.length}개</span>
                </div>
                <ul className="stack-sm" style={{ display: 'flex', flexDirection: 'column' }}>
                  {items.map((note) => (
                    <li key={note.id} className="box" style={{ padding: 'var(--d3)' }}>
                      <div className="row-between" style={{ alignItems: 'flex-start' }}>
                        <div className="grow stack-sm" style={{ display: 'flex', flexDirection: 'column' }}>
                          <span className="t-tiny t-dim">{note.heard}</span>
                          <span className="t-mono" style={{ fontSize: 14 }}>
                            → {note.mine}
                          </span>
                          {note.source && (
                            <span>
                              <Badge>{note.source}</Badge>
                            </span>
                          )}
                        </div>
                        <Btn
                          size="ghost"
                          onClick={() => update(removeNote(state, note.id))}
                          title="지우기"
                          aria-label={`${note.heard} 지우기`}
                        >
                          ×
                        </Btn>
                      </div>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </section>

      <footer className="t-center t-tiny t-dim">
        <Divider dashed />
        <p style={{ marginTop: 'var(--d2)' }}>
          이번 주 {notesWithin(state, 7).length}개 · 기록은 이 브라우저에만 저장됩니다.
        </p>
      </footer>
    </div>
  )
}
