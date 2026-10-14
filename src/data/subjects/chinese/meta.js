import { CHAPTERS } from './chapters.js'
import { IS_SAMPLE_DATA, QUESTIONS, SOURCE_URL } from './questions.js'

/**
 * 중국어 HSK 3.0 필수 어휘.
 *
 * TOEIC 과 같은 성격이다. **합격/불합격을 가리는 시험이 아니라 어휘량을 쌓는 과목**이다.
 *
 *   · 합격선을 80 으로 뒀다. 어휘는 60% 만 알면 문장이 읽히지 않는다.
 *     시험 합격선이 아니라 "이 범위는 뗐다"고 볼 기준선이다.
 *   · 과락(parts)은 없다. 품사별로 떨어뜨릴 이유가 없다.
 *   · 모의고사 50문항은 실제 HSK 문항 수가 아니라 한 번에 풀기 적당한 양이다.
 *
 * **HSK 3.0 이다 (1~6급).** 2021년에 나온 새 기준으로, 구 HSK(2.0)와 급별 어휘가
 * 다르다. 3.0 에는 7~9급도 있지만 5606단어라 양이 급격히 뛰어서 넣지 않았다.
 * 응시 계획이 있으면 시험센터에 어느 체계로 치르는지 먼저 확인하는 게 안전하다.
 */
export default {
  id: 'chinese',
  name: 'HSK',
  fullName: '중국어 HSK 3.0 필수 어휘',
  tagline: '뜻 고르기 · 병음 쓰기 · 5363단어',
  blurb: '1급부터 급수 순 5363단어 10726문항 · 하루 한 챕터',

  passScore: 80,      // 시험 합격선이 아니라 "이 범위를 뗐다"고 볼 기준 (%)
  partPassRate: null, // 과락 없음
  examSize: 50,       // 한 번에 풀기 적당한 양
  examPlan: null,     // 과목별 배분 없음 — 고른 범위에서 랜덤

  parts: null,
  chapters: CHAPTERS,
  questions: QUESTIONS,
  isSample: IS_SAMPLE_DATA,

  chapterLabel: '범위',

  // 뜻·병음이 CC BY-SA 4.0 자료(CC-CEDICT)에서 왔다. 저작자 표시가 라이선스
  // 조건이므로 화면에서 지우지 않는다.
  sourceLabel:
    'complete-hsk-vocabulary (MIT) · 뜻·병음은 CC-CEDICT · CC BY-SA 4.0 (한글 뜻은 직접 작성)',
  sourceUrl: SOURCE_URL,
  scoreNote:
    '합격선이 있는 시험이 아닙니다. 80% 는 이 범위를 뗐다고 볼 기준선이고, 틀린 단어는 오답 모드에서 다시 나옵니다.',
}
