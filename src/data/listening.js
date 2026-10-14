/**
 * 영어 듣기 자료 목록.
 *
 * 문제 데이터가 아니라 바깥으로 나가는 링크 모음이라 subjects/ 아래가 아니라
 * 여기 둔다. 엔진(채점·저장·통계)과 아무 관계가 없다.
 *
 * **링크 규칙** — 전부 채널 핸들(@handle) 주소다. 19개 모두 공식 사이트·위키·
 * 채널 자체 메타데이터로 교차 검증했다. 핸들만 보고 짐작하면 안 되는 함정이
 * 두 개 있었다.
 *
 *   · Easy English → @EasyEnglishVideos 다. @easyenglish551 은 구독자 458만의
 *     전혀 다른 문법 강의 채널이다. 진짜는 Mitch & Isi 의 브라이턴 길거리
 *     인터뷰 채널이고, 현재 유튜브 표시 이름이 "Easy British English" 라서
 *     들어가면 이름이 달라 보이지만 맞는 채널이다.
 *   · Super Eyepatch Wolf → @supereyepatchwolf0 이다. 꼬리표 없는
 *     @SuperEyepatchWolf 는 구독자 14명짜리 무관한 채널이 선점하고 있다.
 *
 * 채널명으로 짐작해서 고치지 말고, 바뀌었으면 공식 사이트에서 확인할 것.
 */

/**
 * level 은 듣기 난이도 1~3.
 *   1 또렷하고 느림 · 2 보통 속도의 자연스러운 말 · 3 빠르거나 억양이 센 편
 * pick 은 이 섹션에서 먼저 들어볼 것. warn 은 알고 들어가야 할 것.
 */
