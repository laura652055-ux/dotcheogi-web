import { CHAPTERS } from './chapters.js'
import { IS_SAMPLE_DATA, QUESTIONS, SOURCE_URL } from './questions.js'

/**
 * TOEIC 필수 어휘.
 *
 * 자격증 두 과목과 성격이 다르다. **합격/불합격을 가리는 시험이 아니라 어휘량을
 * 쌓는 과목**이다. 그래서 몇 가지를 다르게 잡았다.
 *
 *   · 합격선을 60 이 아니라 80 으로 뒀다. 어휘는 60% 만 알면 지문이 읽히지 않는다.
 *     시험 합격선이 아니라 "이 범위는 뗐다"고 볼 기준선이다.
 *   · 과락(parts)은 없다. 품사별로 떨어뜨릴 이유가 없다.
 *   · 모의고사 50문항은 실제 TOEIC 문항 수가 아니라 한 번에 풀기 적당한 양이다.
 *     TOEIC 은 200문항이지만 그중 어휘만 따로 세는 시험이 아니다.
 */
export default {
  id: 'toeic',
  name: 'TOEIC',
  fullName: 'TOEIC 필수 어휘',
  tagline: '뜻 고르기 · 철자 쓰기 · 1250단어',
  blurb: '빈출순 1250단어 2500문항 · 하루 한 챕터',

  passScore: 80,      // 시험 합격선이 아니라 "이 범위를 뗐다"고 볼 기준 (%)
  partPassRate: null, // 과락 없음
  examSize: 50,       // 한 번에 풀기 적당한 양
  examPlan: null,     // 과목별 배분 없음 — 고른 범위에서 랜덤

  parts: null,
  chapters: CHAPTERS,
  questions: QUESTIONS,
  isSample: IS_SAMPLE_DATA,

  chapterLabel: '범위',

  // CC BY-SA 4.0 자료다. 저작자 표시가 라이선스 조건이므로 화면에서 지우지 않는다.
  sourceLabel:
    'TOEIC Service List 1.2 · Browne & Culligan · CC BY-SA 4.0 (한글 뜻은 직접 작성)',
  sourceUrl: SOURCE_URL,
  scoreNote:
    '합격선이 있는 시험이 아닙니다. 80% 는 이 범위를 뗐다고 볼 기준선이고, 틀린 단어는 오답 모드에서 다시 나옵니다.',
}
