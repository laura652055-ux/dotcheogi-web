/**
 * 정보처리기사 실기 — 빈틈 문제 (chapter 14).
 *
 * 최근(2023~2026) 실기에 나온 주제 가운데 공부할 때 빠뜨리기 쉬운 것을 골라
 * 메우는 문항이다.
 *
 *   · 서브넷·CIDR 계산 — 2026년 1회 1문제, 2회 2문제.
 *   · 해시 함수 — 2026년 2회.
 *   · DB 설계 단계 — 2026년 1회.
 *   · SQL 제약조건(CHECK) — 2026년 2회. 무결성 규칙을 같이 묶었다.
 *   · 리눅스 링크·권한 — 심볼릭 링크 2026년 1회, chmod 2023년 3회.
 *   · 자료구조(스택·큐·트리 순회) — 2024년부터 코드 문제의 배경으로 나온다.
 *
 * **기출 원문이 아니라 AI 가 출제 주제를 보고 새로 작성한 문항**이라 source 에
 * 그렇게 적었다. 계산·변환 문항(서브넷, 권한, 스택·큐, 트리 순회)의 답은 손으로
 * 적은 뒤 스크립트로 다시 계산해 맞춰 봤다. 그 밖의 문항은 따로 검수하지 않았다.
 *
 * 학습 모드는 파일 순서대로 나오므로, 서브넷은 기초 → 계산 → 분할 순으로
 * 앞 문제가 뒤 문제의 발판이 되게 배치했다.
 */

// 트리 순회 세 문항이 같은 그림을 쓴다
const TREE = `        A
      /   \\
     B     C
    / \\     \\
   D   E     F`

