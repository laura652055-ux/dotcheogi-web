/**
 * 합격 판정.
 *
 * 시험마다 규칙이 다르다.
 *  · 정처기 실기 — 총점 60점. 그게 전부다.
 *  · ADsP / 컴활 — 총점 60점 + 과목별 과락. 총점을 넘겨도 한 과목이
 *    기준 미만이면 탈락한다. 그래서 총점 하나만 보여주면 거짓말이 된다.
 *
 * 규칙은 subject.passScore / subject.partPassRate 가 들고 있고,
 * 여기서는 그걸 읽어 결과 한 덩어리로 만든다.
 */

import { percent } from './quiz.js'

/**
 * @param subject 과목 객체
 * @param summary [{ id, status }] — status 는 'correct' | 'wrong' | 'manual'
 * @returns {{
 *   total: number, correct: number, pending: number, score: number,
 *   passScore: number, scorePassed: boolean,
 *   parts: Array<{ id, code, name, total, correct, rate, passed }>,
 *   failedParts: Array<object>, passed: boolean
 * }}
 */
export function report(subject, summary) {
  const total = summary.length
  const correct = summary.filter((s) => s.status === 'correct').length
  const pending = summary.filter((s) => s.status === 'manual').length
  const score = percent(correct, total)

  const passScore = subject.passScore ?? 60
  const scorePassed = score >= passScore

  const parts = buildParts(subject, summary)
  const failedParts = parts.filter((p) => !p.passed)

  return {
    total,
    correct,
    pending,
    score,
    passScore,
    scorePassed,
    parts,
    failedParts,
    passed: scorePassed && failedParts.length === 0,
  }
}

/**
 * 과목(과락 단위)별 집계.
 * parts 나 partPassRate 가 없는 시험이면 빈 배열 — 결과 화면도 총점만 보여준다.
 * 이번 세션에 한 문제도 안 나온 과목은 판정 대상에서 뺀다. 0/0 을 과락으로
 * 잡으면 챕터 하나만 골라 푼 학습 모드가 전부 탈락으로 뜬다.
 */
function buildParts(subject, summary) {
  if (!subject.parts || subject.partPassRate == null) return []

  const chapterOf = new Map(subject.questions.map((q) => [q.id, q.chapter]))
  const partOf = new Map(subject.chapters.map((c) => [c.id, c.part]))

  const tally = new Map()
  for (const s of summary) {
    const part = partOf.get(chapterOf.get(s.id))
    if (part == null) continue
    const bucket = tally.get(part) ?? { total: 0, correct: 0 }
    bucket.total += 1
    if (s.status === 'correct') bucket.correct += 1
    tally.set(part, bucket)
  }

  return subject.parts
    .filter((p) => (tally.get(p.id)?.total ?? 0) > 0)
    .map((p) => {
      const { total, correct } = tally.get(p.id)
      const rate = percent(correct, total)
      return {
        id: p.id,
        code: p.code,
        name: p.name,
        total,
        correct,
        rate,
        passed: rate >= subject.partPassRate,
      }
    })
}

/** 결과 화면 상단에 띄울 한 줄 판정 */
export function verdictText(subject, r) {
  if (r.pending > 0) return `자가채점 ${r.pending}문항이 남아 판정이 확정되지 않았습니다.`
  if (r.passed) return '합격 기준을 넘겼습니다.'
  if (!r.scorePassed && r.failedParts.length > 0) {
    return `총점 미달 + ${r.failedParts.map((p) => p.name).join(', ')} 과락입니다.`
  }
  if (r.failedParts.length > 0) {
    return `총점은 넘겼지만 ${r.failedParts.map((p) => p.name).join(', ')} 과목이 과락입니다.`
  }
  return `총점이 ${r.passScore}점에 미달합니다.`
}
