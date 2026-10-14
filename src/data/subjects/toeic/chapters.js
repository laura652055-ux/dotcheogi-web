import { buildChapters } from '../../english-vocab.js'
import { TSL_WORDS } from './words-tsl.js'

/**
 * TOEIC 필수 어휘 출제 범위 — TSL 1250단어, T01~T10.
 *
 * 자격증 과목과 달리 "단원"이 없다. 대신 **출현 빈도 순위**로 끊었다.
 * 앞 챕터일수록 시험에 자주 나오는 단어다 — 순서대로 외우는 게 곧 효율 순이다.
 *
 * 원래 이 과목에는 일반 영어 핵심어(NGSL 1001~2809위)도 G01~G15 로 같이 들어
 * 있었다. 성격이 다른 목록이라 '일반 영어' 과목(src/data/subjects/ngsl)으로
 * 떼어냈다. TSL 은 NGSL 위에 얹어 쓰도록 설계된 목록이라, 두 과목을 다
 * 끝내면 최신 TOEIC 의 98.5% 를 덮는다.
 *
 * 어휘 시험이 아니므로 과목별 과락(part)은 두지 않는다. (meta.js 의 parts: null)
 */

/** 단어 목록. 필드 설명은 src/data/english-vocab.js 참고. */
export const LIST = {
  key: 'tsl',
  code: 'T',
  idPrefix: 't',
  name: 'TOEIC',
  words: TSL_WORDS,
  rankOffset: 0,
  seed: 1,
}

export const CHAPTERS = buildChapters(LIST)
