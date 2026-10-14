import { CHAPTERS } from './chapters.js'
import { GAP_QUESTIONS } from './gap-questions.js'
import { QUESTIONS } from './questions.js'

// 용어·코드 문항(./questions.js)과 빈틈 문제(./gap-questions.js)는 성격이 달라 파일을 따로 둔다.
// 이 공개 저장소의 ./questions.js 는 비어 있다 (그 파일 머리말 참고).
const ALL_QUESTIONS = [...QUESTIONS, ...GAP_QUESTIONS]

// 문항이 하나도 없는 범위는 범위 선택·통계 화면에 내지 않는다. 지금은 용어 암기(1~12)와
// 코드 해석(13)이 비어 있다. 범위가 다 빠진 묶음(용어 암기)은 제목까지 숨는다.
const USED_CHAPTERS = new Set(ALL_QUESTIONS.map((q) => q.chapter))

/**
 * 정보처리기사 실기.
 *
 * 과목(과락) 개념이 없는 시험이라 `parts`가 null 이다.
 * 이 경우 결과 화면은 총점 하나만 보여준다.
 */
export default {
  id: 'jeongcheogi',
  name: '정처기',
  fullName: '정보처리기사 실기',
  tagline: '빈틈 문제',
  blurb: `빈틈 ${GAP_QUESTIONS.length}문항`,

  passScore: 60,      // 총점 합격선 (%)
  partPassRate: null, // 과목별 과락 없음
  examSize: 20,       // 모의고사 문항 수
  examPlan: null,     // 과목별 배분 없음 — examChapters 범위에서 랜덤

  parts: null,
  chapters: CHAPTERS.filter((c) => USED_CHAPTERS.has(c.id)),

  // 범위 목록을 성격별로 나눠 보여준다.
  chapterGroups: [
    { id: 'extra', name: '빈틈 문제', desc: '최근 실기에 나온 주제 — 서브넷 · 해시 · DB 설계 · SQL 제약조건 · 리눅스 · 자료구조' },
    { id: 'term', name: '용어 암기', desc: '설명을 보고 용어 쓰기' },
  ],

  // 전체 범위 모의고사는 용어 암기(1~12)를 빼고 뽑는다. 용어 암기 문항은 실제 시험과
  // 생김새가 달라서 섞으면 모의고사가 실전보다 쉬워진다. 지금은 빈틈 문제에서만 나온다.
  examChapters: CHAPTERS.filter((c) => c.group !== 'term').map((c) => c.id),

  questions: ALL_QUESTIONS,
  // 지금 들어 있는 문항은 전부 AI 가 작성한 빈틈 문제라 검증되지 않았다. ADsP 처럼
  // 과목 카드에 '미검증' 배지를, 홈에 안내 배너를 띄운다. (questions.js 의
  // IS_SAMPLE_DATA 는 비어 있는 그 파일에 대한 표시라서 여기서는 쓰지 않는다)
  isSample: true,
  sampleBadge: '미검증',
  sampleLabel: '검증되지 않은 AI 작성 문제',

  chapterLabel: '범위',
  sampleNote:
    '기출이 아니라 최근 실기의 출제 주제를 보고 AI 가 새로 작성한 문제라, 내용이 틀릴 수 있습니다. 서브넷·권한·스택·큐·트리 순회처럼 계산으로 답이 정해지는 문항만 답을 스크립트로 다시 계산해 맞춰 봤습니다. 실제 공부는 검증된 자료와 함께 하세요.',

  // 문항을 어디서 만들었는지 화면에서 지우지 않는다.
  sourceLabel: '빈틈 문항 AI 작성 · 미검증 (계산 문항의 답만 스크립트로 다시 계산)',
  scoreNote: '실기 합격 기준은 60점입니다.',
}
