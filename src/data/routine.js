/**
 * 영어 학습 루틴 — 평일/주말 블록과 셀프토크 질문 90개.
 *
 * 과목이 아니다. 문제도 채점도 없고, 체크한 기록만 localStorage 에 남는다.
 * (기록은 src/lib/english.js)
 *
 * 루틴이 이렇게 생긴 이유는 네 가지다.
 *   1. 회화 병목은 인풋이 아니라 아웃풋 경험 부족이다 → 인풋:아웃풋 5:5
 *   2. 인풋은 90~95% 이해되는 것만 흡수된다 → 난이도를 맞춰야 한다
 *   3. 단어가 아니라 덩어리로 저장해야 입에서 나온다 → 내 문장 변환이 필수
 *   4. "막힘 → 채우기 → 재발화" 가 실력이 느는 유일한 지점 → 셀프토크 2회 녹음
 */

/**
 * 평일 블록. 매일 하는 게 목적이라 일부러 작게 잡았다.
 * core 는 시간이 없어도 빼면 안 되는 것 — 말하기는 총량보다 빈도가 지배한다.
 */
export const WEEKDAY = [
  {
    id: 'listen',
    name: '집중 듣기',
    min: 20,
    how: '5분짜리 영상 하나를 세 번 돌린다. ① 자막 없이 몇 % 들리나 ② 영어 자막 켜고 안 들린 이유 분류(모르는 단어 · 연음 · 속도) ③ 오버래핑 → 자막 끄고 쉐도잉',
    to: '/listening',
    toLabel: '듣기 자료',
  },
  {
    id: 'chunks',
    name: '덩어리 5개',
    min: 10,
    how: '오늘 들은 것에서 표현 5개를 뽑되 베껴 적지 말고 반드시 내 일상 문장으로 바꿔서 소리내어 말한다. 이 변환을 건너뛰면 끝까지 남의 문장으로 남는다.',
    to: '/notes',
    toLabel: '노트에 적기',
  },
  {
    id: 'talk',
    name: '1분 셀프토크',
    min: 15,
    core: true,
    how: '① 준비 없이 1분 녹음 ② 되들으며 막힌 곳·한국어로 먼저 생각한 곳 표시 ③ 그 부분만 찾아 채우기 ④ 같은 질문으로 다시 1분 녹음. 2회차가 오늘의 결과물이다.',
  },
  {
    id: 'review',
    name: '어제 복습',
    min: 5,
    how: '어제 적은 덩어리 5개를 소리내어 읽는다. 눈으로만 보면 안 남는다.',
    to: '/notes',
    toLabel: '어제 것 보기',
  },
]

/** 주말 블록. 평일이 유지·축적이면 주말은 확장·통합이다. */
export const WEEKEND = [
  {
    id: 'weave',
    name: '주간 덩어리 통합',
    min: 30,
    how: '이번 주에 모은 덩어리를 하나의 이야기로 엮어서 3분 말하고 녹음한다. 흩어진 표현이 실제 발화로 연결되는 지점이라 주말의 핵심이다.',
    to: '/notes',
    toLabel: '이번 주 덩어리',
  },
  {
    id: 'long',
    name: '긴 인풋',
    min: 60,
    how: '팟캐스트나 긴 영상. 여기서는 집중하지 않아도 되지만 "이해되는 것"이어야 한다. 안 들리는 걸 틀어두는 건 공부가 아니라 소음이다.',
    to: '/listening',
    toLabel: '듣기 자료',
  },
  {
    id: 'read',
    name: '리딩',
    min: 40,
    how: '사전은 한 페이지에 2~3개까지만 찾고 나머지는 넘어간다. 다 찾으면 읽기가 아니라 번역이 된다. 반복해서 나오는 단어만 남고, 그게 진짜 중요한 단어다.',
  },
  {
    id: 'talk',
    name: '1분 셀프토크',
    min: 15,
    core: true,
    how: '주말이라고 빼지 않는다. 이틀 쉬면 되돌아간다.',
  },
  {
    id: 'tutor',
    name: '원어민 대화',
    min: 30,
    fromMonth: 2,
    how: '2개월차부터. 주 1~2회 30분이면 충분하다. 셀프토크는 내가 말할 수 있는 것만 말하게 되는 한계가 있어서, 예상 못 한 질문에 반응하는 경험이 반드시 필요하다. (Cambly · iTalki · Preply / 무료는 Tandem · HelloTalk)',
  },
]

