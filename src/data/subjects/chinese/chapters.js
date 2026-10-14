import { HSK1_WORDS } from './words-hsk1.js'
import { HSK2_WORDS } from './words-hsk2.js'
import { HSK3_WORDS } from './words-hsk3.js'
import { HSK4_WORDS } from './words-hsk4.js'
import { HSK5_WORDS } from './words-hsk5.js'
import { HSK6_WORDS } from './words-hsk6.js'

/**
 * 중국어 HSK 어휘 출제 범위.
 *
 * 두 단계로 끊는다. **바깥은 급수, 안쪽은 출현 빈도순**이다.
 * 1급부터 순서대로 풀면 그게 곧 시험 순서이자 효율 순서다.
 *
 *   1급 506 · 2급 750 · 3급 953 · 4급 972 · 5급 1059 · 6급 1123  (합계 5363단어)
 *
 * 한 챕터는 100~120단어다. 급마다 단어 수가 달라 챕터 크기를 고정하면 끝 챕터가
 * 몇 개짜리로 남는다. 그래서 크기를 고정하지 않고 **급을 균등하게 나눈다.**
 * (예: 1급 506단어 → 102개짜리 5챕터. 125개씩 자르면 마지막이 6개가 된다)
 *
 * 어휘 과목이라 과목별 과락(part)은 두지 않는다. (meta.js 의 parts: null)
 */

/** 챕터 하나에 넣고 싶은 단어 수. 실제 크기는 급을 이 값으로 균등 분할해 정한다. */
export const TARGET = 120

/** 급을 몇 개 챕터로 나눌지 */
const chapterCount = (words) => Math.ceil(words.length / TARGET)

/** 그 급의 실제 챕터 크기 */
export const chunkOf = (words) => Math.ceil(words.length / chapterCount(words))

/**
 * 급수 정의. questions.js 가 이걸 그대로 돌면서 문항을 만든다.
 *
 * `idPrefix` 는 문항 id 앞글자다. **한 번 정하면 바꾸지 않는다** —
 * id 가 진도·오답의 저장 키이기 때문이다. (questions.js 주석 참고)
 */
export const LEVELS = [
  { level: 1, code: 'H1', idPrefix: 'h1', words: HSK1_WORDS },
  { level: 2, code: 'H2', idPrefix: 'h2', words: HSK2_WORDS },
  { level: 3, code: 'H3', idPrefix: 'h3', words: HSK3_WORDS },
  { level: 4, code: 'H4', idPrefix: 'h4', words: HSK4_WORDS },
  { level: 5, code: 'H5', idPrefix: 'h5', words: HSK5_WORDS },
  { level: 6, code: 'H6', idPrefix: 'h6', words: HSK6_WORDS },
]

function build() {
  const out = []
  let id = 0

  for (const lv of LEVELS) {
    const chunk = chunkOf(lv.words)
    for (let i = 0; i < chapterCount(lv.words); i += 1) {
      const from = i * chunk + 1
      const to = Math.min((i + 1) * chunk, lv.words.length)
      id += 1
      out.push({
        id,
        code: `${lv.code}-${i + 1}`,
        name: `${lv.level}급 빈출 ${from}~${to}`,
        level: lv.level,
      })
    }
  }
  return out
}

export const CHAPTERS = build()

/** 어느 급이 몇 번 챕터부터 시작하는지. questions.js 가 챕터 id 를 매길 때 쓴다. */
export const chapterStart = (level) =>
  CHAPTERS.findIndex((c) => c.level === level) + 1
