import { buildQuestions } from '../../english-vocab.js'
import { LIST } from './chapters.js'

/**
 * 일반 영어 어휘 문항 — NGSL 1809단어 × 2방향 = 3618문항.
 *
 * 손으로 적지 않고 단어 목록에서 생성한다. 생성 규칙과 **바꾸면 안 되는
 * 문항 id 규칙**은 src/data/english-vocab.js 에 있다.
 */
export const QUESTIONS = buildQuestions(LIST)

/** 출처가 분명한 공개 어휘 목록이라 샘플이 아니다. */
export const IS_SAMPLE_DATA = false

export const SOURCE_URL = 'https://www.newgeneralservicelist.com/new-general-service-list'