/** 자가진단 — 시작할 때 한 번, 4주마다 다시. 이게 유일하게 정직한 지표다. */
export const CHECKUP = {
  every: 28,
  questions: [
    'Tell me about where you live.',
    'What did you do last weekend?',
    'Tell me about a person you spend a lot of time with.',
  ],
  scale: [
    ['1분을 못 채움 · 단어 나열로 끝남', 'IL ~ IM1'],
    ['1분은 채우는데 문장이 짧고 시제가 흔들림', 'IM2'],
    ['이유랑 예시까지 붙여서 말함', 'IM3 ~ IH'],
    ['막힘 없이 구체적인 일화까지 나옴', 'IH ~ AL'],
  ],
}

/**
 * 셀프토크 질문 90개. OPIc 기출 주제를 난이도 순으로 배치했다.
 *   1~30   사실 서술 — 있는 그대로 말하기, 시제 유지
 *   31~60  경험·이유 — 일화를 구조로 풀기
 *   61~90  비교·의견·가정 + 롤플레이 — OPIc 고급 유형
 *
 * hint 는 그 질문에서 노리는 구조다. 답을 알려주는 게 아니라
 * "이번엔 이걸 써봐라"에 가깝다.
 */
export const TALK_QUESTIONS = [
  // ---------- 1개월차: 사실 서술 ----------
  { cat: '자기소개', q: 'Tell me about yourself.', hint: '이름 · 하는 일 · 요즘 관심사 세 축으로 나눠서' },
  { cat: '사는 곳', q: 'Tell me about where you live.', hint: '집 형태 → 방 구성 → 제일 좋아하는 공간 순서로' },
  { cat: '사는 곳', q: 'Describe your neighborhood.', hint: '위치 표현: near, across from, a few minutes from' },
  { cat: '일상', q: 'What does your typical weekday look like?', hint: '아침 → 낮 → 밤 시간 순서. 현재시제 유지' },
  { cat: '가족', q: 'Tell me about your family.', hint: '구성원 한 명씩, 성격 한 마디씩 붙이기' },
  { cat: '사람', q: 'Who do you spend the most time with?', hint: '누구 · 어떻게 만났는지 · 주로 뭘 하는지' },
  { cat: '경험', q: 'What did you do last weekend?', hint: '과거시제를 1분 내내 유지하는 게 목표' },
  { cat: '사람', q: 'Tell me about your best friend.', hint: '외모 → 성격 → 에피소드 하나' },
  { cat: '취미', q: 'What kind of music do you listen to?', hint: '장르 · 아티스트 · 언제 듣는지' },
  { cat: '취미', q: 'Tell me about a TV show or anime you like.', hint: '줄거리를 세 문장으로 요약하는 연습' },
  { cat: '취미', q: 'What do you usually do in your free time?', hint: '세 가지 나열하고 각각 한 문장씩 붙이기' },
  { cat: '사는 곳', q: 'Describe your room.', hint: '위치 표현: next to, across from, in the corner' },
  { cat: '음식', q: "What's your favorite food?", hint: '맛 표현 · 언제 먹는지 · 어디서' },
  { cat: '음식', q: 'Tell me about a restaurant you go to often.', hint: '위치 · 메뉴 · 분위기' },
  { cat: '일상', q: 'How do you usually get around?', hint: '교통수단 · 걸리는 시간 · 불편한 점' },
  { cat: '날씨', q: "What's the weather like where you live?", hint: '계절별로 한 문장씩' },
  { cat: '날씨', q: 'Tell me about your favorite season.', hint: '이유를 두 개 대기' },
  { cat: '일상', q: 'What do you do to relax?', hint: '추상적으로 말고 구체적 행동으로' },
  { cat: '사는 곳', q: 'Describe a place you go to often.', hint: '카페든 헬스장이든. 왜 거기인지까지' },
  { cat: '취미', q: 'What kind of movies do you like?', hint: '장르 → 예시 → 왜' },
  { cat: '일상', q: 'Tell me about your morning routine.', hint: '순서 표현: first, then, after that, finally' },
  { cat: '기술', q: 'What apps do you use the most?', hint: '세 개 · 각각 용도' },
  { cat: '기술', q: 'Tell me about your phone.', hint: '기기 · 쓰는 방식 · 얼마나 의존하는지' },
  { cat: '건강', q: 'Do you exercise? Tell me about it.', hint: '하든 안 하든 이유를 붙이면 답이 된다' },
  { cat: '음식', q: 'What do you usually eat for breakfast?', hint: '습관 표현: usually, tend to, most of the time' },
  { cat: '쇼핑', q: 'Tell me about a store you shop at.', hint: '어디 · 뭘 사는지 · 왜 거기' },
  { cat: '경험', q: 'What did you do yesterday?', hint: '과거시제 + 시간 순서' },
  { cat: '가족', q: "Tell me about someone in your family you're close to.", hint: '인물 묘사 → 왜 가까운지' },
  { cat: '계획', q: 'What are you planning to do this weekend?', hint: '미래 표현: be going to, planning to, might' },
  { cat: '일상', q: 'Describe your daily routine on the weekend.', hint: '평일과 뭐가 다른지 대조하며' },

  // ---------- 2개월차: 경험 · 이유 ----------
  { cat: '여행', q: 'Tell me about a memorable trip you took.', hint: '언제 · 어디 · 누구와 · 기억나는 장면 하나' },
  { cat: '감정', q: 'Tell me about a time you were really happy.', hint: '상황 설명이 먼저, 감정은 나중에' },
  { cat: '변화', q: "What's something you started recently?", hint: '계기 → 지금 상태' },
  { cat: '변화', q: 'Tell me about a hobby you used to have but stopped.', hint: 'used to 로 과거 습관, 왜 그만뒀는지까지' },
  { cat: '문제해결', q: 'Describe a time you had a problem and how you solved it.', hint: 'OPIc 단골. 상황 → 문제 → 행동 → 결과 4단' },
  { cat: '취미', q: 'Tell me about the last movie you watched.', hint: '줄거리 요약 + 내 감상 분리해서' },
  { cat: '경험', q: "What's the best gift you've ever received?", hint: '현재완료로 시작해서 과거로 풀기' },
  { cat: '문제해결', q: 'Tell me about a difficult decision you made.', hint: '선택지 두 개를 비교한 다음 결론' },
  { cat: '과거', q: 'Describe your favorite childhood memory.', hint: '과거 배경: used to, would, back then' },
  { cat: '경험', q: 'Tell me about a time you were late for something.', hint: '원인 → 결과 구조: because, so, that is why' },
  { cat: '목표', q: 'Why did you start learning English?', hint: '계기와 목표를 나눠서' },
  { cat: '목표', q: "Tell me about a skill you'd like to learn.", hint: '이유 + 구체적 계획' },
  { cat: '사람', q: 'Describe a person who influenced you.', hint: '인물 소개 → 어떤 영향인지' },
  { cat: '경험', q: 'Tell me about a time you tried something new.', hint: '기대 → 실제 → 결과' },
  { cat: '여행', q: "What's the most interesting place you've been to?", hint: '묘사를 먼저 충분히, 이유는 마지막에' },
  { cat: '취미', q: 'Tell me about a book or article that stuck with you.', hint: '요약 + 왜 남았는지' },
  { cat: '경험', q: 'Describe a time you helped someone.', hint: '상황 → 행동 → 상대 반응' },
  { cat: '감정', q: "What's something you're proud of?", hint: '결과가 아니라 과정을 설명하는 게 핵심' },
  { cat: '문제해결', q: "Tell me about a time something didn't go as planned.", hint: '대조 표현: but, however, instead, ended up -ing' },
  { cat: '변화', q: 'How has your daily life changed in the last few years?', hint: '현재완료: have been -ing, used to vs now' },
  { cat: '변화', q: "Tell me about a habit you're trying to change.", hint: '왜 · 어떻게 · 잘 되고 있는지' },
  { cat: '감정', q: 'Describe a time you felt nervous.', hint: '감정 + 몸의 반응까지 묘사' },
  { cat: '음식', q: "What's a food you didn't like before but like now?", hint: '과거 vs 현재 대조 구조' },
  { cat: '경험', q: 'Tell me about a concert, festival, or event you went to.', hint: '장면 묘사 위주. 오감으로' },
  { cat: '취미', q: 'Describe a time you got really into something.', hint: '몰입 경험. 얼마나 빠졌는지 구체적으로' },
  { cat: '여행', q: 'Tell me about a place you want to visit and why.', hint: 'would like to + 이유 두 개' },
  { cat: '감정', q: "What do you do when you're stressed?", hint: '조건 표현: when, whenever, if' },
  { cat: '사람', q: 'Tell me about a conversation you remember.', hint: '간접화법: he said that, she told me to' },
  { cat: '문제해결', q: 'Describe a time you learned something the hard way.', hint: '교훈으로 마무리하는 구조' },
  { cat: '변화', q: "What's changed about your neighborhood over the years?", hint: '과거 vs 현재. there used to be ~' },

  // ---------- 3개월차: 비교 · 의견 · 가정 · 롤플레이 ----------
  { cat: '비교', q: 'Compare living in a big city and a small town.', hint: '양쪽 근거를 각각 두 개씩. 한쪽만 말하면 답이 얇아진다' },
  { cat: '비교', q: 'Do you prefer watching movies at home or in a theater? Why?', hint: '선호 + 근거 2개 + 반대쪽 인정 한 마디' },
  { cat: '비교', q: "How is your generation different from your parents' generation?", hint: '대조 구조: whereas, while, on the other hand' },
  { cat: '의견', q: 'What are the pros and cons of working from home?', hint: '장점 2 · 단점 2 를 균형 있게' },
  { cat: '의견', q: 'Do you think social media does more good or harm?', hint: '입장 → 근거 → 반론 인정 → 재확인' },
  { cat: '비교', q: 'Compare Korean food and food from another country.', hint: '추상적으로 말고 구체적 메뉴로' },
  { cat: '가정', q: 'If you could live anywhere, where would you live?', hint: '가정법: If I could ~, I would ~' },
  { cat: '가정', q: 'What would you do if you had a free month?', hint: '가정법 + 구체적 계획 세 개' },
  { cat: '의견', q: 'How has technology changed the way people communicate?', hint: '변화 서술 + 예시. 현재완료' },
  { cat: '의견', q: 'Do you think it is better to study alone or with others?', hint: '경험을 근거로 대면 훨씬 강해진다' },
  { cat: '롤플레이', q: 'You want to join a gym. Ask the staff three questions.', hint: '질문 만들기: How much ~ / Do you have ~ / Can I ~' },
  { cat: '롤플레이', q: 'You ordered something online and it arrived damaged. Explain the problem and ask for a solution.', hint: '상황 설명 → 요구: I would like to ~ / Could you ~' },
  { cat: '롤플레이', q: 'A friend is visiting your city. Recommend three places and explain why.', hint: '추천 표현: You should ~, I would recommend ~, It is worth -ing' },
  { cat: '롤플레이', q: 'You need to cancel an appointment. Call and explain.', hint: '사과 → 이유 → 재조정 제안' },
  { cat: '비교', q: 'Compare how you spent your free time five years ago and now.', hint: '시제 대조가 무너지지 않게' },
  { cat: '가정', q: "What's one thing you'd change about your daily routine?", hint: '가정 + 왜 아직 못 바꿨는지' },
  { cat: '의견', q: 'Do you think people rely too much on their phones?', hint: '입장 + 본인 사례' },
  { cat: '의견', q: 'What advice would you give to someone learning your language?', hint: '조언 표현: should, try -ing, make sure to' },
  { cat: '롤플레이', q: "You're at a restaurant and the order is wrong. Handle it.", hint: '정중한 항의: Excuse me, I think there has been a mix-up' },
  { cat: '비교', q: 'Compare two things you like in the same category.', hint: '자유 비교. 기준을 먼저 정하고 시작' },
  { cat: '의견', q: 'What makes a good friend?', hint: '추상 개념을 예시로 풀어내는 연습' },
  { cat: '의견', q: 'How do you decide what to buy when shopping?', hint: '과정 설명: first I ~, then I ~' },
  { cat: '가정', q: 'If you could meet anyone, who would it be and why?', hint: '가정법 + 만나서 뭘 물을지까지' },
  { cat: '의견', q: "What's something popular that you don't understand the appeal of?", hint: '반대 의견을 예의 있게: I get why people like it, but ~' },
  { cat: '롤플레이', q: "You're late for a meeting. Call and explain the situation.", hint: '사과 + 도착 예정 + 대안' },
  { cat: '의견', q: 'How would you explain your job or major to a child?', hint: '쉬운 말로 풀어 말하기. 어려운 단어 금지' },
  { cat: '의견', q: "What's one problem in your city and how would you fix it?", hint: '문제 → 원인 → 해결 3단' },
  { cat: '의견', q: 'Do you think working hours should be shorter? Why or why not?', hint: '찬반 + 근거 2개 + 예상 반론' },
  { cat: '회고', q: 'What has been the biggest change in your life this year?', hint: '현재완료 + 구체적 사건' },
  { cat: '회고', q: 'Look back on the last three months of studying English. What changed?', hint: '마지막 날. 처음 녹음과 비교하며 답해보기' },
]
