/**
 * ADsP(데이터분석 준전문가) 출제 범위.
 *
 * ADsP 는 정처기와 달리 **과목별 과락**이 있다 (과목당 40% 미만이면 탈락).
 * 그래서 챕터마다 어느 과목에 속하는지 `part` 로 표시하고,
 * 결과 화면이 과목 단위로 다시 집계한다.
 */

/** 과목. 문항 수와 배점은 실제 시험 기준. */
export const PARTS = [
  { id: 1, code: 'I',   name: '데이터 이해',      count: 10, points: 20 },
  { id: 2, code: 'II',  name: '데이터 분석 기획',  count: 10, points: 20 },
  { id: 3, code: 'III', name: '데이터 분석',      count: 30, points: 60 },
]

export const CHAPTERS = [
  { id: 1, part: 1, code: 'DATA', name: '데이터의 이해' },
  { id: 2, part: 1, code: 'VAL',  name: '데이터의 가치와 미래' },
  { id: 3, part: 1, code: 'SCI',  name: '데이터 사이언스와 전략 인사이트' },
  { id: 4, part: 2, code: 'PLAN', name: '데이터 분석 기획의 이해' },
  { id: 5, part: 2, code: 'MAST', name: '분석 마스터 플랜' },
  { id: 6, part: 3, code: 'RMART', name: 'R 기초와 데이터 마트' },
  { id: 7, part: 3, code: 'STAT', name: '통계 분석' },
  { id: 8, part: 3, code: 'MINE', name: '정형 데이터 마이닝' },
]
