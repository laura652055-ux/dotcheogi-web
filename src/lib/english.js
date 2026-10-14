/**
 * 영어 루틴 기록 — localStorage.
 *
 * 과목 기록(dotcheogi.<과목id>.v1)과 완전히 분리된 키를 쓴다. 여긴 채점도
 * 문항도 없고 "그날 뭘 했는지"와 "내가 적은 덩어리"만 남는다.
 *
 *   dotcheogi.english.v1
 *
 * 날짜 키(YYYY-MM-DD)와 try/catch 규칙은 storage.js 와 같다.
 */

import { todayKey } from './storage.js'

const KEY = 'dotcheogi.english.v1'

const read = () => {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

const write = (value) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(value))
  } catch {
    /* 저장 실패해도 화면은 굴러가야 한다 */
  }
}

const emptyState = () => ({
  version: 1,
  /** 'YYYY-MM-DD' → 그날 체크한 블록 id 배열 */
  days: {},
  /** { id, at, day, heard, mine, source } — 최신이 앞 */
  notes: [],
})

export function load() {
  const parsed = read()
  if (parsed?.version !== 1) return emptyState()
  return { ...emptyState(), ...parsed }
}

export function save(state) {
  write(state)
  return state
}

export function reset() {
  try {
    localStorage.removeItem(KEY)
  } catch {
    /* noop */
  }
  return emptyState()
}

/* ---------------- 날짜 ---------------- */

/** 토·일이면 주말 블록을 쓴다 */
export const isWeekend = (date = new Date()) => {
  const d = date.getDay()
  return d === 0 || d === 6
}

/** 최근 n일 날짜 키 (오늘이 마지막) */
export function recentDays(n, from = new Date()) {
  const keys = []
  const cursor = new Date(from)
  for (let i = 0; i < n; i += 1) {
    keys.unshift(todayKey(cursor))
    cursor.setDate(cursor.getDate() - 1)
  }
  return keys
}

/* ---------------- 블록 체크 ---------------- */

/** 그날 체크한 블록 id 배열 (없으면 빈 배열) */
export const blocksOn = (state, day = todayKey()) => state.days[day] ?? []

export const isChecked = (state, blockId, day = todayKey()) =>
  blocksOn(state, day).includes(blockId)

/** 블록 하나를 켜고 끈다. 비면 그날 키 자체를 지워 빈 날이 쌓이지 않게 한다. */
export function toggleBlock(state, blockId, day = todayKey()) {
  const current = new Set(blocksOn(state, day))
  if (current.has(blockId)) current.delete(blockId)
  else current.add(blockId)

  const days = { ...state.days }
  if (current.size === 0) delete days[day]
  else days[day] = [...current]

  return { ...state, days }
}

/* ---------------- 셀프토크 진도 ---------------- */

const TALK = 'talk'

/**
 * 오늘 볼 질문 번호.
 *
 * 달력 날짜가 아니라 **셀프토크를 실제로 체크한 날의 수**로 센다. 하루 걸러도
 * 질문이 건너뛰어지지 않고, 그냥 들어와서 구경만 한 날에 질문이 소모되지도
 * 않는다. 오늘 이미 체크했으면 오늘 것이 이미 소비된 셈이라 하나 뺀다.
 */
export function talkProgress(state, total, day = todayKey()) {
  const done = Object.values(state.days).filter((ids) => ids.includes(TALK)).length
  const doneToday = blocksOn(state, day).includes(TALK)
  const raw = doneToday ? done - 1 : done
  return {
    done,
    /** 90개를 다 돌면 처음으로 돌아간다 */
    index: total > 0 ? ((raw % total) + total) % total : 0,
    lap: total > 0 ? Math.floor(raw / total) : 0,
  }
}

/** 며칠차인가 — 무언가 체크한 날의 수 */
export const activeDays = (state) => Object.keys(state.days).length

/** 몇 개월차인가 (30일 = 1개월). 기록이 없으면 1 */
export function monthNumber(state) {
  const keys = Object.keys(state.days).sort()
  if (keys.length === 0) return 1
  const first = new Date(`${keys[0]}T00:00:00`)
  const elapsed = Math.floor((Date.now() - first.getTime()) / 86400000)
  return Math.floor(elapsed / 30) + 1
}

/** 연속 일수 — 오늘 아직 안 했어도 어제까지 이어졌으면 살아있는 것으로 본다 */
export function streak(days) {
  const cursor = new Date()
  let count = 0
  if (!days[todayKey(cursor)]) cursor.setDate(cursor.getDate() - 1)
  for (;;) {
    if (!days[todayKey(cursor)]) break
    count += 1
    cursor.setDate(cursor.getDate() - 1)
  }
  return count
}

/* ---------------- 덩어리 노트 ---------------- */

/** 새 덩어리. heard(들은 표현)와 mine(내 문장) 둘 다 있어야 저장한다. */
export function addNote(state, { heard, mine, source }) {
  const note = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    at: Date.now(),
    day: todayKey(),
    heard: heard.trim(),
    mine: mine.trim(),
    source: (source ?? '').trim(),
  }
  return { ...state, notes: [note, ...state.notes] }
}

export const removeNote = (state, id) => ({
  ...state,
  notes: state.notes.filter((n) => n.id !== id),
})

export const notesOn = (state, day) => state.notes.filter((n) => n.day === day)

/** 최근 n일 안에 적은 것 */
export function notesWithin(state, n) {
  const window = new Set(recentDays(n))
  return state.notes.filter((n2) => window.has(n2.day))
}

/**
 * 복습용 — 오늘 이전에 덩어리를 적은 가장 최근 날.
 * "어제 복습"이라고 부르지만 하루 걸렀으면 그 전날 것을 보여줘야 맞다.
 */
export function lastNoteDay(state, before = todayKey()) {
  for (const note of state.notes) {
    if (note.day < before) return note.day
  }
  return null
}

/** 날짜별로 묶어 최신 날짜가 먼저 오게 한다 */
export function groupByDay(notes) {
  const map = new Map()
  for (const note of notes) {
    if (!map.has(note.day)) map.set(note.day, [])
    map.get(note.day).push(note)
  }
  return [...map.entries()].sort((a, b) => b[0].localeCompare(a[0]))
}

/** 텍스트로 내보내기 — 다른 데 옮겨 적거나 백업할 때 */
export function toText(notes) {
  return groupByDay(notes)
    .map(([day, items]) => {
      const lines = items.map(
        (n) => `- ${n.heard}\n  → ${n.mine}${n.source ? `  (${n.source})` : ''}`,
      )
      return `## ${day}\n${lines.join('\n')}`
    })
    .join('\n\n')
}
