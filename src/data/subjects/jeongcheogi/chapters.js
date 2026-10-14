/**
 * 정보처리기사 실기 출제기준(NCS) 12개 능력단위.
 *
 * `writtenSubject`는 필기 5과목 중 어디서 넘어온 범위인지 표시용.
 * (필기 자료를 실기 문제로 옮길 때 매핑 기준으로 쓴다)
 *
 * 실기는 과목별 과락이 없으므로 `part`를 두지 않는다. (meta.js 참고)
 * 대신 범위 성격이 둘로 갈려서 `group` 으로 묶어 보여준다. (meta.js 의 chapterGroups)
 */
const UNITS = [
  { id: 1,  code: 'REQ',  name: '요구사항 확인',              writtenSubject: '소프트웨어 설계' },
  { id: 2,  code: 'IO',   name: '데이터 입출력 구현',          writtenSubject: '데이터베이스 구축' },
  { id: 3,  code: 'INT',  name: '통합 구현',                  writtenSubject: '소프트웨어 개발' },
  { id: 4,  code: 'SRV',  name: '서버 프로그램 구현',          writtenSubject: '소프트웨어 개발' },
  { id: 5,  code: 'IFC',  name: '인터페이스 구현',            writtenSubject: '소프트웨어 설계' },
  { id: 6,  code: 'UI',   name: '화면 설계',                  writtenSubject: '소프트웨어 설계' },
  { id: 7,  code: 'TEST', name: '애플리케이션 테스트 관리',    writtenSubject: '소프트웨어 개발' },
  { id: 8,  code: 'SQL',  name: 'SQL 응용',                   writtenSubject: '데이터베이스 구축' },
  { id: 9,  code: 'SEC',  name: '소프트웨어 개발 보안 구축',   writtenSubject: '정보시스템 구축관리' },
  { id: 10, code: 'LANG', name: '프로그래밍 언어 활용',        writtenSubject: '프로그래밍 언어 활용' },
  { id: 11, code: 'OS',   name: '응용 SW 기초 기술 활용',      writtenSubject: '프로그래밍 언어 활용' },
  { id: 12, code: 'PKG',  name: '제품 소프트웨어 패키징',      writtenSubject: '정보시스템 구축관리' },
]

export const CHAPTERS = [
  // 13 은 NCS 능력단위가 아니다. 코드 실행 결과를 묻는 문항은 10번(프로그래밍 언어
  // 활용)에 속하지만, 용어 암기와 코드 추적은 공부하는 결이 완전히 달라서 범위를
  // 따로 고를 수 있도록 분리해 두었다.
  { id: 13, code: 'CODE', name: '코드 해석 (C·Java·Python)',   writtenSubject: '프로그래밍 언어 활용', group: 'extra' },

  // 14 도 NCS 능력단위가 아니다. 최근 실기에 나온 주제(서브넷 계산, 해시, 리눅스,
  // 자료구조 등)를 모아 둔 범위다. 문항은 ./gap-questions.js.
  { id: 14, code: 'GAP',  name: '빈틈 문제 (최신 출제 주제)', writtenSubject: '여러 과목', group: 'extra' },

  // 1~12 는 설명을 보고 용어를 쓰는 단답 문항 범위다. (./questions.js)
  // 이 공개 저장소에는 1~13 범위의 문항이 없어서, meta.js 가 이 범위들을 목록에서 뺀다.
  ...UNITS.map((u) => ({ ...u, group: 'term' })),
]
