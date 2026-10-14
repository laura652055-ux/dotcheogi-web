/**
 * ADsP 문제 데이터. 스키마는 docs/QUESTION_SCHEMA.md 와 동일하다.
 * chapter 는 ./chapters.js 의 id(1~8)이고, 과목(과락 단위)은 챕터의 part 로 정해진다.
 */

export const QUESTIONS = [
  /* ───────────── 1과목 · 데이터 이해 ───────────── */
  {
    id: 'ch01-001',
    chapter: 1,
    topic: 'DIKW 피라미드',
    type: 'short',
    difficulty: 1,
    question:
      'DIKW 피라미드에서 데이터를 가공·처리하여 데이터 간 연관관계 속에서 의미가 도출된 것을 무엇이라 하는가?',
    answer: ['정보', 'Information'],
    explanation:
      'DIKW: 데이터(Data) → 정보(Information) → 지식(Knowledge) → 지혜(Wisdom)\n· 데이터: 개별 사실, 가공 전의 순수한 수치나 기호\n· 정보: 데이터의 가공·처리로 도출된 의미\n· 지식: 정보를 구조화하여 내재화한 것\n· 지혜: 지식에 근본 원리를 더한 창의적 아이디어',
    source: 'AI 작성 · 미검증',
  },
  {
    id: 'ch01-002',
    chapter: 1,
    topic: '데이터베이스의 특성',
    type: 'choice',
    difficulty: 2,
    question: '다음 중 데이터베이스의 일반적인 특성으로 옳지 않은 것은?',
    choices: [
      '통합된 데이터 — 동일 내용의 중복을 배제한다',
      '저장된 데이터 — 컴퓨터 저장매체에 저장된다',
      '고정된 데이터 — 한 번 저장되면 변경되지 않는다',
      '공용 데이터 — 여러 사용자가 함께 이용한다',
    ],
    answer: [2],
    explanation:
      '데이터베이스는 변화되는 데이터(changeable data)다. 새로운 데이터의 삽입, 기존 데이터의 삭제·갱신으로 항상 최신의 정확한 상태를 유지한다.\n4대 특성: 통합된 데이터 · 저장된 데이터 · 공용 데이터 · 변화되는 데이터',
    source: 'AI 작성 · 미검증',
  },
  {
    id: 'ch01-003',
    chapter: 1,
    topic: '데이터웨어하우스',
    type: 'blank',
    difficulty: 2,
    question:
      '데이터웨어하우스의 4가지 특성은 ( ① ) 지향적, 통합적, ( ② ) 적, 비휘발적이다. 빈칸을 순서대로 채우시오.',
    answer: [
      ['주제', '주제지향', 'Subject'],
      ['시계열', '시계열적', 'Time-variant'],
    ],
    explanation:
      '데이터웨어하우스(DW)의 4대 특성\n· 주제지향적: 업무가 아닌 주제 중심으로 구성\n· 통합적: 여러 소스의 데이터를 일관된 형식으로 통합\n· 시계열적: 시점별 이력을 유지\n· 비휘발적: 적재 후에는 읽기 전용, 갱신되지 않음',
    source: 'AI 작성 · 미검증',
  },
  {
    id: 'ch01-004',
    chapter: 1,
    topic: '암묵지와 형식지',
    type: 'short',
    difficulty: 2,
    question:
      '개인에게 내면화된 암묵지를 문서나 매뉴얼처럼 겉으로 드러난 형식지로 표현하는 단계를 무엇이라 하는가?',
    answer: ['표출화', '표출', 'Externalization'],
    bank: ['공통화', '표출화', '연결화', '내면화'],
    explanation:
      '암묵지와 형식지의 상호작용 (SECI)\n· 공통화: 암묵지 → 암묵지. 경험을 통해 전수\n· 표출화: 암묵지 → 형식지. 문서·매뉴얼로 표현\n· 연결화: 형식지 → 형식지. 다른 형식지와 결합\n· 내면화: 형식지 → 암묵지. 학습을 통해 체득',
    source: 'AI 작성 · 미검증',
  },
  {
    id: 'ch01-005',
    chapter: 1,
    topic: 'OLTP와 OLAP',
    type: 'short',
    difficulty: 1,
    question:
      '데이터웨어하우스의 다차원 데이터를 사용자가 대화식으로 조회·분석하여 의사결정에 활용하는 기술의 약어를 쓰시오.',
    answer: ['OLAP', 'Online Analytical Processing', '온라인 분석 처리'],
    explanation:
      'OLTP는 발생한 트랜잭션을 그때그때 처리하는 운영계 시스템(주문·결제)이고, OLAP은 그 데이터를 모아 분석·조회하는 정보계 시스템이다.\nOLAP 연산: Roll-up, Drill-down, Slicing, Dicing, Pivoting',
    source: 'AI 작성 · 미검증',
  },
  {
    id: 'ch02-001',
    chapter: 2,
    topic: '빅데이터의 특징',
    type: 'short',
    difficulty: 1,
    question:
      '더그 레이니(Doug Laney)가 제시한 빅데이터의 3V 중, 데이터의 생성과 유통·처리 속도를 뜻하는 요소를 영문으로 쓰시오.',
    answer: ['Velocity', '속도'],
    explanation:
      '빅데이터 3V: Volume(규모) · Variety(다양성) · Velocity(속도)\n여기에 Value(가치) 또는 Veracity(신뢰성)를 더해 4V, 둘 다 더하면 5V로 확장한다.',
    source: 'AI 작성 · 미검증',
  },
  {
    id: 'ch02-002',
    chapter: 2,
    topic: '빅데이터의 위기 요인과 통제',
    type: 'choice',
    difficulty: 3,
    question: '빅데이터 시대의 위기 요인과 그 통제 방안이 잘못 짝지어진 것은?',
    choices: [
      '사생활 침해 — 동의제에서 책임제로 전환',
      '책임 원칙 훼손 — 결과 기반 책임 원칙 고수',
      '데이터 오용 — 알고리즘에 대한 접근권 허용',
      '데이터 과잉 — 데이터 수집량의 법적 상한 설정',
    ],
    answer: [3],
    explanation:
      '위기 요인 3가지와 통제 방안\n· 사생활 침해 → 동의에서 책임으로 (사용자에게 책임을 묻는 구조)\n· 책임 원칙 훼손(예측에 근거한 불이익) → 결과 기반 책임 원칙 고수\n· 데이터 오용 → 알고리즘 접근권 허용, 알고리즈미스트의 도움\n"데이터 과잉"은 제시된 위기 요인이 아니다.',
    source: 'AI 작성 · 미검증',
  },
  {
    id: 'ch02-003',
    chapter: 2,
    topic: '빅데이터가 만드는 변화',
    type: 'blank',
    difficulty: 2,
    question:
      '빅데이터가 만들어낸 변화 중, 데이터를 다루는 관점은 ( ① )조사에서 전수조사로, 관계 해석의 초점은 인과관계에서 ( ② )관계로 이동했다. 빈칸을 채우시오.',
    answer: [
      ['표본', '표본조사', 'Sampling'],
      ['상관', '상관관계', 'Correlation'],
    ],
    explanation:
      '빅데이터가 만들어낸 4가지 변화\n· 사전처리 → 사후처리 (일단 모으고 나중에 분석)\n· 표본조사 → 전수조사 (전체를 다룰 수 있게 됨)\n· 질 → 양 (양이 충분하면 개별 오류는 묻힌다)\n· 인과관계 → 상관관계 (왜보다 무엇이 먼저)',
    source: 'AI 작성 · 미검증',
  },
  {
    id: 'ch02-004',
    chapter: 2,
    topic: '빅데이터 활용 3요소',
    type: 'short',
    difficulty: 1,
    question: '빅데이터 활용을 위한 3요소는 데이터, 기술, 그리고 무엇인가?',
    answer: ['인력', '인재'],
    explanation:
      '빅데이터 활용 3요소\n· 데이터: 모든 것의 데이터화(datafication)\n· 기술: 진화하는 알고리즘, 인공지능\n· 인력: 데이터 사이언티스트, 알고리즈미스트',
    source: 'AI 작성 · 미검증',
  },
  {
    id: 'ch03-001',
    chapter: 3,
    topic: '데이터 사이언티스트의 역량',
    type: 'choice',
    difficulty: 2,
    question:
      '데이터 사이언티스트에게 요구되는 역량 중 소프트 스킬(Soft Skill)에 해당하는 것은?',
    choices: [
      '빅데이터에 대한 이론적 지식',
      '분석 기술에 대한 숙련도',
      '통찰력 있는 분석과 설득력 있는 전달',
      '분산 처리 프레임워크 운용 능력',
    ],
    answer: [2],
    explanation:
      '· 하드 스킬: 빅데이터 이론적 지식, 분석 기술의 숙련도\n· 소프트 스킬: 통찰력 있는 분석(호기심·논리적 비판), 설득력 있는 전달(스토리텔링·시각화), 다분야 간 협력(커뮤니케이션)',
    source: 'AI 작성 · 미검증',
  },
  {
    id: 'ch03-002',
    chapter: 3,
    topic: '가치 패러다임의 변화',
    type: 'short',
    difficulty: 3,
    question:
      '가치 패러다임의 변화 단계 중, 디지털화와 연결을 넘어 복잡한 연결을 신뢰 기반으로 대신 관리해 주는 대리인이 중요해지는 단계를 무엇이라 하는가?',
    answer: ['에이전시', 'Agency'],
    bank: ['디지털화', '연결', '에이전시'],
    explanation:
      '가치 패러다임 3단계: 디지털화(Digitalization) → 연결(Connection) → 에이전시(Agency)\n· 디지털화: 아날로그 세상을 디지털로 옮기는 것 자체가 가치\n· 연결: 디지털화된 정보를 얼마나 효과적으로 연결하는가\n· 에이전시: 복잡한 연결을 신뢰 기반으로 대신 관리해 주는 것',
    source: 'AI 작성 · 미검증',
  },

  /* ───────────── 2과목 · 데이터 분석 기획 ───────────── */
  {
    id: 'ch04-001',
    chapter: 4,
    topic: '분석 주제 유형',
    type: 'short',
    difficulty: 3,
    question:
      '분석 대상(What)은 명확히 알지만 분석 방법(How)을 모르는 경우에 해당하는 분석 주제 유형을 쓰시오.',
    answer: ['솔루션', 'Solution'],
    bank: ['최적화(Optimization)', '통찰(Insight)', '솔루션(Solution)', '발견(Discovery)'],
    explanation:
      '분석 주제 유형 4분면 (대상 x 방법)\n· 대상 O / 방법 O → 최적화(Optimization)\n· 대상 O / 방법 X → 솔루션(Solution)\n· 대상 X / 방법 O → 통찰(Insight)\n· 대상 X / 방법 X → 발견(Discovery)',
    source: 'AI 작성 · 미검증',
  },
  {
    id: 'ch04-002',
    chapter: 4,
    topic: 'CRISP-DM',
    type: 'choice',
    difficulty: 2,
    question: 'CRISP-DM 방법론의 6단계를 순서대로 바르게 나열한 것은?',
    choices: [
      '업무 이해 → 데이터 이해 → 데이터 준비 → 모델링 → 평가 → 전개',
      '데이터 이해 → 업무 이해 → 데이터 준비 → 모델링 → 전개 → 평가',
      '업무 이해 → 데이터 준비 → 데이터 이해 → 모델링 → 평가 → 전개',
      '데이터 준비 → 업무 이해 → 데이터 이해 → 평가 → 모델링 → 전개',
    ],
    answer: [0],
    explanation:
      'CRISP-DM 6단계: 업무 이해 → 데이터 이해 → 데이터 준비 → 모델링 → 평가 → 전개\n각 단계는 순차적이지 않고 피드백을 통해 반복(iterative)된다.\n비교) KDD 5단계: 데이터셋 선택 → 데이터 전처리 → 데이터 변환 → 데이터 마이닝 → 결과 평가',
    source: 'AI 작성 · 미검증',
  },
  {
    id: 'ch04-003',
    chapter: 4,
    topic: '빅데이터 분석 방법론',
    type: 'blank',
    difficulty: 2,
    question:
      '빅데이터 분석 방법론의 5단계는 ( ① ) → 데이터 준비 → 데이터 분석 → ( ② ) → 평가 및 전개 이다. 빈칸을 채우시오.',
    answer: [
      ['분석 기획', '분석기획'],
      ['시스템 구현', '시스템구현'],
    ],
    explanation:
      '빅데이터 분석 방법론 5단계\n① 분석 기획: 범위 설정, 프로젝트 정의, 위험 계획 수립\n② 데이터 준비: 데이터 스토어 설계, 수집 및 정합성 점검\n③ 데이터 분석: 텍스트 분석, 탐색적 분석, 모델링, 모델 평가\n④ 시스템 구현: 설계 및 구현, 시스템 테스트 및 운영\n⑤ 평가 및 전개: 모델 발전 계획, 프로젝트 평가 및 보고',
    source: 'AI 작성 · 미검증',
  },
  {
    id: 'ch04-004',
    chapter: 4,
    topic: '하향식 접근법',
    type: 'short',
    difficulty: 2,
    question:
      '하향식 접근법의 문제 탐색 단계에서 비즈니스 모델 캔버스를 단순화한 5개 블록은 업무, 제품, 고객, 규제와 감사, 그리고 무엇인가?',
    answer: ['지원 인프라', '지원인프라', '인프라'],
    explanation:
      '비즈니스 모델 캔버스 기반 문제 탐색 5블록\n· 업무(Operation) · 제품(Product) · 고객(Customer)\n· 규제와 감사(Regulation & Audit) · 지원 인프라(IT & Human Resource)\n앞 3개는 가치 창출의 원천, 뒤 2개는 이를 뒷받침하는 관리 영역이다.',
    source: 'AI 작성 · 미검증',
  },
  {
    id: 'ch04-005',
    chapter: 4,
    topic: '상향식 접근법',
    type: 'choice',
    difficulty: 3,
    question:
      '분석 과제 발굴에서 상향식 접근법(Bottom-up Approach)에 대한 설명으로 옳지 않은 것은?',
    choices: [
      '문제 정의 자체가 어려운 경우 데이터를 기반으로 문제를 지속적으로 개선한다',
      '주로 비지도 학습 방법에 의해 수행된다',
      '디자인 씽킹의 발산(Diverge) 단계에 해당하는 사고 방식이다',
      '문제가 확실할 때 답을 구하는 방식으로, 논리적 단계별 접근이 특징이다',
    ],
    answer: [3],
    explanation:
      '④는 하향식 접근법(Top-down)의 설명이다.\n· 하향식: 문제가 주어지고 답을 찾는다. 문제 탐색 → 문제 정의 → 해결방안 탐색 → 타당성 검토\n· 상향식: 문제 정의가 어려울 때 데이터를 보며 문제를 찾는다. 비지도 학습, 프로토타이핑\n디자인 씽킹은 상향식(발산)과 하향식(수렴)을 반복한다.',
    source: 'AI 작성 · 미검증',
  },
  {
    id: 'ch05-001',
    chapter: 5,
    topic: '분석 과제 우선순위',
    type: 'choice',
    difficulty: 2,
    question:
      '난이도와 시급성을 기준으로 분석 과제의 우선순위를 정할 때, 가장 나중에 추진해야 할 영역은?',
    choices: [
      '시급성이 현재이고 난이도가 쉬운 과제',
      '시급성이 미래이고 난이도가 쉬운 과제',
      '시급성이 현재이고 난이도가 어려운 과제',
      '시급성이 미래이고 난이도가 어려운 과제',
    ],
    answer: [3],
    explanation:
      '난이도·시급성 매트릭스에서 시급성이 미래이면서 난이도까지 어려운 영역이 가장 후순위다.\n· 시급성을 우선할 때: 미래·쉬움 → 현재·쉬움 → 미래·어려움\n· 난이도를 우선할 때: 미래·쉬움 → 현재·어려움 → 미래·어려움\n난이도는 데이터 획득·저장·가공 비용과 분석 적용 비용으로 판단한다.',
    source: 'AI 작성 · 미검증',
  },
  {
    id: 'ch05-002',
    chapter: 5,
    topic: '분석 준비도',
    type: 'choice',
    difficulty: 2,
    question: '기업의 분석 준비도(readiness)를 진단하는 6개 영역에 해당하지 않는 것은?',
    choices: ['분석 업무 파악', '인력 및 조직', '분석 기법', '경영진의 재무 성과'],
    answer: [3],
    explanation:
      '분석 준비도 6영역: 분석 업무 파악 · 인력 및 조직 · 분석 기법 · 분석 데이터 · 분석 문화 · IT 인프라\n분석 성숙도(도입 → 활용 → 확산 → 최적화)와 교차하여 준비형/정착형/도입형/확산형 4가지 유형으로 진단한다.',
    source: 'AI 작성 · 미검증',
  },
  {
    id: 'ch05-003',
    chapter: 5,
    topic: '분석 성숙도 모델',
    type: 'blank',
    difficulty: 2,
    question:
      '분석 성숙도 모델의 4단계는 ( ① ) → 활용 → ( ② ) → 최적화 순이다. 빈칸을 채우시오.',
    answer: [['도입'], ['확산']],
    explanation:
      '분석 성숙도 4단계 (CMMI 기반)\n· 도입: 분석을 시작해 환경과 시스템을 구축\n· 활용: 분석 결과를 실제 업무에 적용\n· 확산: 전사 차원에서 분석을 관리하고 공유\n· 최적화: 분석을 진화시켜 혁신 및 성과 향상에 기여',
    source: 'AI 작성 · 미검증',
  },
  {
    id: 'ch05-004',
    chapter: 5,
    topic: '분석 조직 구조',
    type: 'short',
    difficulty: 3,
    question:
      '별도의 분석 전담 조직 없이 각 현업 부서에서 직접 분석을 수행하여, 전사적 관점의 핵심 분석이 어렵고 부서 현황 파악에 그치기 쉬운 조직 구조는?',
    answer: ['기능 구조', '기능형', '기능구조', 'Functional'],
    bank: ['집중 구조', '기능 구조', '분산 구조'],
    explanation:
      '· 집중 구조: 전사 분석 조직이 모든 분석을 담당. 현업과 중복·이원화 가능성\n· 기능 구조: 해당 부서가 직접 분석. 전사 핵심 분석이 어렵고 부서 현황 파악에 국한\n· 분산 구조: 분석 조직 인력을 현업에 배치. 신속한 실무 적용, 과제 발굴·공유에 유리',
    source: 'AI 작성 · 미검증',
  },

  /* ───────────── 3과목 · 데이터 분석 ───────────── */
  {
    id: 'ch06-001',
    chapter: 6,
    topic: 'R 자료구조',
    type: 'short',
    difficulty: 1,
    question:
      'R에서 열마다 자료형이 다를 수 있는 2차원 자료구조로, 통계 분석에 가장 널리 쓰이는 것은?',
    answer: ['데이터프레임', 'data.frame', '데이터 프레임', 'dataframe'],
    explanation:
      'R 자료구조\n· 벡터: 1차원, 동일 자료형\n· 행렬(matrix): 2차원, 동일 자료형\n· 배열(array): 3차원 이상, 동일 자료형\n· 데이터프레임: 2차원, 열마다 자료형이 다를 수 있음\n· 리스트: 서로 다른 구조의 객체를 원소로 담는 컨테이너',
    source: 'AI 작성 · 미검증',
  },
  {
    id: 'ch06-002',
    chapter: 6,
    topic: '데이터 마트',
    type: 'short',
    difficulty: 2,
    question:
      'R의 reshape 패키지에서 원 데이터를 식별자와 측정치로 이루어진 긴(long) 형식으로 녹여내는 함수명을 쓰시오.',
    answer: ['melt'],
    explanation:
      'reshape 패키지\n· melt(): 원 데이터를 id 변수 + variable + value 의 long 형식으로 변환\n· cast()/dcast(): melt 된 데이터를 원하는 형태로 재구성하며 집계\n요약 집계에는 plyr 의 ddply(), 대용량 처리에는 data.table 이 쓰인다.',
    source: 'AI 작성 · 미검증',
  },
  {
    id: 'ch06-003',
    chapter: 6,
    topic: '이상값 검출',
    type: 'choice',
    difficulty: 2,
    question: '상자그림(box plot)에서 이상값(outlier)으로 판정하는 일반적인 기준은?',
    choices: [
      'Q1 − 1.5×IQR 보다 작거나 Q3 + 1.5×IQR 보다 큰 값',
      'Q1 − 3×IQR 보다 작거나 Q3 + 3×IQR 보다 큰 값',
      '평균 ± 1 표준편차를 벗어나는 값',
      '중앙값 ± 1.5 표준편차를 벗어나는 값',
    ],
    answer: [0],
    explanation:
      '· 사분위수 기준: Q1 − 1.5×IQR ~ Q3 + 1.5×IQR 을 벗어나면 이상값 (IQR = Q3 − Q1)\n· ESD(Extreme Studentized Deviation): 평균에서 표준편차의 3배를 벗어나는 값\n이상값은 무조건 제거하지 않는다. 분석 목적에 따라 대체하거나 그대로 둔다.',
    source: 'AI 작성 · 미검증',
  },
  {
    id: 'ch06-004',
    chapter: 6,
    topic: '결측값 처리',
    type: 'short',
    difficulty: 2,
    question:
      'R에서 데이터프레임의 각 행이 결측값을 하나도 포함하지 않는지 논리값으로 반환하여, 완전한 행만 골라낼 때 쓰는 함수명을 쓰시오.',
    answer: ['complete.cases', 'complete.cases()'],
    explanation:
      '· is.na(x): 원소 단위로 결측 여부 판정\n· complete.cases(df): 행 단위로 결측이 없는지 판정\n· 단순 대치: 평균·중앙값·최빈값 대체 (DMwR 의 centralImputation)\n· 다중 대치: Amelia 패키지 등으로 여러 개의 대치값을 생성',
    source: 'AI 작성 · 미검증',
  },
  {
    id: 'ch07-001',
    chapter: 7,
    topic: '표본 추출',
    type: 'short',
    difficulty: 2,
    question:
      '모집단을 내부적으로 동질적인 여러 층으로 나눈 뒤 각 층에서 정해진 크기만큼 무작위로 뽑는 표본추출 방법을 쓰시오.',
    answer: ['층화추출', '층화 추출', '층화표본추출', 'Stratified Sampling', '층화'],
    bank: ['단순랜덤추출', '계통추출', '집락추출', '층화추출'],
    explanation:
      '· 단순랜덤추출: N개 중 n개를 무작위로\n· 계통추출: 일정 간격 k마다 하나씩\n· 집락(군집)추출: 여러 집락 중 몇 개를 뽑아 그 안을 조사\n· 층화추출: 층으로 나눈 뒤 층 내부에서 무작위 추출 (층 내는 동질적, 층 간은 이질적)',
    source: 'AI 작성 · 미검증',
  },
  {
    id: 'ch07-002',
    chapter: 7,
    topic: '변수의 척도',
    type: 'choice',
    difficulty: 2,
    question: '다음 중 절대적 0점이 존재하여 비율 비교가 의미를 갖는 척도는?',
    choices: ['명목척도', '순서척도', '구간척도', '비율척도'],
    answer: [3],
    explanation:
      '· 명목척도: 단순 분류 (성별, 혈액형)\n· 순서척도: 순서에 의미 (학점, 만족도 등급)\n· 구간척도: 간격에 의미, 절대 0 없음 (섭씨온도, 지능지수) — "20도가 10도의 2배"는 성립하지 않는다\n· 비율척도: 절대 0 존재, 비율 비교 가능 (무게, 나이, 소득)',
    source: 'AI 작성 · 미검증',
  },
  {
    id: 'ch07-003',
    chapter: 7,
    topic: '다중공선성',
    type: 'short',
    difficulty: 3,
    question:
      '회귀분석에서 독립변수들 간에 강한 상관관계가 존재하여 회귀계수의 추정이 불안정해지는 문제를 무엇이라 하는가?',
    answer: ['다중공선성', '다중 공선성', 'Multicollinearity'],
    explanation:
      '다중공선성 진단: 분산팽창요인 VIF > 10 이면 다중공선성이 있다고 본다.\n해결: 해당 변수 제거, 주성분분석(PCA)으로 차원 축소, 능형회귀(Ridge) 사용\n회귀분석의 가정 5가지: 선형성 · 독립성 · 등분산성 · 비상관성 · 정상성(정규성)',
    source: 'AI 작성 · 미검증',
  },
  {
    id: 'ch07-004',
    chapter: 7,
    topic: '결정계수',
    type: 'choice',
    difficulty: 2,
    question: '회귀모형의 결정계수(R²)에 대한 설명으로 옳지 않은 것은?',
    choices: [
      '총 변동 중 회귀식이 설명하는 변동의 비율이다',
      '0과 1 사이의 값을 가지며 1에 가까울수록 설명력이 높다',
      '독립변수를 추가하면 설명력과 무관하게 값이 커질 수 있다',
      '독립변수의 수가 늘어나면 수정된 결정계수도 항상 함께 커진다',
    ],
    answer: [3],
    explanation:
      '수정된 결정계수(Adjusted R²)는 독립변수의 수에 벌점을 주기 때문에, 설명력에 기여하지 못하는 변수를 추가하면 오히려 감소한다. 그래서 다중회귀 모형 비교에는 R²가 아니라 수정된 R²를 쓴다.\nR² = SSR/SST = 1 − SSE/SST',
    source: 'AI 작성 · 미검증',
  },
  {
    id: 'ch07-005',
    chapter: 7,
    topic: '시계열 분석',
    type: 'short',
    difficulty: 2,
    question:
      '시계열 자료를 추세요인, 계절요인, 순환요인, 불규칙요인으로 나누어 분석하는 방법을 무엇이라 하는가?',
    answer: ['분해 시계열', '분해시계열', '시계열 분해', 'Decomposition'],
    explanation:
      '분해 시계열의 4가지 요인\n· 추세요인: 장기적으로 증가하거나 감소하는 경향\n· 계절요인: 고정된 주기의 반복 (요일, 월, 분기)\n· 순환요인: 알려지지 않은 주기의 변동\n· 불규칙요인: 위 셋으로 설명되지 않는 나머지\n정상성을 만족하지 않으면 차분(추세) 또는 변환(분산)으로 정상화한다.',
    source: 'AI 작성 · 미검증',
  },
  {
    id: 'ch07-006',
    chapter: 7,
    topic: '주성분분석',
    type: 'short',
    difficulty: 2,
    question:
      '여러 변수의 변량을 서로 상관되지 않은 소수의 선형결합으로 축약하는 차원 축소 기법의 약어를 쓰시오.',
    answer: ['PCA', '주성분분석', 'Principal Component Analysis'],
    explanation:
      '주성분 개수 선택 기준\n· 누적 기여율이 80% 이상이 되는 지점\n· 스크리 산점도(Scree Plot)에서 기울기가 완만해지는 지점\n· 고유값(eigenvalue)이 1 이상인 주성분\nPCA는 제1주성분이 가장 큰 분산을 갖도록 순서가 정해진다.',
    source: 'AI 작성 · 미검증',
  },
  {
    id: 'ch08-001',
    chapter: 8,
    topic: '데이터 분할',
    type: 'short',
    difficulty: 2,
    question:
      '데이터를 k개의 부분집합으로 나눈 뒤 k−1개로 학습하고 나머지 1개로 평가하기를 k번 반복하여 성능을 평균 내는 검증 방법을 쓰시오.',
    answer: [
      'k-fold 교차검증',
      'k폴드 교차검증',
      '교차검증',
      'k-fold cross validation',
      'k겹 교차검증',
    ],
    explanation:
      '· 홀드아웃(Holdout): 훈련용/평가용으로 한 번만 분할\n· k-fold 교차검증: k번 반복하여 평균. 데이터가 적을 때 유용\n· 부트스트랩(Bootstrap): 복원추출로 표본을 만듦. 전체의 약 63.2%만 훈련에 쓰인다',
    source: 'AI 작성 · 미검증',
  },
  {
    id: 'ch08-002',
    chapter: 8,
    topic: '의사결정나무',
    type: 'choice',
    difficulty: 3,
    question: '의사결정나무 알고리즘과 분리 기준(불순도 측도)이 바르게 짝지어진 것은?',
    choices: [
      'CART — 카이제곱 통계량',
      'C4.5 — 지니 지수',
      'CHAID — 카이제곱 통계량',
      'CART — 엔트로피 지수',
    ],
    answer: [2],
    explanation:
      '· CHAID: 카이제곱 통계량(이산형), F 통계량(연속형). 다지분리\n· CART: 지니 지수(이산형), 분산 감소량(연속형). 이진분리\n· C4.5 / C5.0: 엔트로피 지수, 정보 이득비\n불순도가 가장 크게 감소하는 방향으로 분리한다.',
    source: 'AI 작성 · 미검증',
  },
  {
    id: 'ch08-003',
    chapter: 8,
    topic: '앙상블 기법',
    type: 'short',
    difficulty: 2,
    question:
      '앙상블 기법 중, 이전 분류기가 잘못 분류한 관측치에 더 큰 가중치를 부여하며 분류기를 순차적으로 학습시키는 방법을 쓰시오.',
    answer: ['부스팅', 'Boosting'],
    bank: ['배깅(Bagging)', '부스팅(Boosting)', '랜덤 포레스트(Random Forest)'],
    explanation:
      '· 배깅(Bagging): 부트스트랩 표본을 병렬로 학습해 투표·평균. 분산 감소\n· 부스팅(Boosting): 오분류 관측치에 가중치를 높여 순차 학습. 편향 감소 (AdaBoost, GBM)\n· 랜덤 포레스트: 배깅 + 변수도 무작위로 선택하여 나무 간 상관을 낮춤',
    source: 'AI 작성 · 미검증',
  },
  {
    id: 'ch08-004',
    chapter: 8,
    topic: '연관분석',
    type: 'short',
    difficulty: 3,
    question:
      '연관규칙 A → B 에서 신뢰도를 B의 지지도로 나눈 값으로, 두 품목이 우연히 함께 팔리는 정도 대비 얼마나 강하게 연관되는지를 나타내는 측도를 쓰시오.',
    answer: ['향상도', 'Lift'],
    explanation:
      '· 지지도(Support) = P(A∩B) — 전체 거래 중 A와 B를 함께 포함하는 비율\n· 신뢰도(Confidence) = P(B|A) = P(A∩B)/P(A)\n· 향상도(Lift) = P(B|A)/P(B) = 신뢰도 ÷ B의 지지도\n향상도가 1이면 A와 B는 독립, 1보다 크면 양의 상관, 작으면 음의 상관이다.',
    source: 'AI 작성 · 미검증',
  },
  {
    id: 'ch08-005',
    chapter: 8,
    topic: '군집분석',
    type: 'choice',
    difficulty: 2,
    question:
      '계층적 군집분석의 연결법 중, 군집 내 오차제곱합의 증가량이 최소가 되도록 군집을 병합하는 방법은?',
    choices: ['최단연결법', '최장연결법', '평균연결법', '와드연결법'],
    answer: [3],
    explanation:
      '· 최단연결법(single): 두 군집에서 가장 가까운 관측치 거리. 고리 모양 군집에 취약\n· 최장연결법(complete): 가장 먼 관측치 거리\n· 평균연결법(average): 모든 쌍의 평균 거리\n· 중심연결법(centroid): 두 군집 중심 간 거리\n· 와드연결법(ward): 군집 내 오차제곱합 증가량이 최소가 되도록 병합. 크기가 비슷한 군집을 만든다',
    source: 'AI 작성 · 미검증',
  },
  {
    id: 'ch08-006',
    chapter: 8,
    topic: '모형 성과 평가',
    type: 'blank',
    difficulty: 3,
    question:
      '오분류표에서 실제 True 인 것 중 True 로 예측한 비율을 ( ① )(이)라 하고, True 로 예측한 것 중 실제 True 인 비율을 ( ② )(이)라 한다. 빈칸을 채우시오.',
    answer: [
      ['재현율', 'Recall', '민감도', 'Sensitivity'],
      ['정밀도', 'Precision'],
    ],
    explanation:
      '오분류표 지표\n· 정확도(Accuracy) = (TP+TN) / 전체\n· 정밀도(Precision) = TP/(TP+FP) — 예측 True 중 실제 True\n· 재현율(Recall) = 민감도(Sensitivity) = TP/(TP+FN) — 실제 True 중 예측 True\n· 특이도(Specificity) = TN/(TN+FP)\n· F1 = 정밀도와 재현율의 조화평균',
    source: 'AI 작성 · 미검증',
  },
  {
    id: 'ch08-007',
    chapter: 8,
    topic: 'ROC 곡선',
    type: 'short',
    difficulty: 2,
    question:
      'ROC 곡선 아래의 면적으로 모형의 분류 성능을 하나의 값으로 요약한 지표의 약어를 쓰시오.',
    answer: ['AUC', 'AUROC', 'Area Under Curve'],
    explanation:
      'ROC 곡선은 x축에 1−특이도(FP Rate), y축에 민감도(TP Rate)를 그린 것이다.\nAUC는 0.5~1의 값을 가지며 1에 가까울수록 좋다.\n· 0.9~1.0 excellent · 0.8~0.9 good · 0.7~0.8 fair · 0.6~0.7 poor · 0.5~0.6 fail',
    source: 'AI 작성 · 미검증',
  },
]

/** 실제 기출·정리본 기반 데이터로 교체하기 전 상태인지 알려주는 플래그 */
export const IS_SAMPLE_DATA = true
