import { LEVELS, chapterStart, chunkOf } from './chapters.js'

/**
 * 중국어 HSK 어휘 문항.
 *
 * TOEIC 과 같이 문항을 손으로 적지 않고 **단어 목록에서 생성한다.**
 * 5363단어에 문항을 두 개씩 손으로 쓰면 10726개를 베껴 적는 셈이라 실수가 끼고,
 * 단어 하나를 고칠 때마다 두 군데를 고쳐야 한다.
 *
 * 단어 하나에서 문항 두 개가 나온다. 중국어는 **글자와 소리가 분리돼 있어서**
 * 두 방향을 따로 묻는다.
 *   · choice (h10002-m) 한자 → 뜻 고르기.  독해에 필요한 **의미 인지**
 *   · short  (h10002-p) 한자 → 병음 쓰기.  듣기·말하기에 필요한 **발음**
 *
 * 뜻 → 한자 쓰기는 만들지 않았다. 한자를 입력하려면 중국어 IME 가 필요한데
 * 그건 어휘 지식이 아니라 입력기 문제라서 채점이 학습과 무관해진다.
 *
 * 병음 문항에는 **한자와 한글 뜻을 같이 준다.** 다음자(多音字)가 있어서
 * 한자만 주면 어느 발음을 묻는지 정해지지 않기 때문이다. (行 xíng / háng)
 *
 * 암기(카드) 모드는 short/code 만 카드로 넘기므로 (src/lib/quiz.js)
 * 카드를 넘길 땐 자동으로 "한자+뜻 → 병음" 쪽만 나온다.
 *
 * ── 문항 id 는 절대 바꾸지 말 것 ──────────────────────────────
 * id 가 진도·오답의 저장 키다 (localStorage). 생성 규칙을 바꾸면 사용자의
 * 오답 노트가 통째로 날아간다. id 는 <급 접두사><급 안의 순위 4자리><방향> 이고
 * 순위는 배열 위치에서 나오므로, 단어를 추가할 땐 그 급의 목록 **뒤에** 붙인다.
 * 중간에 끼워 넣으면 그 뒤 단어의 id 가 전부 밀린다.
 */

