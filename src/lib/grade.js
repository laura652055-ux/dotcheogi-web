/**
 * 채점 로직.
 *
 * 실기 답안은 표기 흔들림이 심하다 ("제3정규형" / "3정규형" / "3NF").
 * 그래서 기본 채점은 문자/숫자만 남기고 비교한다.
 * 공백까지 정확히 맞아야 하는 문제(코드 출력 등)는 문제에 strict: true 를 준다.
 */

/** 관대한 정규화: 문자와 숫자만 남긴다. 공백·기호·대소문자 무시. */
export function normalize(value) {
  return String(value ?? '')
    .normalize('NFC')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]/gu, '')
}

/** 엄격한 정규화: 앞뒤 공백만 정리하고 연속 공백을 하나로 줄인다. */
export function normalizeStrict(value) {
  return String(value ?? '')
    .normalize('NFC')
    .trim()
    .replace(/\s+/g, ' ')
}

const pick = (strict) => (strict ? normalizeStrict : normalize)

/** 한 칸짜리 답이 허용 답안 목록 중 하나와 일치하는가 */
function matchesOne(input, accepted, strict) {
  const norm = pick(strict)
  const target = norm(input)
  if (!target) return false
  return accepted.some((a) => norm(a) === target)
}

/**
 * 문제 하나를 채점한다.
 *
 * @param  question   문제 객체
 * @param  response   short/code/essay → string
 *                    blank            → string[]  (빈칸 순서대로)
 *                    choice           → number[]  (선택한 인덱스)
 * @returns {{ status: 'correct'|'wrong'|'manual', perBlank?: boolean[], matchedKeywords?: string[] }}
 *          status 'manual' 은 자동 채점 불가(약술형) → 사용자가 직접 O/X 를 누른다.
 */
export function grade(question, response) {
  const strict = Boolean(question.strict)

  switch (question.type) {
    case 'short':
    case 'code': {
      const ok = matchesOne(response, question.answer, strict)
      return { status: ok ? 'correct' : 'wrong' }
    }

    case 'blank': {
      const given = Array.isArray(response) ? response : []
      const perBlank = question.answer.map((accepted, i) =>
        matchesOne(given[i], accepted, strict),
      )
      const ok = perBlank.length > 0 && perBlank.every(Boolean)
      return { status: ok ? 'correct' : 'wrong', perBlank }
    }

    case 'choice': {
      const given = Array.isArray(response) ? response : [response]
      const picked = [...new Set(given.filter((n) => Number.isInteger(n)))].sort()
      const want = [...new Set(question.answer)].sort()
      const ok =
        picked.length === want.length && picked.every((n, i) => n === want[i])
      return { status: ok ? 'correct' : 'wrong' }
    }

    case 'essay': {
      // 서술형은 자동 채점하지 않는다. 대신 어떤 키워드를 썼는지만 짚어준다.
      const text = normalize(response)
      const matchedKeywords = (question.keywords ?? []).filter((k) =>
        text.includes(normalize(k)),
      )
      return { status: 'manual', matchedKeywords }
    }

    default:
      return { status: 'manual' }
  }
}

/**
 * 화면에 보여줄 정답 문자열.
 *
 * 허용 표기를 전부 늘어놓으면 읽기 어려운 문제가 있다. 중국어 병음처럼
 * 같은 답의 표기 변형이 여럿인 경우다 (nǚ / nü / nu / nv / nu3 …).
 * 그런 문항은 `answerLabel` 에 대표 표기 하나를 적어 두면 그걸 보여준다.
 * 채점은 `answer` 로 그대로 하므로 정답 범위는 좁아지지 않는다.
 */
export function answerText(question) {
  if (question.answerLabel) return question.answerLabel

  switch (question.type) {
    case 'choice':
      return question.answer
        .map((i) => `${i + 1}. ${question.choices?.[i] ?? ''}`)
        .join('  /  ')
    case 'blank':
      return question.answer
        .map((accepted, i) => `(${i + 1}) ${bankItem(question, accepted[0]) ?? accepted[0]}`)
        .join('   ')
    default:
      return question.answer.join('  /  ')
  }
}

/**
 * <보기> 기호로 적힌 답을 보기 항목 전체로 바꾼다. 'ㄹ' → 'ㄹ. 일관성 검사 오라클'
 * 기호만 보여주면 정답을 확인해도 무슨 용어였는지 알 수 없다.
 */
function bankItem(question, value) {
  return question.bank?.find((item) => item.startsWith(`${value}.`)) ?? null
}

/** 빈 응답인지 (제출 버튼 비활성화 판단용) */
export function isBlankResponse(question, response) {
  if (question.type === 'choice') {
    return !Array.isArray(response) || response.length === 0
  }
  if (question.type === 'blank') {
    return !Array.isArray(response) || response.every((v) => !String(v ?? '').trim())
  }
  return !String(response ?? '').trim()
}
