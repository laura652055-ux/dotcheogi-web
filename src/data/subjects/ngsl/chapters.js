import { buildChapters } from '../../english-vocab.js'
import { NGSL_RANK_OFFSET, NGSL_WORDS } from './words-ngsl.js'

/**
 * 일반 영어 필수 어휘 출제 범위 — NGSL 1001~2809위 1809단어, G01~G15.
 *
 * 원래 TOEIC 과목 안에 두 번째 목록으로 들어 있던 것을 따로 떼어냈다.
 * 시험 전용 어휘가 아니라 영어 전반의 바탕이 되는 단어라, TOEIC 을 안 봐도
 * 쓸 데가 있다.
 *
 * TOEIC 과 같이 **출현 빈도 순위**로 125단어씩 끊는다. 마지막 G15 는 59단어다.
 * 챕터 코드 G01~G15 는 TOEIC 과목에 있던 시절 이름 그대로다.
 *
 * 어휘 시험이 아니므로 과목별 과락(part)은 두지 않는다. (meta.js 의 parts: null)
 */

/**
 * 단어 목록. 필드 설명은 src/data/english-vocab.js 참고.
 * idPrefix 'g' 와 seed 7 은 TOEIC 과목 시절 값 그대로다 — 바꾸면 기록이 끊긴다.
 */
export const LIST = {
  key: 'ngsl',
  code: 'G',
  idPrefix: 'g',
  name: '일반 영어',
  words: NGSL_WORDS,
  rankOffset: NGSL_RANK_OFFSET,
  seed: 7,
}

export const CHAPTERS = buildChapters(LIST)
