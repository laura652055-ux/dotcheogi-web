/**
 * 학습 기록 저장 — localStorage.
 * 서버가 없으므로 브라우저를 바꾸면 기록도 사라진다. (README 참고)
 *
 * 키는 과목별로 나눈다. 과목이 달라지면 기록도 완전히 분리된다.
 *   dotcheogi.<subjectId>.v1   과목별 학습 기록
 *   dotcheogi.settings.v1      과목과 무관한 설정 (흑백 반전 등)
 *
 * 모든 접근은 try/catch 로 감싼다. 시크릿 모드나 사이트 데이터 차단 시
 * localStorage 접근 자체가 예외를 던지기 때문이다.
 */

const PREFIX = 'dotcheogi'
const SETTINGS_KEY = `${PREFIX}.settings.v1`

/** 과목 분리 이전 단일 키. 정처기 기록으로 한 번만 옮긴다. */
const LEGACY_KEY = `${PREFIX}.v1`
const LEGACY_SUBJECT = 'jeongcheogi'

const keyFor = (subjectId) => `${PREFIX}.${subjectId}.v1`

const read = (key) => {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

const write = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* 저장 실패해도 학습은 계속 굴러가야 한다 */
  }
}

/* ---------------- 과목별 학습 기록 ---------------- */

const emptyState = () => ({
  version: 1,
  /** qid → { correct, wrong, lastAt, lastResult } */
  records: {},
  /** 최근에 틀린 문제 id 목록 (맞히면 빠진다) */
  wrongIds: [],
  /** 세션 기록 { at, mode, chapter, total, correct } */
  sessions: [],
  /** 'YYYY-MM-DD' → 그날 푼 문제 수 */
  days: {},
  /**
   * '<mode>:<chapter>' → { qid, at }
   * 끝까지 안 풀고 나간 자리. 다음에 그 문항부터 이어서 시작한다.
   * 문제 순서가 고정된 모드(학습)에서만 의미가 있다.
   */
  cursors: {},
})

export function load(subjectId) {
  splitOff(subjectId)
  const parsed = read(keyFor(subjectId)) ?? migrateLegacy(subjectId)
  if (parsed?.version !== 1) return emptyState()
  // settings 는 이제 전역이라 과목 상태에서 떨어져 나갔다. 남아 있어도 무시한다.
  const { settings: _drop, ...rest } = parsed
  return { ...emptyState(), ...rest }
}

/**
 * 과목이 하나뿐이던 시절의 키를 정처기 기록으로 승격시킨다.
 * 옮긴 뒤에도 원본은 지우지 않는다 — 되돌릴 여지를 남긴다.
 */
function migrateLegacy(subjectId) {
  if (subjectId !== LEGACY_SUBJECT) return null
  const legacy = read(LEGACY_KEY)
  if (legacy?.version !== 1) return null

  const { settings, ...rest } = legacy
  write(keyFor(subjectId), rest)
  // 반전 설정은 전역으로 올린다 (이미 저장된 게 없을 때만)
  if (settings && !read(SETTINGS_KEY)) write(SETTINGS_KEY, settings)
  return rest
}

/**
 * 한 과목에서 떨어져 나간 과목.
 *
 * 일반 영어(NGSL)는 TOEIC 과목 안에 G01~G15 = 챕터 11~25 로 같이 있었다.
 * 문항 id(g1001-m …)는 그대로라 기록을 새 키로 옮기기만 하면 되고,
 * 챕터 번호만 11~25 → 1~15 로 당긴다.
 */
const SPLITS = [{ from: 'toeic', to: 'ngsl', idPrefix: 'g', chapterShift: 10 }]

/**
 * 원래 과목 기록에 섞여 있는 떨어져 나간 과목 몫을 옮긴다.
 * 두 과목 중 어느 쪽을 먼저 열어도 한 번에 양쪽을 같이 고쳐 쓴다 — 한쪽만
 * 고치면 다른 쪽을 열 때 옮길 기록이 이미 지워져 있을 수 있다.
 *
 * 옮길 게 없으면(이미 나눴거나 그 목록을 푼 적이 없으면) 아무것도 쓰지 않는다.
 * 원본은 처음 한 번만 백업 키에 남긴다 — migrateLegacy 와 같은 이유다.
 *
 * 하루 푼 문제 수(days)는 문항별로 갈라낼 근거가 없어서 원래 과목에 둔다.
 * 전체 범위로 푼 세션도 두 목록이 섞여 있어서 원래 과목에 남는다.
 */
