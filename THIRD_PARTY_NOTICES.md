# 제3자 자료 고지

이 저장소의 어휘 과목(TOEIC · 일반 영어 · 중국어 HSK)은 공개 라이선스로 배포되는 자료를
가져와 고쳐서 쓴다. 각 자료의 라이선스가 요구하는 대로 저작자, 원본 주소, 라이선스,
고친 내용을 여기에 적는다. 화면에서도 각 과목 홈 하단에 같은 출처를 띄운다
(각 과목 `meta.js` 의 `sourceLabel`).

## 1. TOEIC Service List (TSL) 1.2

| | |
|---|---|
| 저작자 | Browne, C. & Culligan, B. |
| 원본 | TOEIC Service List 1.2 — https://www.newgeneralservicelist.com/toeic-service-list |
| 라이선스 | Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0) — https://creativecommons.org/licenses/by-sa/4.0/ |
| 쓴 곳 | `src/data/subjects/toeic/words-tsl.js` (1250단어) |
| 화면 표기 | TOEIC Service List 1.2 · Browne & Culligan · CC BY-SA 4.0 (한글 뜻은 직접 작성) |

고친 내용

- 단어마다 **한글 뜻을 직접 작성해 붙였다.** 원본에는 한글 뜻이 없다.
- 원본 영어 정의 가운데 명백히 틀린 넷을 바로잡았다.
  quarterly(원본 "every 4 months" → 분기는 3개월), accessory("partner in crime" → TOEIC 문맥은 부속품),
  jam("push down hard"), skim("move above the surface").
- 그 밖의 단어 · 품사 · 영어 정의와 배열 순서(빈도 순위)는 원본 그대로다.

## 2. New General Service List (NGSL) 1.2

| | |
|---|---|
| 저작자 | Browne, C., Culligan, B. & Phillips, J. |
| 원본 | New General Service List 1.2 — https://www.newgeneralservicelist.com/new-general-service-list |
| 라이선스 | Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0) — https://creativecommons.org/licenses/by-sa/4.0/ |
| 쓴 곳 | `src/data/subjects/ngsl/words-ngsl.js` (1001~2809위, 1809단어) |
| 화면 표기 | New General Service List 1.2 · Browne, Culligan & Phillips · CC BY-SA 4.0 (한글 뜻은 직접 작성) |

고친 내용

- 1001~2809위만 담았다. 1~1000위 기초어는 넣지 않았다.
- 단어마다 **한글 뜻을 직접 작성해 붙였다.** 원본에는 한글 뜻이 없다.
- 원본 자료의 오류 두 건을 바로잡았다.
  2098위 단어가 `FALSE` 로 들어 있던 것(스프레드시트가 단어 "false" 를 불리언 값으로 바꾼 흔적)을
  소문자 false 로 되돌렸고, software 의 정의가 "market for software is expected to expand" 라는
  엉뚱한 예문이라 사전 정의로 바꿨다.

## 3. CC-CEDICT

| | |
|---|---|
| 저작자 | CC-CEDICT (MDBG 발행, CEDICT 원저작자 Paul Andrew Denisowski) |
| 원본 | https://www.mdbg.net/chinese/dictionary?page=cc-cedict |
| 라이선스 | Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0) — https://creativecommons.org/licenses/by-sa/4.0/ |
| 쓴 곳 | `src/data/subjects/chinese/words-hsk1.js` ~ `words-hsk6.js` 의 병음 · 영어 뜻 |
| 화면 표기 | complete-hsk-vocabulary (MIT) · 뜻·병음은 CC-CEDICT · CC BY-SA 4.0 (한글 뜻은 직접 작성) |

아래 4번 complete-hsk-vocabulary 를 거쳐 들어온 자료다.

고친 내용

- 단어마다 **한글 뜻을 직접 작성해 붙였다.** 원본에는 한글 뜻이 없다.
- 다음자(多音字)는 대표 발음을 손으로 골랐다. CC-CEDICT 의 폼 순서는 빈도순이 아니라서
  첫 폼을 그대로 쓰면 听이 "yǐn(고어: 웃다)", 没이 "mò(익사하다)"가 된다.
  폼이 둘 이상인 592개를 전부 보고 50개를 교정했다.
- 긴 영어 뜻은 끝을 줄였다(`…` 로 표시).

## 4. complete-hsk-vocabulary

| | |
|---|---|
| 저작자 | drkameleon (Yanis Zafirópulos) |
| 원본 | https://github.com/drkameleon/complete-hsk-vocabulary |
| 라이선스 | MIT (아래 전문) |
| 쓴 곳 | `src/data/subjects/chinese/words-hsk1.js` ~ `words-hsk6.js` 의 HSK 3.0 1~6급 급별 단어 목록 |

고친 내용

- HSK 3.0 의 1~6급만 담았다. 7~9급은 넣지 않았다.
- 번체는 간체와 다를 때만 채웠다.
- 뜻 · 병음을 고친 내용은 3번(CC-CEDICT)과 같다.

라이선스 전문 (https://github.com/drkameleon/complete-hsk-vocabulary/blob/main/LICENSE)

```text
MIT License

Copyright (c) 2026 Yanis Zafirópulos

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 이 저장소에서 CC BY-SA 4.0 으로 배포하는 파일

`src/data/subjects/toeic/words-tsl.js`, `src/data/subjects/ngsl/words-ngsl.js`,
`src/data/subjects/chinese/words-hsk1.js` ~ `words-hsk6.js` 는 위 자료를 고친 것이며
CC BY-SA 4.0 으로 배포한다. (https://creativecommons.org/licenses/by-sa/4.0/)

이 파일들을 다시 고쳐 배포할 때도 같은 라이선스(CC BY-SA 4.0)를 따르고, 위 저작자 표시와
이 고지를 함께 남겨야 한다. `words-hsk*.js` 는 complete-hsk-vocabulary 의 MIT 고지(위 전문)도
함께 남긴다.

## 참고 — 저장소에 들어 있지 않은 것

- 도트 폰트 [Galmuri](https://github.com/quiple/galmuri)(SIL OFL)는 저장소에 넣지 않고 실행할 때
  CDN 에서 불러온다 (`index.html`).
- npm 의존성은 `npm ci` 로 따로 설치하며, 각 패키지의 라이선스를 따른다.