/** 중국어 품사 태그(ICTCLAS 계열) → 한국어. 통계 화면에서 묶는 단위다. */
const POS_LABEL = {
  n: '명사', v: '동사', vn: '동명사', a: '형용사', an: '명사성 형용사',
  ad: '부사성 형용사', d: '부사', q: '양사', qv: '양사', qt: '시간 양사',
  mq: '수량사', r: '대사', p: '개사', c: '접속사', cc: '접속사', m: '수사',
  u: '조사', y: '어기조사', t: '시간사', tg: '시간 어소', f: '방위사',
  s: '처소사', b: '구별사', z: '상태사', l: '관용구', o: '의성어', e: '감탄사',
  h: '접두 성분', k: '접미 성분', g: '어소', nr: '인명', ns: '지명',
  nt: '기관명', nz: '고유명사', Mg: '수사 어소',
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

/**
 * 병음 표기 흔들림 흡수.
 *
 * 학습자가 실제로 치는 방식이 네 가지쯤 된다. 넷 다 정답으로 받는다.
 *   ài hào(성조 부호) · ai hao(무성조) · ai4hao4(숫자 성조) · nv(ü 를 v 로)
 *
 * 성조 부호는 NFD 로 풀면 결합 문자(U+0300·0301·0304·030C)로 떨어진다.
 * ü 의 분음 부호(U+0308)는 성조가 아니므로 따로 다룬다 — 같이 지우면
 * lǜ(초록)와 lù(길)가 한 글자가 돼서 채점이 헐거워진다... 고 하고 싶지만
 * 채점기(src/lib/grade.js)가 어차피 관대한 쪽이라 무성조 표기는 받아준다.
 */
const TONE = /[\u0300\u0301\u0304\u030c]/gu
const TONE_NUM = { '\u0304': 1, '\u0301': 2, '\u030c': 3, '\u0300': 4 }

const deTone = (w) => w.normalize('NFD').replace(TONE, '').normalize('NFC')
const deUmlaut = (w) => w.normalize('NFD').replace(/\u0308/gu, '').normalize('NFC')
const toV = (w) => w.normalize('NFD').replace(/u\u0308/gu, 'v').normalize('NFC')

/** ài hào → ai4hao4 (경성은 5). 성조를 숫자로 치는 학습자가 많다. */
function numeric(py) {
  return py
    .split(' ')
    .map((syllable) => {
      const decomposed = syllable.normalize('NFD')
      let tone = 5
      for (const [mark, n] of Object.entries(TONE_NUM)) {
        if (decomposed.includes(mark)) tone = n
      }
      return deTone(syllable) + tone
    })
    .join('')
}

/**
 * 한 단어의 허용 병음 표기 전부.
 *
 * ü 는 성조 부호가 있든 없든, 숫자 성조를 붙이든 안 붙이든 받아야 한다.
 * nǚ 하나에 nü · nu · nv · nu3 · nv3 … 이 전부 같은 답이다.
 */
function accepted(py) {
  const bare = deTone(py)
  const num = numeric(py)
  const forms = [py, bare, num, num.replace(/5/g, '')]
  return [
    ...new Set(forms.flatMap((f) => [f, deUmlaut(f), toV(f)])),
  ]
}

/** 급이 올라갈수록 어려운 단어로 본다. */
const difficultyOf = (level) => (level <= 2 ? 1 : level <= 4 ? 2 : 3)

/**
 * 오답 선지 3개. **같은 챕터**에서만 뽑는다 — 빈도대가 비슷한 단어끼리
 * 겨루게 해야 찍어서 맞히기 어렵다. 뜻이 겹치는 단어는 건너뛴다.
 */
function distractors(words, index, answer, chunk, rand) {
  const start = Math.floor(index / chunk) * chunk
  const pool = words.slice(start, start + chunk)
  const taken = new Set([answer])
  const out = []

  for (let guard = 0; out.length < 3 && guard < 300; guard += 1) {
    const ko = pool[Math.floor(rand() * pool.length)][3]
    if (taken.has(ko)) continue
    taken.add(ko)
    out.push(ko)
  }
  return out
}

function build() {
  const out = []

  for (const lv of LEVELS) {
    const base = chapterStart(lv.level)
    const chunk = chunkOf(lv.words)
    const total = lv.words.length

    lv.words.forEach(([hanzi, pinyin, pos, ko, en, traditional], index) => {
      const rank = index + 1
      const chapter = base + Math.floor(index / chunk)
      const topic = POS_LABEL[pos] ?? '기타'
      const difficulty = difficultyOf(lv.level)
      const id = `${lv.idPrefix}${String(rank).padStart(4, '0')}`
      const rand = seeded(rank * (lv.level + 1))

      const detail =
        `${hanzi}${traditional ? ` [${traditional}]` : ''} ${pinyin} (${topic}) ${ko}` +
        (en ? `\nEN: ${en}` : '') +
        `\nHSK ${lv.level}급 빈출 ${rank}위 / ${total}단어`
      const source = `HSK 3.0 ${lv.level}급 · 빈출 ${rank}위`

      // ① 한자 → 뜻 고르기
      const choices = [...distractors(lv.words, index, ko, chunk, rand), ko]
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
        question: `${hanzi} — 이 단어의 뜻으로 알맞은 것은?`,
        choices,
        answer: [choices.indexOf(ko)],
        explanation: detail,
        source,
      })

      // ② 한자 → 병음 쓰기 (암기 카드에도 이쪽이 나간다)
      out.push({
        id: `${id}-p`,
        chapter,
        topic,
        type: 'short',
        difficulty,
        question: `${hanzi} (${ko}) — 병음을 쓰시오.   성조 부호 없이 ai hao / ai4hao4 로 써도 정답`,
        answer: accepted(pinyin),
        // 허용 표기는 9개까지 늘어나지만 화면에는 대표 표기 하나만 보여준다
        answerLabel: pinyin,
        explanation: detail,
        source,
      })
    })
  }

  return out
}

export const QUESTIONS = build()

/** 출처가 분명한 공개 어휘 목록이라 샘플이 아니다. */
export const IS_SAMPLE_DATA = false

export const SOURCE_URL = 'https://github.com/drkameleon/complete-hsk-vocabulary'
