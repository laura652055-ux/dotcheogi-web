# 문제 데이터 스키마

문제는 과목마다 `src/data/subjects/<id>/questions.js` 의 `QUESTIONS` 배열에
들어간다. 정처기는 빈틈 문제를 `gap-questions.js` 에 따로 두고 `meta.js` 에서 합치고,
어휘 과목(TOEIC · 일반 영어 · HSK)은 문항을 손으로 적지 않고 단어 목록에서 만들어 낸다.

과목 자체를 추가하는 방법은 [SUBJECT_SCHEMA.md](SUBJECT_SCHEMA.md) 참고.

## 공통 필드

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| `id` | string | O | `ch01-001` 형식. **중복 금지** — 진도/오답 저장 키로 쓰인다 |
| `chapter` | number | O | 같은 과목 `chapters.js` 의 챕터 id |
| `topic` | string | O | 세부 주제. 통계 화면에서 묶는 단위 |
| `type` | string | O | `short` / `blank` / `choice` / `code` / `essay` |
| `difficulty` | 1\|2\|3 | O | 1 쉬움 · 3 어려움 |
| `question` | string | O | 문제 본문 |
| `answer` | — | O | 유형마다 형식이 다르다 (아래) |
| `explanation` | string | | 해설. `\n` 으로 줄바꿈 |
| `source` | string | O | 문제 출처. 해설 아래에 `출처 · …` 로 그대로 보인다. 직접 작성했거나 AI 가 만든 문제는 그렇게 밝힌다 (`AI 작성 · 미검증` 등). [SUBJECT_SCHEMA.md](SUBJECT_SCHEMA.md) 의 '문제의 출처를 밝힐 것' |
| `strict` | boolean | | `true` 면 공백까지 정확히 맞아야 정답 |

## 선택 필드

| 필드 | 타입 | 설명 |
|---|---|---|
| `code` | `{ lang, body }` | 코드 블록. `body` 의 줄바꿈·공백은 그대로 보인다. `lang` 은 블록 위 머리표(대문자로 표시)로만 쓰이고 문법 강조나 채점에는 쓰이지 않는다. 코드는 `c` / `java` / `python` / `sql`, 코드가 아닌 내용은 `shell`(명령어·출력) · `tree`(트리 그림) · `text`(글) · `table`(표)처럼 내용에 맞는 이름을 붙인다 |
| `choices` | string[] | 객관식 선택지 |
| `bank` | string[] | 실기 `<보기>` 상자에 뿌릴 용어들 |
| `keywords` | string[] | 약술형 자가채점 체크리스트 |
| `answerLabel` | string | 화면에 보여줄 정답 표기. 허용 표기가 많을 때만 쓴다 |

## 유형별 `answer` 형식

### `short` — 단답형

허용 표기를 전부 배열에 넣는다. **하나만 일치해도 정답.**

```js
answer: ['제3정규형', '3정규형', '3NF']
```

### `code` — 코드 실행 결과

`short` 와 동일. 출력에 공백이 의미 있으면 `strict: true` 를 같이 준다.

```js
code: { lang: 'c', body: 'int a = 3;\nprintf("%d", a);' },
answer: ['3']
```

### `blank` — 빈칸 채우기

**배열의 배열.** 빈칸 순서대로, 각 칸마다 허용 표기 배열.
전부 맞아야 정답이고, 화면에는 칸별로 O/X 가 표시된다.

```js
answer: [['DISTINCT'], ['WHERE', '조건절']]
```

### `choice` — 객관식

정답 **인덱스** 배열(0부터). 복수정답도 가능.

```js
choices: ['동치 분할', '경계값 분석', '기초 경로 검사'],
answer: [2]
```

### `essay` — 약술형

자동 채점하지 않는다. 모범답안 전문을 넣고, `keywords` 로 자가채점을 돕는다.
사용자가 답을 쓰면 어떤 키워드가 들어갔는지 체크해 주고, O/X 는 본인이 누른다.

```js
answer: ['개념: ... / 대응 방안: ①... ②...'],
keywords: ['입력값 검증', 'PreparedStatement', '권한 최소화']
```

## 채점 규칙

기본 채점은 **문자와 숫자만 남기고** 비교한다 (`src/lib/grade.js` 의 `normalize`).
과목과 무관하게 같은 규칙이 적용된다.

- 대소문자 무시 → `json` = `JSON`
- 공백 무시 → `기능 모델링` = `기능모델링`
- 기호 무시 → `조건/결정 커버리지` = `조건결정커버리지`

필답형 답안은 표기가 심하게 흔들리기 때문에 이렇게 관대하게 잡았다.
공백까지 정확해야 하는 문제만 `strict: true` 로 예외 처리한다.

숫자 답에는 이 규칙이 맞지 않는다. `3.14` 와 `3.140` 이 다른 답이 된다.
전기기사처럼 계산 문제가 많은 과목을 붙이려면 `numeric` 유형과 오차 허용치를
먼저 만들어야 한다.
