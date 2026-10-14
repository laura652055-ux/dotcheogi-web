/**
 * 과목과 무관한 공통 정의. 문제 유형과 학습 모드는 엔진이 처리하므로
 * 과목이 늘어나도 여기는 그대로 쓴다.
 */

/** 문제 유형. 채점 방식이 유형마다 다르다. (src/lib/grade.js) */
export const QUESTION_TYPES = {
  short:  { label: '단답형',   desc: '용어/약어를 직접 입력' },
  blank:  { label: '빈칸',     desc: '문장의 빈칸을 순서대로 채움' },
  choice: { label: '객관식',   desc: '보기에서 선택' },
  code:   { label: '코드해석', desc: '실행 결과를 입력' },
  essay:  { label: '약술형',   desc: '서술 후 모범답안과 대조해 자가채점' },
}

/** 학습 모드 */
export const MODES = {
  study:  { label: '학습',    desc: '한 문제씩 풀고 바로 해설 확인' },
  exam:   { label: '모의고사', desc: '실전 문항 수로 풀고 마지막에 채점' },
  wrong:  { label: '오답',    desc: '틀렸던 문제만 다시' },
  recall: { label: '암기',    desc: '용어 카드를 뒤집으며 훑기' },
}
