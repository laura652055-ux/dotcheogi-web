import { CHAPTERS } from './chapters.js'
import { IS_SAMPLE_DATA, QUESTIONS, SOURCE_URL } from './questions.js'

/**
 * 일반 영어 필수 어휘 (NGSL).
 *
 * TOEIC 과 같은 성격이다. **합격/불합격을 가리는 시험이 아니라 어휘량을 쌓는 과목**이다.
 * 합격선 80 · 과락 없음 · 모의고사 50문항도 TOEIC 과 같은 이유로 잡았다.
 * (src/data/subjects/toeic/meta.js 참고)
 *
 * id 를 'english' 로 하지 않은 이유: 영어 루틴 기록이 이미 dotcheogi.english.v1
 * 키를 쓰고 있다. (src/lib/english.js) 과목 기록 키가 dotcheogi.<id>.v1 이라
 * 같은 id 를 쓰면 두 기록이 서로를 덮어쓴다.
 */
export default {
  id: 'ngsl',
  name: '일반 영어',
  fullName: '일반 영어 필수 어휘',
  tagline: '뜻 고르기 · 철자 쓰기 · 1809단어',
  blurb: '빈출순 1809단어 3618문항 · 하루 한 챕터',

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
    'New General Service List 1.2 · Browne, Culligan & Phillips · CC BY-SA 4.0 (한글 뜻은 직접 작성)',
  sourceUrl: SOURCE_URL,
  scoreNote:
    '합격선이 있는 시험이 아닙니다. 80% 는 이 범위를 뗐다고 볼 기준선이고, 틀린 단어는 오답 모드에서 다시 나옵니다.',
}
