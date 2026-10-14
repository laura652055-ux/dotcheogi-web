# 과목 스키마

과목 하나는 `src/data/subjects/<id>/` 폴더 하나다. 엔진(채점·저장·통계·라우팅)은
과목을 모른다. 아래 세 파일만 채우고 레지스트리에 등록하면 나머지는 굴러간다.

```
src/data/subjects/<id>/
├─ meta.js        시험 규칙 + 브랜딩          ← 여기가 핵심
├─ chapters.js    출제 범위 (+ 과목별 과락이 있으면 PARTS)
└─ questions.js   문제 배열 (docs/QUESTION_SCHEMA.md)
```

등록은 [src/data/subjects/index.js](../src/data/subjects/index.js) 의 `SUBJECTS`
배열에 import 해서 넣는 것으로 끝난다. 홈 화면의 과목 목록 순서가 이 배열 순서다.

## `meta.js`

기본 export 하나. 필드는 아래와 같다.

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| `id` | string | O | URL 첫 칸이자 저장 키. `/adsp/quiz/exam` |
| `name` | string | O | 짧은 이름. 과목 홈의 큰 로고에 쓴다 |
| `fullName` | string | O | 정식 명칭. 헤더와 탭 제목 |
| `tagline` | string | O | 출제 유형 한 줄 |
| `blurb` | string | O | 과목 선택 화면의 설명 한 줄 |
| `passScore` | number | O | 총점 합격선 (%) |
| `partPassRate` | number \| null | O | 과목별 과락 기준 (%). 없으면 `null` |
| `examSize` | number | O | 모의고사 문항 수 |
| `examPlan` | array \| null | O | 과목별 문항 배분. 없으면 `null` |
| `parts` | array \| null | O | 과락 단위. 없으면 `null` |
| `chapters` | array | O | `chapters.js` 의 `CHAPTERS` (정처기는 문항이 있는 범위만 추려서 넣는다) |
| `questions` | array | O | `questions.js` 의 `QUESTIONS` (정처기는 `gap-questions.js` 의 빈틈 문제를 합친 배열) |
| `isSample` | boolean | O | 홈 상단 안내 배너를 띄울지 |
| `sampleBadge` | string | | 과목 선택 화면 카드에 붙는 짧은 배지 (`샘플` / `미검증`) |
| `sampleLabel` | string | | 배너 제목에 들어갈 문제 성격 (`샘플 문제` / `검증되지 않은 AI 작성 문제`) |
| `sampleNote` | string | | 그 배너에 넣을 안내 문구 |
| `sourceLabel` | string | | 홈 하단에 `문제 출처 · …` 로 띄우는 출처 표기. **남의 자료를 쓰는 과목은 필수** — 라이선스가 요구하는 저작자 표시를 화면에서 지우지 않는다 |
| `sourceUrl` | string | | `sourceLabel` 에 걸 원본 주소. 있으면 출처 표기가 링크가 된다 |
| `chapterLabel` | string | O | 통계 화면에서 챕터를 뭐라 부를지 (`챕터` / `범위`) |
| `scoreNote` | string | O | 결과 화면에 고정으로 띄울 합격 기준 안내 |
| `chapterGroups` | array | | 범위 목록을 묶어 보여줄 제목들 `{ id, name, desc }`. 챕터의 `group` 과 짝. 과락 단위인 `parts` 와 달리 표시만 한다 |
| `examChapters` | number[] | | 범위를 안 고른 모의고사가 뽑을 챕터. 없으면 전체 문항에서 뽑는다 |

## 과락이 있는 시험

ADsP·컴활처럼 **총점을 넘겨도 한 과목이 기준 미만이면 탈락**하는 시험은
총점 하나만 보여주면 거짓말이 된다. 그래서 두 가지를 더 채운다.

**1. `chapters.js` 에 `PARTS` 를 두고, 챕터마다 `part` 를 붙인다.**

```js
export const PARTS = [
  { id: 1, code: 'I',  name: '데이터 이해',     count: 10, points: 20 },
  { id: 2, code: 'II', name: '데이터 분석 기획', count: 10, points: 20 },
]

export const CHAPTERS = [
  { id: 1, part: 1, code: 'DATA', name: '데이터의 이해' },
  { id: 4, part: 2, code: 'PLAN', name: '데이터 분석 기획의 이해' },
]
```