export const GAP_QUESTIONS = [
  // ───────────── 서브넷 · 기초 ─────────────
  {
    id: 'ch14-001',
    chapter: 14,
    topic: '서브넷 기초',
    type: 'short',
    difficulty: 1,
    question:
      'IPv4 주소는 8비트씩 4칸(옥텟)으로 나뉘어 192.168.1.10 처럼 쓴다. IPv4 주소 전체는 몇 비트인가?',
    answer: ['32', '32비트', '32bit'],
    explanation:
      '8비트 × 4칸 = 32비트.\n한 칸은 8비트라 0~255 까지만 쓸 수 있다.\n서브넷 계산은 전부 "32비트 중 앞 몇 비트가 네트워크냐"의 문제다.',
    source: 'AI 작성 · 2026년 1·2회 출제 주제',
  },
  {
    id: 'ch14-002',
    chapter: 14,
    topic: '서브넷 기초',
    type: 'short',
    difficulty: 1,
    question:
      'IP 주소를 A·B·C 클래스로 나누지 않고, 주소 뒤에 "/네트워크 비트 수"를 붙여(예: 192.168.1.0/24) 네트워크를 필요한 크기로 나누는 주소 할당 방식은 무엇인가?',
    answer: ['CIDR', 'Classless Inter-Domain Routing', '사이더'],
    explanation:
      '/24 는 "앞 24비트가 네트워크 부분"이라는 뜻이다.\n남은 32 - 24 = 8비트가 호스트(PC) 부분이다.\nClassless = 클래스 없이.',
    source: 'AI 작성 · 2026년 1·2회 출제 주제',
  },
  {
    id: 'ch14-003',
    chapter: 14,
    topic: '서브넷 기초',
    type: 'short',
    difficulty: 1,
    strict: true,
    question: 'CIDR 표기 /24 를 10진수 서브넷 마스크로 쓰시오.',
    answer: ['255.255.255.0'],
    explanation:
      '/24 = 앞에서부터 1 이 24개.\n11111111.11111111.11111111.00000000\n1 이 8개 꽉 찬 칸은 255, 전부 0 인 칸은 0 이다.',
    source: 'AI 작성 · 2026년 1·2회 출제 주제',
  },
  {
    id: 'ch14-004',
    chapter: 14,
    topic: '서브넷 기초',
    type: 'blank',
    difficulty: 1,
    strict: true,
    question:
      '클래스 방식에서 각 클래스의 기본 서브넷 마스크를 쓰시오.\n(1) A 클래스  (2) B 클래스  (3) C 클래스',
    answer: [['255.0.0.0'], ['255.255.0.0'], ['255.255.255.0']],
    explanation:
      'A = /8, B = /16, C = /24.\n첫 칸 숫자로 클래스를 가른다.\n· A: 1~126 (127 은 루프백 예약)\n· B: 128~191\n· C: 192~223',
    source: 'AI 작성 · 2026년 1·2회 출제 주제',
  },
  {
    id: 'ch14-005',
    chapter: 14,
    topic: '서브넷 기초',
    type: 'short',
    difficulty: 2,
    strict: true,
    question: '서브넷 마스크 255.255.255.192 를 CIDR 표기(/숫자)로 쓰시오.',
    answer: ['/26', '26'],
    explanation:
      '마지막 칸 192 = 11000000 → 1 이 2개.\n앞 세 칸 24 + 2 = 26.\n\n마지막 칸 숫자표 (외워 두면 계산이 끝난다)\n128=1개 · 192=2개 · 224=3개 · 240=4개\n248=5개 · 252=6개 · 254=7개 · 255=8개',
    source: 'AI 작성 · 2026년 1·2회 출제 주제',
  },
  {
    id: 'ch14-006',
    chapter: 14,
    topic: '서브넷 기초',
    type: 'short',
    difficulty: 2,
    strict: true,
    question: 'CIDR 표기 /28 을 10진수 서브넷 마스크로 쓰시오.',
    answer: ['255.255.255.240'],
    explanation:
      '28 - 24 = 4 → 마지막 칸에 1 이 4개.\n11110000 = 128 + 64 + 32 + 16 = 240.',
    source: 'AI 작성 · 2026년 1·2회 출제 주제',
  },
  {
    id: 'ch14-007',
    chapter: 14,
    topic: '서브넷 기초',
    type: 'short',
    difficulty: 1,
    question:
      '서브넷에서 호스트 부분 비트가 모두 1 인 주소로, 그 네트워크 전체에 한꺼번에 보내는 용도로 예약되어 있어 PC 에 할당할 수 없는 주소는 무엇인가?',
    answer: ['브로드캐스트 주소', '브로드캐스트', 'Broadcast Address', 'Broadcast'],
    explanation:
      '호스트 비트가 전부 0 → 네트워크 주소 (그 네트워크의 이름표)\n호스트 비트가 전부 1 → 브로드캐스트 주소 (전체 방송용)\n이 둘은 PC 에 줄 수 없어서, 호스트 수를 셀 때 항상 2 를 뺀다.',
    source: 'AI 작성 · 2026년 1·2회 출제 주제',
  },
  {
    id: 'ch14-008',
    chapter: 14,
    topic: '서브넷 기초',
    type: 'short',
    difficulty: 2,
    question: '/27 네트워크 하나에서 PC(호스트)에 할당할 수 있는 IP 주소는 몇 개인가?',
    answer: ['30', '30개'],
    explanation:
      '호스트 비트 = 32 - 27 = 5\n주소 개수 = 2⁵ = 32\n네트워크 주소·브로드캐스트 주소 2개를 빼면 32 - 2 = 30.',
    source: 'AI 작성 · 2026년 1·2회 출제 주제',
  },

  // ───────────── 서브넷 · 계산 ─────────────
  {
    id: 'ch14-009',
    chapter: 14,
    topic: '서브넷 계산',
    type: 'short',
    difficulty: 2,
    strict: true,
    question: 'IP 주소 192.168.10.100/26 이 속한 네트워크의 네트워크 주소를 쓰시오.',
    answer: ['192.168.10.64'],
    explanation:
      '① /26 → 마지막 칸 마스크 192\n② 블록 크기 = 256 - 192 = 64\n③ 마지막 칸이 0, 64, 128, 192 에서 끊긴다\n④ 100 은 64~127 구간 → 네트워크 주소 192.168.10.64',
    source: 'AI 작성 · 2026년 1·2회 출제 주제',
  },
  {
    id: 'ch14-010',
    chapter: 14,
    topic: '서브넷 계산',
    type: 'short',
    difficulty: 2,
    strict: true,
    question: 'IP 주소 192.168.10.100/26 이 속한 네트워크의 브로드캐스트 주소를 쓰시오.',
    answer: ['192.168.10.127'],
    explanation:
      '블록 크기 64 → 100 은 64~127 구간.\n구간의 마지막 주소가 브로드캐스트 → 192.168.10.127\n(다음 구간 시작 128 에서 1 을 빼도 된다)',
    source: 'AI 작성 · 2026년 1·2회 출제 주제',
  },
  {
    id: 'ch14-011',
    chapter: 14,
    topic: '서브넷 계산',
    type: 'blank',
    difficulty: 3,
    strict: true,
    question:
      'IP 주소 200.1.1.77/27 에 대해 다음을 쓰시오.\n(1) 네트워크 주소  (2) 브로드캐스트 주소  (3) 첫 번째 호스트 주소  (4) 마지막 호스트 주소',
    answer: [['200.1.1.64'], ['200.1.1.95'], ['200.1.1.65'], ['200.1.1.94']],
    explanation:
      '① /27 → 마지막 칸 마스크 224 → 블록 크기 256 - 224 = 32\n② 0, 32, 64, 96 … 에서 끊긴다 → 77 은 64~95 구간\n③ 네트워크 .64 / 브로드캐스트 .95\n④ 호스트는 그 사이: 첫 번째 .65, 마지막 .94',
    source: 'AI 작성 · 2026년 1·2회 출제 주제',
  },
  {
    id: 'ch14-012',
    chapter: 14,
    topic: '서브넷 계산',
    type: 'choice',
    difficulty: 2,
    question: '다음 중 192.168.5.130/25 와 같은 네트워크에 속한 IP 주소는?',
    choices: ['192.168.5.100', '192.168.5.127', '192.168.5.200', '192.168.6.130'],
    answer: [2],
    explanation:
      '/25 → 마스크 128 → 블록 크기 128 → 0~127, 128~255 두 구간.\n130 은 128~255 구간이라 .200 만 같은 네트워크다.\n192.168.6.130 은 세 번째 칸이 달라서 아예 다른 네트워크.',
    source: 'AI 작성 · 2026년 1·2회 출제 주제',
  },
  {
    id: 'ch14-013',
    chapter: 14,
    topic: '서브넷 계산',
    type: 'short',
    difficulty: 2,
    strict: true,
    question: '호스트 14대를 연결할 수 있는 가장 작은 서브넷의 CIDR 프리픽스(/숫자)를 쓰시오.',
    answer: ['/28', '28'],
    explanation:
      '2ⁿ - 2 ≥ 14 가 되는 가장 작은 n 을 찾는다.\nn = 3 → 8 - 2 = 6 (부족)\nn = 4 → 16 - 2 = 14 (딱 맞음)\n호스트 비트 4 → 32 - 4 = 28 → /28',
    source: 'AI 작성 · 2026년 1·2회 출제 주제',
  },
  {
    id: 'ch14-014',
    chapter: 14,
    topic: '서브넷 계산',
    type: 'short',
    difficulty: 2,
    strict: true,
    question:
      '한 서브넷에 호스트 50대를 연결해야 한다. 주소 낭비가 가장 적은 서브넷 마스크를 10진수로 쓰시오.',
    answer: ['255.255.255.192'],
    explanation:
      'n = 5 → 32 - 2 = 30 (부족)\nn = 6 → 64 - 2 = 62 (충분)\n호스트 비트 6 → /26 → 마지막 칸 1 이 2개 → 192',
    source: 'AI 작성 · 2026년 1·2회 출제 주제',
  },

  // ───────────── 서브넷 · 분할 ─────────────
  {
    id: 'ch14-015',
    chapter: 14,
    topic: '서브넷 분할',
    type: 'short',
    difficulty: 2,
    question: '192.168.1.0/24 네트워크를 /26 으로 나누면 서브넷은 몇 개가 되는가?',
    answer: ['4', '4개'],
    explanation:
      '빌려 온 비트 = 26 - 24 = 2 → 2² = 4개.\n각 서브넷은 64개씩: .0 / .64 / .128 / .192 에서 시작한다.',
    source: 'AI 작성 · 2026년 1·2회 출제 주제',
  },
  {
    id: 'ch14-016',
    chapter: 14,
    topic: '서브넷 분할',
    type: 'short',
    difficulty: 3,
    strict: true,
    question:
      '192.168.1.0/24 네트워크를 FLSM 방식으로 5개의 서브넷으로 나누려 한다. 필요한 서브넷 마스크를 10진수로 쓰시오.',
    answer: ['255.255.255.224'],
    explanation:
      '서브넷 개수는 2ⁿ 으로 늘어난다.\nn = 2 → 4개 (5개에 부족)\nn = 3 → 8개 (충분)\n24 + 3 = 27 → 마지막 칸 1 이 3개 → 224',
    source: 'AI 작성 · 2026년 1·2회 출제 주제',
  },
  {
    id: 'ch14-018',
    chapter: 14,
    topic: '서브넷 분할',
    type: 'short',
    difficulty: 2,
    question:
      '하나의 네트워크를 서로 다른 길이의 서브넷 마스크로 나누어, 서브넷마다 필요한 호스트 수에 맞게 주소를 배분하는 방식은 무엇인가?',
    answer: ['VLSM', 'Variable Length Subnet Mask', '가변 길이 서브넷 마스크'],
    explanation:
      'VLSM = 가변 길이 (서브넷마다 크기가 다름)\nFLSM = 고정 길이 (모든 서브넷이 같은 크기)\nV = Variable(가변), F = Fixed(고정).',
    source: 'AI 작성 · 2026년 1·2회 출제 주제',
  },

  // ───────────── 해시 함수 ─────────────
  {
    id: 'ch14-019',
    chapter: 14,
    topic: '해시 함수',
    type: 'short',
    difficulty: 1,
    question:
      '임의 길이의 입력 데이터를 고정된 길이의 값으로 바꾸는 일방향 함수로, 출력값으로 원래 입력을 되돌릴 수 없어 데이터 무결성 검증이나 비밀번호 저장에 쓰이는 것은?',
    answer: ['해시 함수', '해시', 'Hash Function', 'Hash'],
    explanation:
      '키워드: 고정 길이 · 일방향(복호화 불가) · 무결성\n암호화(대칭키·공개키)는 다시 풀 수 있지만 해시는 되돌릴 수 없다는 게 차이다.',
    source: 'AI 작성 · 2026년 2회 출제 주제',
  },
  {
    id: 'ch14-020',
    chapter: 14,
    topic: '해시 함수',
    type: 'short',
    difficulty: 2,
    question: '해시 함수에서 서로 다른 두 입력이 같은 해시값을 내는 현상을 무엇이라 하는가?',
    answer: ['충돌', '해시 충돌', 'Collision', 'Hash Collision'],
    explanation:
      '충돌을 일부러 만들기 어려운 성질을 충돌 저항성이라 한다.\nMD5 는 충돌을 만드는 방법이 발견되어 보안 용도로는 퇴출됐다.',
    source: 'AI 작성 · 2026년 2회 출제 주제',
  },
  {
    id: 'ch14-021',
    chapter: 14,
    topic: '해시 함수',
    type: 'short',
    difficulty: 2,
    question:
      '로널드 라이베스트(Rivest)가 MD4 를 개선해 만든 128비트 해시 알고리즘으로, 충돌 공격이 발견되어 현재 보안 용도로는 권장되지 않는 것은?',
    answer: ['MD5', 'Message Digest 5', 'Message-Digest algorithm 5'],
    explanation: 'MD = Message Digest. MD4 → MD5, 출력 128비트.',
    source: 'AI 작성 · 2026년 2회 출제 주제',
  },
  {
    id: 'ch14-022',
    chapter: 14,
    topic: '해시 함수',
    type: 'short',
    difficulty: 2,
    question:
      '미국 국가안보국(NSA)이 설계하고 미국 국립표준기술연구소(NIST)가 표준으로 발표한 해시 알고리즘 계열로, 뒤에 -1, -256 처럼 버전이나 출력 길이를 붙여 부르는 것은?',
    answer: ['SHA', 'Secure Hash Algorithm', 'SHA-1', 'SHA-2', 'SHA-256'],
    explanation:
      'SHA-1 은 160비트, SHA-256 은 256비트 출력.\nSHA-1 도 충돌이 발견되어 지금은 SHA-256 같은 SHA-2 계열을 쓴다.',
    source: 'AI 작성 · 2026년 2회 출제 주제',
  },
  {
    id: 'ch14-023',
    chapter: 14,
    topic: '해시 함수',
    type: 'short',
    difficulty: 2,
    question:
      '비밀번호를 해시할 때 사용자마다 다른 무작위 값을 덧붙여, 같은 비밀번호라도 서로 다른 해시값이 나오게 하는 값은 무엇인가?',
    answer: ['솔트', 'Salt', '소금'],
    explanation:
      '같은 비밀번호 → 같은 해시값이면 미리 만든 표(레인보우 테이블)로 역추적당한다.\n솔트를 섞으면 그 표가 쓸모없어진다.',
    source: 'AI 작성 · 2026년 2회 출제 주제',
  },
  {
    id: 'ch14-024',
    chapter: 14,
    topic: '해시 함수',
    type: 'short',
    difficulty: 2,
    question:
      '흔한 비밀번호들의 해시값을 미리 계산해 표로 만들어 두고, 탈취한 해시값을 표에서 찾아 원래 비밀번호를 알아내는 공격에 쓰이는 표는?',
    answer: ['레인보우 테이블', 'Rainbow Table'],
    explanation: '방어책: 솔트(Salt) 덧붙이기, 키 스트레칭.',
    source: 'AI 작성 · 2026년 2회 출제 주제',
  },
  {
    id: 'ch14-025',
    chapter: 14,
    topic: '해시 함수',
    type: 'short',
    difficulty: 3,
    question:
      '해시 함수를 수천 번 이상 반복 적용해 해시값 하나를 계산하는 데 드는 시간을 일부러 늘려, 무차별 대입 공격을 어렵게 만드는 기법은?',
    answer: ['키 스트레칭', 'Key Stretching'],
    explanation: 'Stretch = 늘이다. 계산 시간을 늘여서 공격자가 초당 시도할 수 있는 횟수를 줄인다.',
    source: 'AI 작성 · 2026년 2회 출제 주제',
  },

  // ───────────── DB 설계 단계 ─────────────
  {
    id: 'ch14-026',
    chapter: 14,
    topic: 'DB 설계 단계',
    type: 'blank',
    difficulty: 2,
    question:
      '데이터베이스 설계 순서의 빈칸을 채우시오.\n요구 조건 분석 → ( 1 ) → ( 2 ) → ( 3 ) → 구현',
    answer: [
      ['개념적 설계', '개념 설계', '개념적 데이터베이스 설계'],
      ['논리적 설계', '논리 설계', '논리적 데이터베이스 설계'],
      ['물리적 설계', '물리 설계', '물리적 데이터베이스 설계'],
    ],
    explanation:
      '개념 → 논리 → 물리. 추상적인 것에서 구체적인 것으로 내려간다.\n· 개념: 무엇을 저장할지 (E-R 다이어그램)\n· 논리: 어떤 표로 만들지 (테이블, 정규화)\n· 물리: 디스크에 어떻게 저장할지 (인덱스, 저장 형식)',
    source: 'AI 작성 · 2026년 1회 출제 주제',
  },
  {
    id: 'ch14-027',
    chapter: 14,
    topic: 'DB 설계 단계',
    type: 'short',
    difficulty: 2,
    question:
      'DB 설계 단계 중, 특정 DBMS 에 독립적으로 요구 조건 분석 결과를 E-R 다이어그램 같은 개념 스키마로 표현하는 단계는?',
    answer: ['개념적 설계', '개념 설계', '개념적 데이터베이스 설계'],
    explanation: '키워드: DBMS 독립 · E-R 다이어그램 · 개념 스키마',
    source: 'AI 작성 · 2026년 1회 출제 주제',
  },
  {
    id: 'ch14-028',
    chapter: 14,
    topic: 'DB 설계 단계',
    type: 'short',
    difficulty: 2,
    question:
      'DB 설계 단계 중, 목표 DBMS 의 데이터 모델(관계형 등)에 맞게 개념 스키마를 테이블 구조로 변환하고 정규화를 수행하는 단계는?',
    answer: ['논리적 설계', '논리 설계', '논리적 데이터베이스 설계'],
    explanation: '키워드: 목표 DBMS 에 맞춤 · 테이블로 변환 · 정규화 · 논리 스키마',
    source: 'AI 작성 · 2026년 1회 출제 주제',
  },
  {
    id: 'ch14-029',
    chapter: 14,
    topic: 'DB 설계 단계',
    type: 'short',
    difficulty: 2,
    question:
      'DB 설계 단계 중, 레코드 저장 형식·인덱스·접근 경로 등 데이터가 실제 저장 장치에 어떻게 저장될지를 설계하는 단계는?',
    answer: ['물리적 설계', '물리 설계', '물리적 데이터베이스 설계'],
    explanation: '키워드: 저장 장치 · 인덱스 · 접근 경로 · 레코드 형식',
    source: 'AI 작성 · 2026년 1회 출제 주제',
  },

  // ───────────── SQL 제약조건 · 무결성 ─────────────
  {
    id: 'ch14-030',
    chapter: 14,
    topic: 'SQL 제약조건',
    type: 'short',
    difficulty: 1,
    question:
      '테이블을 만들 때 컬럼에 들어갈 값의 조건(예: 나이는 0 이상)을 지정해, 조건을 만족하지 않는 값이 들어오지 못하게 막는 제약조건은?',
    answer: ['CHECK'],
    explanation: '예) 나이 INT CHECK (나이 >= 0)\nCheck = 검사하다. 넣기 전에 조건을 검사한다.',
    source: 'AI 작성 · 2026년 2회 출제 주제',
  },
  {
    id: 'ch14-031',
    chapter: 14,
    topic: 'SQL 제약조건',
    type: 'blank',
    difficulty: 2,
    question:
      '다음 SQL 의 빈칸을 조건에 맞게 채우시오.\n(1) 이름은 반드시 입력해야 한다.\n(2) 이메일은 다른 학생과 겹칠 수 없다. (비워 두는 것은 허용)\n(3) 나이는 0 이상이어야 한다.',
    code: {
      lang: 'sql',
      body: `CREATE TABLE 학생 (
    학번     CHAR(8)      PRIMARY KEY,
    이름     VARCHAR(20)  ( 1 ),
    이메일   VARCHAR(50)  ( 2 ),
    나이     INT          ( 3 ) (나이 >= 0),
    학과코드 CHAR(4)      REFERENCES 학과(학과코드)
);`,
    },
    answer: [['NOT NULL'], ['UNIQUE'], ['CHECK']],
    explanation:
      '· NOT NULL: 비워 둘 수 없음\n· UNIQUE: 중복 불가 (NULL 은 허용)\n· CHECK: 조건 검사\n· PRIMARY KEY: UNIQUE + NOT NULL\n· REFERENCES: 외래 키 (다른 테이블의 기본 키를 참조)',
    source: 'AI 작성 · 2026년 2회 출제 주제',
  },
  {
    id: 'ch14-032',
    chapter: 14,
    topic: 'SQL 제약조건',
    type: 'short',
    difficulty: 2,
    question:
      '중복 값을 허용하지 않는 UNIQUE 와 빈 값을 허용하지 않는 NOT NULL 의 성질을 모두 가지며, 테이블당 하나만 지정할 수 있는 제약조건은?',
    answer: ['PRIMARY KEY', '기본 키', '기본키', 'PK'],
    explanation: 'PRIMARY KEY = UNIQUE + NOT NULL.\n튜플 하나하나를 구별하는 기준이다.',
    source: 'AI 작성 · 2026년 2회 출제 주제',
  },
  {
    id: 'ch14-033',
    chapter: 14,
    topic: 'SQL 제약조건',
    type: 'short',
    difficulty: 2,
    question:
      '외래 키 제약조건에 붙이는 옵션으로, 참조되는 부모 테이블의 행이 삭제되면 그 행을 참조하던 자식 테이블의 행도 함께 삭제되게 하는 것은? (ON DELETE ____)',
    answer: ['CASCADE', 'ON DELETE CASCADE'],
    explanation:
      'Cascade = 폭포처럼 연쇄적으로.\nDROP TABLE … CASCADE 의 CASCADE 와 같은 말이지만, 여기서는 행 삭제가 자식 행으로 번지는 경우다.',
    source: 'AI 작성 · 2023년 2회 출제 주제',
  },
  {
    id: 'ch14-034',
    chapter: 14,
    topic: '무결성',
    type: 'short',
    difficulty: 2,
    question: '기본 키를 구성하는 속성은 NULL 값이나 중복 값을 가질 수 없다는 무결성 규칙은?',
    answer: ['개체 무결성', 'Entity Integrity'],
    explanation: '기본 키 → 개체 무결성\n외래 키 → 참조 무결성\n속성 값의 범위 → 도메인 무결성',
    source: 'AI 작성 · SQL 제약조건 연관',
  },
  {
    id: 'ch14-035',
    chapter: 14,
    topic: '무결성',
    type: 'short',
    difficulty: 2,
    question:
      '외래 키 값은 NULL 이거나, 참조하는 테이블의 기본 키 값 중 하나여야 한다는 무결성 규칙은?',
    answer: ['참조 무결성', 'Referential Integrity'],
    explanation: '없는 학과코드를 가진 학생이 생기면 안 된다는 규칙이다.\nSQL 에서는 REFERENCES(외래 키)로 지킨다.',
    source: 'AI 작성 · SQL 제약조건 연관',
  },
  {
    id: 'ch14-036',
    chapter: 14,
    topic: '무결성',
    type: 'short',
    difficulty: 2,
    question:
      '각 속성의 값은 그 속성에 정의된 도메인(데이터 타입, 허용 범위 등)에 속한 값이어야 한다는 무결성 규칙은?',
    answer: ['도메인 무결성', 'Domain Integrity'],
    explanation: 'SQL 에서는 데이터 타입과 CHECK 제약조건으로 지킨다.',
    source: 'AI 작성 · SQL 제약조건 연관',
  },

  // ───────────── 리눅스 · 링크 ─────────────
  {
    id: 'ch14-037',
    chapter: 14,
    topic: '리눅스 링크',
    type: 'short',
    difficulty: 2,
    question:
      '원본 파일의 경로를 가리키는 바로가기 같은 링크로, 원본 파일을 지우면 링크가 끊어져 쓸 수 없게 되는 것은?',
    answer: ['심볼릭 링크', 'Symbolic Link', '소프트 링크', 'Soft Link', 'Symlink'],
    explanation:
      '심볼릭 링크 = 경로를 가리키는 바로가기 (원본 삭제 → 끊어짐)\n하드 링크 = 같은 데이터(inode)를 가리키는 또 하나의 이름 (원본 이름 삭제 → 그대로 살아 있음)',
    source: 'AI 작성 · 2026년 1회 출제 주제',
  },
  {
    id: 'ch14-038',
    chapter: 14,
    topic: '리눅스 링크',
    type: 'short',
    difficulty: 2,
    question:
      '원본 파일과 같은 inode 를 가리키는 링크로, 원본 파일 이름을 지워도 이 링크를 통해 데이터에 계속 접근할 수 있는 것은?',
    answer: ['하드 링크', 'Hard Link'],
    explanation: '데이터는 그 inode 를 가리키는 이름이 하나도 안 남아야 비로소 지워진다.',
    source: 'AI 작성 · 2026년 1회 출제 주제',
  },
  {
    id: 'ch14-039',
    chapter: 14,
    topic: '리눅스 링크',
    type: 'short',
    difficulty: 3,
    question:
      '리눅스에서 파일 이름을 제외한 파일의 소유자, 권한, 크기, 데이터 블록 위치 등의 정보를 저장하는 자료 구조는?',
    answer: ['inode', '아이노드', 'i-node', 'index node', '인덱스 노드'],
    explanation: '파일 이름은 디렉터리에, 나머지 정보는 inode 에 있다.\n하드 링크는 같은 inode 에 이름을 하나 더 붙이는 것이다.',
    source: 'AI 작성 · 2026년 1회 출제 주제',
  },
  {
    id: 'ch14-040',
    chapter: 14,
    topic: '리눅스 링크',
    type: 'short',
    difficulty: 2,
    question: '리눅스에서 원본 파일 a.txt 를 가리키는 심볼릭 링크 b.txt 를 만드는 명령어를 쓰시오.',
    answer: ['ln -s a.txt b.txt'],
    explanation: 'ln -s 원본 링크이름\n-s(symbolic)를 빼고 ln a.txt b.txt 로 쓰면 하드 링크가 된다.',
    source: 'AI 작성 · 2026년 1회 출제 주제',
  },
  {
    id: 'ch14-041',
    chapter: 14,
    topic: '리눅스 링크',
    type: 'short',
    difficulty: 2,
    question: 'ls -l 결과가 다음과 같을 때, 맨 앞 글자 l 이 뜻하는 파일 종류는?',
    code: {
      lang: 'shell',
      body: 'lrwxrwxrwx 1 user user 5 Oct  1 10:00 b.txt -> a.txt',
    },
    answer: ['심볼릭 링크', 'Symbolic Link', '소프트 링크', 'Soft Link', 'Symlink'],
    explanation:
      '맨 앞 한 글자가 파일 종류다.\n- 일반 파일 / d 디렉터리 / l 심볼릭 링크\n뒤의 -> a.txt 가 가리키는 원본이다.',
    source: 'AI 작성 · 2026년 1회 출제 주제',
  },

  // ───────────── 리눅스 · 권한 ─────────────
  {
    id: 'ch14-043',
    chapter: 14,
    topic: '리눅스 권한',
    type: 'short',
    difficulty: 2,
    question: '파일 권한이 rw-r--r-- 일 때 이를 8진수 숫자 3자리로 쓰시오.',
    answer: ['644'],
    explanation: 'rw- = 4+2 = 6 (소유자)\nr-- = 4 (그룹)\nr-- = 4 (기타)',
    source: 'AI 작성 · 2023년 3회 출제 주제',
  },

  // ───────────── 자료구조 ─────────────
  {
    id: 'ch14-045',
    chapter: 14,
    topic: '스택·큐',
    type: 'short',
    difficulty: 1,
    question: '가장 나중에 들어간 데이터가 가장 먼저 나오는(LIFO) 자료구조는?',
    answer: ['스택', 'Stack'],
    explanation: 'LIFO = Last In First Out. 접시 쌓기.\n넣기 PUSH, 꺼내기 POP.',
    source: 'AI 작성 · 2024~2026년 코드 문제 배경',
  },
  {
    id: 'ch14-046',
    chapter: 14,
    topic: '스택·큐',
    type: 'short',
    difficulty: 1,
    question: '가장 먼저 들어간 데이터가 가장 먼저 나오는(FIFO) 자료구조는?',
    answer: ['큐', 'Queue'],
    explanation: 'FIFO = First In First Out. 줄 서기.\n넣는 쪽 rear, 꺼내는 쪽 front.',
    source: 'AI 작성 · 2024~2026년 코드 문제 배경',
  },
  {
    id: 'ch14-047',
    chapter: 14,
    topic: '스택·큐',
    type: 'short',
    difficulty: 2,
    question:
      '빈 스택에 다음 연산을 차례로 수행했다. POP 으로 꺼낸 값을 꺼낸 순서대로 쓰시오.\nPUSH 1 → PUSH 2 → PUSH 3 → POP → PUSH 4 → POP → POP',
    answer: ['3 4 2'],
    explanation:
      '[1] → [1,2] → [1,2,3]\nPOP → 3 꺼냄, [1,2]\nPUSH 4 → [1,2,4]\nPOP → 4 꺼냄, [1,2]\nPOP → 2 꺼냄, [1]',
    source: 'AI 작성 · 2024~2026년 코드 문제 배경',
  },
  {
    id: 'ch14-048',
    chapter: 14,
    topic: '스택·큐',
    type: 'short',
    difficulty: 2,
    question:
      '빈 큐에 다음 연산을 차례로 수행했다. 연산이 모두 끝난 뒤 큐에 남아 있는 값을 앞(front)부터 순서대로 쓰시오.\nENQUEUE A → ENQUEUE B → ENQUEUE C → DEQUEUE → ENQUEUE D → DEQUEUE',
    answer: ['C D'],
    explanation:
      '[A] → [A,B] → [A,B,C]\nDEQUEUE → A 나감, [B,C]\nENQUEUE D → [B,C,D]\nDEQUEUE → B 나감, [C,D]',
    source: 'AI 작성 · 2024~2026년 코드 문제 배경',
  },
  {
    id: 'ch14-049',
    chapter: 14,
    topic: '스택·큐',
    type: 'short',
    difficulty: 2,
    question:
      '선형 큐는 앞쪽이 비어도 rear 가 배열 끝에 닿으면 더 넣을 수 없다. 이 문제를 해결하려고 배열의 끝과 처음을 이어 붙여 빈 공간을 다시 쓰는 큐는?',
    answer: ['원형 큐', 'Circular Queue', '환형 큐'],
    explanation:
      '인덱스를 (rear + 1) % 크기 로 계산해서 끝 다음을 0 으로 돌린다.\n코드 문제에서 % 연산이 보이면 원형 큐를 의심하자.',
    source: 'AI 작성 · 2025년 2회 출제 주제',
  },
  {
    id: 'ch14-050',
    chapter: 14,
    topic: '트리 순회',
    type: 'short',
    difficulty: 2,
    question: '다음 이진 트리를 전위 순회(Preorder)한 결과를 쓰시오.',
    code: { lang: 'tree', body: TREE },
    answer: ['A B D E C F'],
    explanation:
      '전위 = 루트 → 왼쪽 → 오른쪽 (루트가 맨 앞)\nA → (B → D → E) → (C → F)',
    source: 'AI 작성 · 2026년 2회 출제 주제',
  },
  {
    id: 'ch14-051',
    chapter: 14,
    topic: '트리 순회',
    type: 'short',
    difficulty: 2,
    question: '다음 이진 트리를 중위 순회(Inorder)한 결과를 쓰시오.',
    code: { lang: 'tree', body: TREE },
    answer: ['D B E A C F'],
    explanation:
      '중위 = 왼쪽 → 루트 → 오른쪽 (루트가 가운데)\n(D → B → E) → A → (C → F)\nC 는 왼쪽 자식이 없어서 C 다음 바로 F.',
    source: 'AI 작성 · 2026년 2회 출제 주제',
  },
  {
    id: 'ch14-052',
    chapter: 14,
    topic: '트리 순회',
    type: 'short',
    difficulty: 2,
    question: '다음 이진 트리를 후위 순회(Postorder)한 결과를 쓰시오.',
    code: { lang: 'tree', body: TREE },
    answer: ['D E B F C A'],
    explanation:
      '후위 = 왼쪽 → 오른쪽 → 루트 (루트가 맨 뒤)\n(D → E → B) → (F → C) → A\n루트 A 는 항상 마지막이다.',
    source: 'AI 작성 · 2026년 2회 출제 주제',
  },
]
