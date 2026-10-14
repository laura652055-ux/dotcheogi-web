/**
 * 영어 어휘 과목(TOEIC · 일반 영어)이 같이 쓰는 챕터·문항 생성기.
 *
 * 두 과목은 원래 TOEIC 한 과목 안의 목록 두 개였다. 과목을 나눴어도 문항을
 * 만드는 규칙은 똑같아서 여기 한 벌만 둔다. 각 과목은 단어 목록 하나(LIST)를
 * 정의해서 넘기기만 한다.
 *
 * 다른 과목과 달리 문항을 손으로 적지 않고 **단어 목록에서 생성한다.**
 * 단어 수천 개에 문항을 두 개씩 손으로 쓰면 그 두 배를 베껴 적는 셈인데,
 * 그건 실수가 끼기 쉽고 단어 하나를 고칠 때마다 두 군데를 고쳐야 한다.
 * 어휘 문항은 형식이 완전히 규칙적이라 생성하는 편이 안전하다.
 *
 * 단어 하나에서 문항 두 개가 나온다. 방향이 반대라 난이도가 다르다.
 *   · choice (t0002-m) 영단어 → 뜻 고르기.  독해·청해에 필요한 **인지** 어휘
 *   · short  (t0002-s) 뜻 → 영단어 쓰기.    철자까지 아는 **생산** 어휘
 *
 * 암기(카드) 모드는 short/code 만 카드로 넘기므로 (src/lib/quiz.js)
 * 카드를 넘길 땐 자동으로 "뜻 → 영단어" 쪽만 나온다.
 *
 * ── 문항 id 는 절대 바꾸지 말 것 ──────────────────────────────
 * id 가 진도·오답의 저장 키다 (localStorage). 생성 규칙을 바꾸면 사용자의
 * 오답 노트가 통째로 날아간다. id 는 <목록 접두사><빈도 순위 4자리><방향> 이고
 * 순위는 배열 위치에서 나오므로, 단어를 추가할 땐 목록 **뒤에** 붙인다.
 * 중간에 끼워 넣으면 그 뒤 단어의 id 가 전부 밀린다.
 *
 * 목록(LIST) 필드
 *   key        출처 표기용 이름 (tsl → "TSL · 빈출 N위")
 *   code       챕터 코드 앞글자 (T → T01)
 *   idPrefix   문항 id 앞글자. **한 번 정하면 바꾸지 않는다**
 *   name       해설에 붙는 목록 이름 ("TOEIC 빈출 12위 / 1250단어")
 *   words      [단어, 품사, 한글 뜻, 영어 정의] 배열. 순서가 곧 빈도 순위
 *   rankOffset 배열 첫 단어가 원본 목록에서 몇 위인지 - 1
 *   seed       선지 섞는 난수의 배수. 바꾸면 오답 선지가 바뀌므로 그대로 둔다
 */

/** 한 챕터에 들어가는 단어 수. 125단어 = 250문항, 하루치로 잡을 만한 양이다. */
export const CHUNK = 125

const POS_LABEL = {
  n: '명사',
  v: '동사',
  adj: '형용사',
  adv: '부사',
  prep: '전치사',
  conj: '접속사',
  pron: '대명사',
  int: '감탄사',
}

/** 결정적 난수. 오답 선지가 매번 바뀌면 같은 문제가 아니게 된다. */
function seeded(seed) {
  let s = (seed * 2654435761) >>> 0
  return () => {
    s ^= s << 13
    s >>>= 0
    s ^= s >> 17
    s ^= s << 5
    s >>>= 0
    return s / 4294967296
  }
}

/** résumé → resume. 악센트 없이 쳐도 정답으로 인정하려고 쓴다. */
const deaccent = (w) => w.normalize('NFD').replace(/[̀-ͯ]/gu, '')