**2. `meta.js` 에 `partPassRate` 와 `examPlan` 을 채운다.**

```js
partPassRate: 40,
examPlan: [
  { part: 1, count: 10 },
  { part: 2, count: 10 },
],
```

이러면 자동으로 이렇게 동작한다.

- 모의고사가 과목별 배분을 지켜 뽑는다. 해당 과목 문제가 배분보다 적으면
  **있는 만큼만** 낸다 — 모자란 걸 다른 과목에서 채우면 과목별 점수가 왜곡된다.
- 결과 화면에 과목별 집계 박스가 생기고, 기준 미만 과목에 `과락` 배지가 붙는다.
- 총점을 넘겨도 과락이 하나라도 있으면 불합격으로 판정한다.
- 통계 화면에 과목별 누적 정답률이 뜨고, 기준 미만이면 `과락권` 배지가 붙는다.
- 범위 선택 화면의 챕터 목록이 과목 단위로 묶인다.

이번 세션에 **한 문제도 안 나온 과목은 판정에서 뺀다.** 그러지 않으면 챕터
하나만 골라 푼 학습 모드가 전부 탈락으로 뜬다.

정처기 실기처럼 과락이 없는 시험은 `parts` / `partPassRate` / `examPlan` 을
전부 `null` 로 두면 된다. 그러면 결과 화면도 총점 하나만 보여준다.

과락은 없지만 범위 성격이 여럿인 시험(정처기: 빈틈 문제 / 용어 암기)은
챕터에 `group` 을 달고 `meta.js` 에 `chapterGroups` 를 두면 범위 선택·통계 화면이
그 묶음으로 나뉜다. 범위가 하나도 없는 묶음은 제목까지 숨는다 — 정처기는 문항이 없는
범위를 `meta.js` 에서 빼 두어서, 이 공개 저장소에서는 용어 암기 묶음이 보이지 않는다.
묶음마다 번호를 다시 매기려면 챕터에 `no` 를 둔다 — 화면에만 쓰이고 저장·URL 은
계속 `id` 를 쓴다.

## 저장 키

과목마다 학습 기록이 완전히 분리된다.

```
dotcheogi.<subjectId>.v1   과목별 기록 (records / wrongIds / sessions / days)
dotcheogi.settings.v1      과목 무관 설정 (흑백 반전)
```

과목 분리 이전의 단일 키 `dotcheogi.v1` 은 정처기 기록으로 한 번 승격된 뒤에도
지워지지 않고 남는다. ([src/lib/storage.js](../src/lib/storage.js) 의 `migrateLegacy`)

## 문제의 출처를 밝힐 것

각 문항의 `source` 는 해설 하단에 그대로 노출된다. 어디서 온 문제인지 반드시
채운다. 특히 **직접 작성했거나 AI 가 만든 문제는 그렇게 밝힌다.**

```js
source: '직접 작성'              // 직접 만든 문제
source: 'AI 작성 · 미검증'       // 검증 안 된 생성 문제
```

공부용 자료에서 틀린 내용은 그냥 쓸모없는 정도가 아니라 해롭다. 출처가 비어
있으면 쓰는 사람이 그걸 판단할 방법이 없다. `isSample` / `sampleBadge` /
`sampleLabel` 도 같은 이유로 존재한다.

남의 저작물(유료 교재, 남이 만든 정리본·문제 모음 등)과 거기서 만든 문항은 **공개
배포되는 과목에 넣지 않는다.** 개인 자료로 혼자 쓰려면 배포에서 제외되는 경로를
따로 만들어야 한다. 공개 라이선스로 배포되는 자료(어휘 과목의 단어 목록 등)는
라이선스 조건을 지킬 때만 쓰고, 저작자를 `sourceLabel` 과
[THIRD_PARTY_NOTICES.md](../THIRD_PARTY_NOTICES.md) 에 밝힌다.

## 새 유형이 필요할 때

전기기사처럼 계산 문제가 많은 시험은 지금 스키마로 부족하다. 채점기가
`3.14` 와 `3.140` 을 다른 답으로 보기 때문이다. 그런 과목을 붙일 때는
`numeric` 유형과 오차 허용치를 [src/lib/grade.js](../src/lib/grade.js) 에
먼저 추가해야 한다. 수식·회로도도 마찬가지로 렌더링 수단이 따로 필요하다.
