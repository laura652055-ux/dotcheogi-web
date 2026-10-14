/**
 * 모드/챕터에 맞는 문제 묶음을 만든다.
 *
 * 여기서는 특정 과목을 import 하지 않는다. 항상 subject 를 인자로 받는다.
 * (과목이 늘어나도 이 파일은 그대로다)
 */

export function shuffle(list) {
  const out = [...list]
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

export const byId = (subject, id) => subject.questions.find((q) => q.id === id)

export const inChapter = (subject, chapter) =>
  chapter == null
    ? subject.questions
    : subject.questions.filter((q) => q.chapter === chapter)

/**
 * 모의고사 출제 범위. 범위를 고르지 않았고 과목에 examChapters 가 있으면 그 범위에서만
 * 뽑는다. 정처기는 용어 암기 문항이 실제 시험과 생김새가 달라서 그 범위를 뺀다.
 */
const examPool = (subject, chapter) =>
  chapter == null && subject.examChapters
    ? subject.questions.filter((q) => subject.examChapters.includes(q.chapter))
    : inChapter(subject, chapter)

/** 챕터 id → 과목(part) id. parts 가 없는 시험이면 전부 null */
const partOf = (subject) =>
  new Map(subject.chapters.map((c) => [c.id, c.part ?? null]))

/**
 * 모의고사 문제를 뽑는다.
 *
 * subject.examPlan 이 있으면 과목별 배분을 지킨다 (ADsP 처럼 과락이 있는 시험).
 * 해당 과목의 문제가 배분보다 적으면 있는 만큼만 낸다 — 모자란 걸 다른 과목에서
 * 채우면 과목별 점수가 왜곡되기 때문이다.
 */
function buildExam(subject, chapter) {
  const pool = examPool(subject, chapter)
  const size = subject.examSize ?? 20

  if (!subject.examPlan || chapter != null) return shuffle(pool).slice(0, size)

  const part = partOf(subject)
  const picked = subject.examPlan.flatMap(({ part: id, count }) =>
    shuffle(pool.filter((q) => part.get(q.chapter) === id)).slice(0, count),
  )
  // 과목 순서대로 뽑았으니 마지막에 한 번 섞어 실전처럼 만든다
  return shuffle(picked)
}

/**
 * @param subject 과목 객체 (src/data/subjects)
 * @param mode    'study' | 'exam' | 'wrong' | 'recall'
 * @param chapter 챕터 번호 또는 null(전체)
 * @param state   저장된 학습 기록 (wrong 모드에서 필요)
 */
export function buildSet(subject, mode, chapter, state) {
  switch (mode) {
    case 'exam':
      return buildExam(subject, chapter)

    case 'wrong': {
      const wrong = state.wrongIds.map((id) => byId(subject, id)).filter(Boolean)
      return chapter == null ? wrong : wrong.filter((q) => q.chapter === chapter)
    }

    case 'recall':
      // 암기 모드는 짧은 답이 있는 유형만 카드로 넘긴다
      return shuffle(
        inChapter(subject, chapter).filter(
          (q) => q.type === 'short' || q.type === 'code',
        ),
      )

    case 'study':
    default:
      // 학습 모드는 문항 데이터 순서를 그대로 따라간다
      return inChapter(subject, chapter)
  }
}

/**
 * 이번 모의고사에 실제로 나갈 문항 수.
 * 문제 풀이 실전 분량보다 적으면 있는 만큼만 나가므로, 화면에는 이 값을 보여준다.
 */
export function examCount(subject) {
  const size = subject.examSize ?? 20
  if (!subject.examPlan) return Math.min(size, examPool(subject, null).length)

  const part = partOf(subject)
  return subject.examPlan.reduce((sum, { part: id, count }) => {
    const available = subject.questions.filter((q) => part.get(q.chapter) === id).length
    return sum + Math.min(count, available)
  }, 0)
}

/** 진행률 퍼센트 (0~100 정수) */
export const percent = (part, whole) =>
  whole === 0 ? 0 : Math.round((part / whole) * 100)

/** 진도 저장 키. 모드와 범위가 같아야 이어서 풀 수 있다. */
export const cursorKey = (mode, chapter) => `${mode}:${chapter ?? 'all'}`