/**
 * 철자 힌트. vacation → "v _ _ _ _ _ _ _", e-book → "e - _ _ _ _"
 * 글자 수와 하이픈·띄어쓰기 위치까지 보여주므로 답이 하나로 좁혀진다.
 * (한글 뜻만 주면 "휴가"에 vacation·holiday·leave 가 모두 맞아버린다)
 */
function mask(word) {
  return [...word]
    .map((ch, i) => (i === 0 ? ch : /[\p{L}\p{N}]/u.test(ch) ? '_' : ch))
    .join(' ')
}

/** 빈도 순위가 낮을수록(뒤쪽일수록) 어려운 단어로 본다. */
const difficultyOf = (rank) => (rank <= 800 ? 1 : rank <= 1800 ? 2 : 3)

/**
 * 오답 선지 3개. **같은 챕터**에서만 뽑는다 — 빈도대가 비슷한 단어끼리
 * 겨루게 해야 찍어서 맞히기 어렵다. 뜻이 겹치는 단어는 건너뛴다.
 */
function distractors(words, index, answer, rand) {
  const start = Math.floor(index / CHUNK) * CHUNK
  const pool = words.slice(start, start + CHUNK)
  const taken = new Set([answer])
  const out = []

  for (let guard = 0; out.length < 3 && guard < 300; guard += 1) {
    const ko = pool[Math.floor(rand() * pool.length)][2]
    if (taken.has(ko)) continue
    taken.add(ko)
    out.push(ko)
  }
  return out
}

/**
 * 빈도순 목록을 125단어씩 끊어 챕터로 편다. 앞 챕터일수록 자주 나오는 단어다.
 * 마지막 챕터는 125개가 안 될 수 있어서, 이름에 쓰는 범위를 실제 개수에서 끌어온다.
 */
export function buildChapters(list) {
  const count = Math.ceil(list.words.length / CHUNK)
  return Array.from({ length: count }, (_, i) => {
    const from = list.rankOffset + i * CHUNK + 1
    const to = list.rankOffset + Math.min((i + 1) * CHUNK, list.words.length)
    return {
      id: i + 1,
      code: `${list.code}${String(i + 1).padStart(2, '0')}`,
      name: `빈출 ${from}~${to}`,
    }
  })
}

export function buildQuestions(list) {
  const out = []
  const total = list.words.length

  list.words.forEach(([word, pos, ko, en], index) => {
    const rank = list.rankOffset + index + 1
    const chapter = 1 + Math.floor(index / CHUNK)
    const topic = POS_LABEL[pos] ?? pos
    const difficulty = difficultyOf(rank)
    const id = `${list.idPrefix}${String(rank).padStart(4, '0')}`
    const rand = seeded(rank * list.seed)

    const detail =
      `${word} (${topic}) ${ko}` +
      (en ? `\nEN: ${en}` : '') +
      `\n${list.name} 빈출 ${rank}위 / ${list.rankOffset + total}단어`
    const source = `${list.key.toUpperCase()} · 빈출 ${rank}위`

    // ① 영단어 → 뜻 고르기
    const choices = [...distractors(list.words, index, ko, rand), ko]
    for (let i = choices.length - 1; i > 0; i -= 1) {
      const j = Math.floor(rand() * (i + 1))
      ;[choices[i], choices[j]] = [choices[j], choices[i]]
    }
    out.push({
      id: `${id}-m`,
      chapter,
      topic,
      type: 'choice',
      difficulty,
      question: `${word} — 이 단어의 뜻으로 알맞은 것은?`,
      choices,
      answer: [choices.indexOf(ko)],
      explanation: detail,
      source,
    })

    // ② 뜻 → 영단어 쓰기 (암기 카드에도 이쪽이 나간다)
    out.push({
      id: `${id}-s`,
      chapter,
      topic,
      type: 'short',
      difficulty,
      question: `${ko} (${topic}) — 뜻에 해당하는 영단어는?   ${mask(word)}`,
      answer: [...new Set([word, deaccent(word)])],
      explanation: detail,
      source,
    })
  })

  return out
}