export const SECTIONS = [
  {
    id: 'shadow',
    title: '쉐도잉',
    note: '자막이 정확한 채널만 골랐다. 자동생성 자막은 틀린 데가 많아서 따라 말하기엔 못 쓴다.',
    items: [
      {
        name: 'Easy English',
        url: 'https://www.youtube.com/@EasyEnglishVideos',
        level: 2,
        pick: true,
        blurb: '길거리 인터뷰. 영어 자막이 영상에 박혀 있어서 따로 켤 게 없다. 진짜 사람들이 말하는 속도와 억양 그대로라 쉐도잉 입문에 제일 좋다. (채널 이름이 "Easy British English" 로 떠도 맞는 곳이다)',
      },
      {
        name: 'Kurzgesagt – In a Nutshell',
        url: 'https://www.youtube.com/@kurzgesagt',
        level: 2,
        blurb: '나레이션인데 발음이 아주 또렷하고 자막이 정확하다. 10분 내외라 한 영상을 통째로 쭉 따라 말하기 좋다.',
      },
      {
        name: 'BBC Learning English',
        url: 'https://www.youtube.com/@bbclearningenglish',
        level: 2,
        blurb: '6 Minute English 시리즈. 두 명이 수다 떨듯 진행하고 전체 스크립트를 준다. 6분이라 하루치로 부담이 없다.',
      },
      {
        name: 'TED-Ed',
        url: 'https://www.youtube.com/@TEDEd',
        level: 3,
        blurb: '5분짜리 애니메이션 강의. 공식 자막이라 정확하고, 짧아서 문단 단위로 끊어 연습하기 좋다.',
      },
      {
        name: 'TED',
        url: 'https://www.youtube.com/@TED',
        level: 3,
        blurb: '15분 강연. 자막·스크립트 퀄리티가 제일 좋다. 다만 강연체라 대화체 연습은 아니다.',
      },
      {
        name: 'Hot Ones',
        url: 'https://www.youtube.com/@FirstWeFeast',
        level: 3,
        blurb: '매운 닭날개 먹으면서 하는 셀럽 인터뷰. 대본 없는 진짜 대화체를 자막과 같이 볼 수 있다.',
      },
    ],
  },

  {
    id: 'talk',
    title: '수다 · 사는 이야기',
    note: '틀어놓고 흘려듣는 용도. 유튜브에 풀영상이 올라오는 것들이다.',
    items: [
      {
        name: 'Giggly Squad',
        url: 'https://www.youtube.com/@GigglySquad',
        level: 3,
        pick: true,
        blurb: '두 여자가 일상·유행·사람 관찰하면서 웃긴 얘기. 이 장르 중에서는 톤이 밝고 발음이 또렷한 편이다.',
      },
      {
        name: 'Anything Goes (Emma Chamberlain)',
        url: 'https://www.youtube.com/@anythinggoeswithemma',
        level: 2,
        blurb: '혼자 조곤조곤 인생 고민을 얘기한다. 느리고 차분해서 배경으로 깔아두기 좋다.',
      },
      {
        name: 'The Receipts Podcast',
        url: 'https://www.youtube.com/@thereceiptspodcast',
        level: 3,
        blurb: '영국 여자 셋. 브리티시 억양에 귀를 뚫고 싶으면 이쪽.',
      },
      {
        name: 'Call Her Daddy',
        url: 'https://www.youtube.com/@callherdaddy',
        level: 3,
        warn: '성적인 얘기가 꽤 노골적이다',
        blurb: '이 장르에서 제일 유명하다. 내용을 감안할 수 있으면 대화 자체는 아주 자연스럽다.',
      },
    ],
  },

  {
    id: 'mystery',
    title: '미스터리 · 공포',
    items: [
      {
        name: 'MrBallen',
        url: 'https://www.youtube.com/@MrBallen',
        level: 2,
        pick: true,
        blurb: '실화 미스터리와 기괴한 사건을 이야기꾼처럼 풀어준다. 발음이 또렷하고 속도가 적당한데 이야기가 재밌어서 계속 듣게 된다. 리스닝 입문으로 제일 낫다.',
      },
      {
        name: 'Lazy Masquerade',
        url: 'https://www.youtube.com/@LazyMasquerade',
        level: 2,
        blurb: '차분한 나레이션으로 괴담을 읽어준다. 자기 전에 틀어두기 좋다.',
      },
      {
        name: 'Rotten Mango',
        url: 'https://www.youtube.com/@rottenmangopod',
        level: 2,
        blurb: '한국계 미국인이 진행하는 실화 범죄. 한국 사건도 자주 다뤄서 배경지식이 있는 만큼 덜 어렵다.',
      },
      {
        name: 'RedHanded',
        url: 'https://www.youtube.com/@RedHandedthepod',
        level: 3,
        blurb: '영국 여자 둘이 수다 떨면서 사건을 얘기한다. 수다와 미스터리가 합쳐진 거라 두 취향이 겹치면 여기부터.',
      },
      {
        name: 'Nexpo',
        url: 'https://www.youtube.com/@Nexpo',
        level: 3,
        blurb: '인터넷 미스터리 심층 파기. 분위기 잡는 편집이 좋아서 몰입은 잘 되는데 말이 빠른 편이다.',
      },
    ],
  },

  {
    id: 'anime',
    title: '애니 리뷰',
    items: [
      {
        name: 'Trash Taste',
        url: 'https://www.youtube.com/@TrashTaste',
        level: 3,
        pick: true,
        blurb: '셋이서 하는 애니 팟캐스트. 한 편이 2~3시간이라 틀어놓고 흘려듣기에 딱 맞고, 진행자 억양이 영국·호주·웨일스로 갈려서 여러 발음에 한꺼번에 노출된다.',
      },
      {
        name: 'Super Eyepatch Wolf',
        url: 'https://www.youtube.com/@supereyepatchwolf0',
        level: 2,
        blurb: '애니·만화 장문 분석. 목소리가 차분하고 천천히 말해서 영상이 길어도 편하게 들린다.',
      },
      {
        name: "Mother's Basement",
        url: 'https://www.youtube.com/@mothersbasement',
        level: 3,
        blurb: '오프닝 분석으로 유명하다. 편당 15~20분이라 길이가 적당하다.',
      },
      {
        name: 'Gigguk',
        url: 'https://www.youtube.com/@Gigguk',
        level: 3,
        blurb: '리뷰라기보다 개그에 가깝다. 말이 빨라서 위의 것들이 편해진 다음에.',
      },
    ],
  },
]

/** 쉐도잉 순서. 한 영상을 이 순서로 네 번 돌린다. */
export const HOWTO = [
  '자막 켜고 한 번 그냥 본다. 무슨 내용인지부터 안다.',
  '자막 보면서 반박자 늦게 겹쳐 말한다(오버래핑). 끊지 말고 쭉 따라간다.',
  '0.75배속으로 자막 없이 따라 말한다.',
  '1배속, 자막 없이 쭉. 여기까지 되면 다음 영상으로.',
]

export const TOOLS = [
  {
    name: 'Language Reactor',
    url: 'https://www.languagereactor.com',
    blurb: '크롬 확장. 유튜브·넷플릭스에 영어+한국어 이중자막이 뜨고 문장 단위로 되감기와 단어 뜻 확인이 된다. 쉐도잉 도구 중에는 이게 제일 낫다.',
  },
  {
    name: '유튜브 스크립트',
    url: null,
    blurb: '영상 설명란 아래 “스크립트 표시”를 누르면 전체 대본이 타임스탬프와 같이 나온다. 복사해서 텍스트로 놓고 보면 편하다.',
  },
  {
    name: '재생 속도 0.75배',
    url: null,
    blurb: '처음에는 0.75배로 시작하고 입이 따라붙으면 1배로 올린다. 느리게 여러 번이 빠르게 한 번보다 낫다.',
  },
]