function splitOff(subjectId) {
  const rule = SPLITS.find((r) => r.from === subjectId || r.to === subjectId)
  if (!rule) return
  const src = read(keyFor(rule.from))
  if (src?.version !== 1) return

  const movesId = (qid) => typeof qid === 'string' && qid.startsWith(rule.idPrefix)
  const movesChapter = (ch) => typeof ch === 'number' && ch > rule.chapterShift
  /** '<mode>:<chapter>' (quiz.js 의 cursorKey) — 전체 범위(all)는 이어서 풀 문항이 어느 목록인지로 가른다 */
  const movesCursor = ([key, c]) => {
    const ch = key.split(':')[1]
    return ch === 'all' ? movesId(c?.qid) : movesChapter(Number(ch))
  }
  const shiftCursor = ([key, c]) => {
    const [mode, ch] = key.split(':')
    return [ch === 'all' ? key : `${mode}:${Number(ch) - rule.chapterShift}`, c]
  }

  const records = Object.entries(src.records ?? {})
  const wrongIds = src.wrongIds ?? []
  const sessions = src.sessions ?? []
  const cursors = Object.entries(src.cursors ?? {})

  const moved = {
    records: Object.fromEntries(records.filter(([id]) => movesId(id))),
    wrongIds: wrongIds.filter(movesId),
    sessions: sessions
      .filter((s) => movesChapter(s.chapter))
      .map((s) => ({ ...s, chapter: s.chapter - rule.chapterShift })),
    cursors: Object.fromEntries(cursors.filter(movesCursor).map(shiftCursor)),
  }
  const nothing =
    Object.keys(moved.records).length === 0 &&
    moved.wrongIds.length === 0 &&
    moved.sessions.length === 0 &&
    Object.keys(moved.cursors).length === 0
  if (nothing) return

  const backupKey = `${keyFor(rule.from)}.before-split`
  if (!read(backupKey)) write(backupKey, src)

  // 새 과목 키가 이미 있으면(예: 옛 버전 탭이 원래 과목에 다시 써 넣은 경우)
  // 새 과목 쪽 기록을 우선한다.
  const dst = read(keyFor(rule.to))
  const base = dst?.version === 1 ? { ...emptyState(), ...dst } : emptyState()
  const bySessionTime = new Map([...moved.sessions, ...base.sessions].map((s) => [s.at, s]))
  write(keyFor(rule.to), {
    ...base,
    records: { ...moved.records, ...base.records },
    wrongIds: [...new Set([...base.wrongIds, ...moved.wrongIds])],
    sessions: [...bySessionTime.values()].sort((a, b) => b.at - a.at).slice(0, 100),
    cursors: { ...moved.cursors, ...base.cursors },
  })

  write(keyFor(rule.from), {
    ...src,
    records: Object.fromEntries(records.filter(([id]) => !movesId(id))),
    wrongIds: wrongIds.filter((id) => !movesId(id)),
    sessions: sessions.filter((s) => !movesChapter(s.chapter)),
    cursors: Object.fromEntries(cursors.filter((entry) => !movesCursor(entry))),
  })
}

export function save(subjectId, state) {
  write(keyFor(subjectId), state)
  return state
}

export function reset(subjectId) {
  try {
    localStorage.removeItem(keyFor(subjectId))
    if (subjectId === LEGACY_SUBJECT) localStorage.removeItem(LEGACY_KEY)
  } catch {
    /* noop */
  }
  return emptyState()
}

/* ---------------- 전역 설정 ---------------- */

const emptySettings = () => ({ invert: false })

export const loadSettings = () => ({ ...emptySettings(), ...(read(SETTINGS_KEY) ?? {}) })

export const saveSettings = (settings) => {
  write(SETTINGS_KEY, settings)
  return settings
}

/* ---------------- 기록 갱신 ---------------- */

