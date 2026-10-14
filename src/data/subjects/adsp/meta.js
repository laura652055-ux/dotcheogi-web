import { CHAPTERS, PARTS } from './chapters.js'
import { IS_SAMPLE_DATA, QUESTIONS } from './questions.js'

/**
 * ADsP (데이터분석 준전문가) — 한국데이터산업진흥원.
 *
 * 정처기와 결정적으로 다른 점은 **과목별 과락**이다.
 * 총점 60점을 넘겨도 어느 한 과목이 40% 미만이면 탈락한다.
 * 그래서 parts / partPassRate 를 채우고, 결과 화면이 과목 단위로 다시 집계한다.
 */
export default {
  id: 'adsp',
  name: 'ADsP',
  fullName: '데이터분석 준전문가',
  tagline: '객관식 / 단답형 / 빈칸',
  blurb: '3과목 50문항 · 과목별 과락 있음',

  passScore: 60,     // 총점 합격선 (%)
  partPassRate: 40,  // 과목별 과락 기준 (%) — 미만이면 총점과 무관하게 탈락
  examSize: 50,      // 실제 시험 문항 수
  examPlan: [        // 과목별 문항 배분. 풀이 모자라면 있는 만큼만 낸다
    { part: 1, count: 10 },
    { part: 2, count: 10 },
    { part: 3, count: 30 },
  ],

  parts: PARTS,
  chapters: CHAPTERS,
  questions: QUESTIONS,
  isSample: IS_SAMPLE_DATA,
  // 이 문제들은 기출이 아니다. 출제 범위를 보고 AI 가 작성한 것이라 검증되지
  // 않았다. 공부용 자료에서 틀린 내용은 해롭기 때문에 화면에 분명히 밝힌다.
  sampleBadge: '미검증',
  sampleLabel: '검증되지 않은 AI 작성 문제',

  chapterLabel: '챕터',
  sampleNote:
    '기출이 아니라 출제 범위를 보고 AI 가 만든 문제라, 내용이 틀릴 수 있습니다. 구조를 익히는 용도로만 쓰고 실제 공부는 검증된 자료로 하세요.',
  scoreNote: '합격은 총점 60점 이상이면서 모든 과목이 40% 이상일 때입니다.',
}