/** 로컬 기준 YYYY-MM-DD (toISOString 은 UTC 라 자정 근처에 하루가 밀린다) */
export function todayKey(date = new Date()) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

/**
 * 문제 하나의 결과를 반영한 새 state 를 만든다. (state 를 직접 바꾸지 않는다)
 * @param correct true=정답, false=오답
 */
export function applyResult(state, qid, correct) {
  const prev = state.records[qid] ?? { correct: 0, wrong: 0 }
  const now = Date.now()
  const day = todayKey()

  const records = {
    ...state.records,
    [qid]: {
      correct: prev.correct + (correct ? 1 : 0),
      wrong: prev.wrong + (correct ? 0 : 1),
      lastAt: now,
      lastResult: correct,
    },
  }

  const wrongSet = new Set(state.wrongIds)
  if (correct) wrongSet.delete(qid)
  else wrongSet.add(qid)

  return {
    ...state,
    records,
    wrongIds: [...wrongSet],
    days: { ...state.days, [day]: (state.days[day] ?? 0) + 1 },
  }
}

/** 세션 종료 기록. 최근 100개만 남긴다. */
export function pushSession(state, session) {
  const sessions = [{ at: Date.now(), ...session }, ...state.sessions].slice(0, 100)
  return { ...state, sessions }
}

/**
 * 이어서 풀 자리를 기록한다. qid 가 없으면(끝까지 풀었으면) 그 자리를 지운다.
 * 같은 자리를 다시 저장할 때는 state 를 그대로 돌려줘 불필요한 저장을 막는다.
 */
export function setCursor(state, key, qid) {
  const cursors = { ...state.cursors }
  if (qid) {
    if (cursors[key]?.qid === qid) return state
    cursors[key] = { qid, at: Date.now() }
  } else {
    if (!(key in cursors)) return state
    delete cursors[key]
  }
  return { ...state, cursors }
}

/** 저장된 자리의 문항 id (없으면 null) */
export const cursorOf = (state, key) => state.cursors?.[key]?.qid ?? null

/* ---------------- 통계 파생값 ---------------- */

/** 연속 학습일 수 (오늘 또는 어제부터 거슬러 올라가며 센다) */
export function streak(days) {
  const now = new Date()
  let count = 0
  // 오늘 아직 안 풀었어도 어제까지 이어졌으면 스트릭은 살아있는 것으로 본다
  if (!days[todayKey(now)]) now.setDate(now.getDate() - 1)
  for (;;) {
    if (!days[todayKey(now)]) break
    count += 1
    now.setDate(now.getDate() - 1)
  }
  return count
}

const emptyBucket = () => ({ total: 0, seen: 0, correct: 0, attempts: 0 })

/** 챕터별 { total, seen, correct, attempts } */
export function chapterStats(questions, records) {
  const byChapter = new Map()
  for (const q of questions) {
    const bucket = byChapter.get(q.chapter) ?? emptyBucket()
    bucket.total += 1
    const r = records[q.id]
    if (r) {
      bucket.seen += 1
      bucket.correct += r.correct
      bucket.attempts += r.correct + r.wrong
    }
    byChapter.set(q.chapter, bucket)
  }
  return byChapter
}

/**
 * 과목(과락 단위)별 누적 통계. parts 가 없는 시험이면 빈 Map.
 * 챕터 → part 매핑은 subject.chapters 가 들고 있다.
 */
export function partStats(subject, records) {
  const byPart = new Map()
  if (!subject.parts) return byPart

  const partOf = new Map(subject.chapters.map((c) => [c.id, c.part]))
  for (const q of subject.questions) {
    const part = partOf.get(q.chapter)
    if (part == null) continue
    const bucket = byPart.get(part) ?? emptyBucket()
    bucket.total += 1
    const r = records[q.id]
    if (r) {
      bucket.seen += 1
      bucket.correct += r.correct
      bucket.attempts += r.correct + r.wrong
    }
    byPart.set(part, bucket)
  }
  return byPart
}

/** 전체 정답률 0~1 (푼 적 없으면 null) */
export function overallRate(records) {
  let correct = 0
  let attempts = 0
  for (const r of Object.values(records)) {
    correct += r.correct
    attempts += r.correct + r.wrong
  }
  return attempts === 0 ? null : correct / attempts
}
