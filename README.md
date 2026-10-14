# 닷처기 (dotcheogi)

자격증 **문제풀이** 사이트. 순수 흑백 도트 디자인.

문제를 풀고, 틀린 것만 다시 보고, 어디가 약한지 본다.

## 지금 들어 있는 과목

| 과목 | 범위 | 합격 기준 |
|---|---|---|
| 정보처리기사 실기 | 빈틈 문제 1개 범위 (49문항) | 총점 60점 |
| ADsP (데이터분석 준전문가) | 3과목 8챕터 (37문항) | 총점 60점 **+ 과목별 40% 과락** |
| TOEIC 필수 어휘 | 빈출순 10개 범위 (1250단어) | 합격선 없음 (기준선 80%) |
| 일반 영어 필수 어휘 | 빈출순 15개 범위 (1809단어) | 합격선 없음 (기준선 80%) |
| 중국어 HSK 3.0 어휘 | 1~6급 48개 범위 (5363단어) | 합격선 없음 (기준선 80%) |

> **영어 어휘 두 과목은 합격/불합격을 가리는 과목이 아니다.** 단어를 쌓는 과목이라
> 결과 화면의 80% 는 시험 합격선이 아니라 "이 범위는 뗐다"고 볼 기준선이다.
>
> 단어 목록은 CC BY-SA 4.0 으로 공개된 코퍼스 기반 빈도 목록 두 개를 쓴다.
> TOEIC 은 [TSL 1.2](https://www.newgeneralservicelist.com/toeic-service-list) 1250단어(T01~T10),
> 일반 영어는 [NGSL 1.2](https://www.newgeneralservicelist.com/new-general-service-list) 의
> 1001~2809위 1809단어(G01~G15). 둘은 한 단어도 겹치지 않고, 합치면 최신 TOEIC 의
> 98.5% 를 덮는다. 문항은 손으로 적지 않고 단어 목록에서 생성한다.
>
> 원래는 TOEIC 한 과목에 둘이 같이 들어 있었다. 따로 떼면서 문항 id 는 그대로
> 두었고, TOEIC 기록에 섞여 있던 일반 영어 진도·오답은 처음 열 때 새 과목으로
> 옮겨진다. ([src/lib/storage.js](src/lib/storage.js) 의 `splitOff`)
>
> **한글 뜻은 원본에 없어서 직접 작성했다.** 공개된 한국어 번역본은 링크가 끊겨
> 구할 수 없었다. 라이선스가 저작자 표시를 요구하므로 출처를 화면에서 지우지 않는다.
> 저작자 · 원본 주소 · 고친 내용은 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) 에 모아 두었다.

> **HSK 는 TOEIC 과 같은 성격이다.** 합격/불합격이 아니라 어휘량을 쌓는 과목이라
> 80% 는 "이 범위는 뗐다"고 볼 기준선이다.
>
> 단어는 [complete-hsk-vocabulary](https://github.com/drkameleon/complete-hsk-vocabulary)(MIT)
> 의 HSK 3.0 급별 목록을 쓴다. **급수 순으로, 급 안에서는 출현 빈도순으로** 배열해서
> 1급부터 순서대로 풀면 그게 곧 시험 순서이자 효율 순서가 되게 했다.
> 뜻·병음은 [CC-CEDICT](https://www.mdbg.net/chinese/dictionary?page=cc-cedict)(CC BY-SA 4.0)
> 에서 온 것이라 출처를 화면에서 지우지 않는다. MIT 라이선스 전문과 CC BY-SA 고지는
> [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) 에 있다.
>
> **HSK 3.0 이다 (구 HSK 2.0 과 급별 어휘가 다르다).** 3.0 에는 7~9급도 있지만
> 그 한 급만 5606단어라 양이 급격히 뛰어서 넣지 않았다.
>
> **한글 뜻 5363개는 직접 작성했다.** 쓸 만한 중국어–한국어 공개 사전 데이터를
> 찾지 못했다. 국립국어원 개방 데이터는 한국어 → 중국어 방향이라 역매핑이 지저분하다.
>
> **다음자(多音字)의 대표 발음은 손으로 골랐다.** CC-CEDICT 의 폼 순서는 빈도순이
> 아니라서 첫 폼을 그냥 쓰면 听이 "yǐn(고어: 웃다)", 没이 "mò(익사하다)", 年이
> "nián(곡식)"이 된다. 폼이 둘 이상인 592개를 전부 눈으로 보고 50개를 교정했다.
> 교정한 발음은 단어 파일(`src/data/subjects/chinese/words-hsk*.js`)에 반영돼 있다.

> **정처기 문항은 14번 '빈틈 문제' 49문항이다.** 최근 실기에 나온 주제 가운데 공부할 때
> 빠뜨리기 쉬운 것을 골라 메우는 범위로, 서브넷·CIDR 계산(2026년 1회 1문제, 2회 2문제),
> 해시 함수, DB 설계 단계, SQL 제약조건·무결성, 리눅스 링크·권한,
> 자료구조(스택·큐·트리 순회)를 다룬다.
> **AI 가 출제 주제를 보고 새로 작성한 문항**이라 각 문항 `source` 에 그렇게 적었고,
> 검증되지 않았으므로 ADsP 처럼 과목 카드에 `미검증` 배지를, 홈에 안내 배너를 띄운다.
> 서브넷·권한·스택·큐·트리 순회처럼 계산으로 답이 정해지는 문항만 스크립트로 다시
> 계산해 맞춰 봤다.
> ([src/data/subjects/jeongcheogi/gap-questions.js](src/data/subjects/jeongcheogi/gap-questions.js))
>
> 용어 단답(범위 1~12)과 코드 해석(범위 13) 자리는 남아 있지만, 이 공개 저장소에는
> 그 문항이 없어서 범위 목록에 나오지 않는다. 직접 만든 문항을
> [questions.js](src/data/subjects/jeongcheogi/questions.js) 에 채우면 그 범위가 다시 보인다.
> 전체 범위 모의고사(20문항)는 용어 암기 범위(1~12)를 빼고 뽑는다 — 용어 문항은 시험과
> 생김새가 달라 섞으면 모의고사가 실전보다 쉬워진다. 지금은 빈틈 문제 49문항 가운데
> 20문항이 나온다.

> **ADsP 문항은 기출이 아니다.** 출제 범위를 보고 AI 가 작성한 37문항이라
> 검증되지 않았고 내용이 틀릴 수 있다. 홈 배너와 각 문항의 `source` 에 그렇게
> 표기해 두었다. 실제 공부에는 검증된 자료로 교체해야 한다.

## 곁다리 — 영어

자격증 과목과 별개로 영어 학습용 화면이 세 개 있다. **과목이 아니다** —
문항도 채점도 없고 `SubjectShell` 밖에 있다. 문제 엔진(`src/lib/grade·score·quiz`)은
이 화면들을 모른다.

| 경로 | 무엇 | 기록 |
|---|---|---|
| `/routine` | 평일·주말 블록 체크 + 오늘의 셀프토크 질문 | 체크한 블록 |
| `/notes` | 들은 표현을 내 문장으로 바꿔 모으는 노트 | 적은 덩어리 |
| `/listening` | 쉐도잉·팟캐스트 유튜브 채널 모음 | 없음 |

루틴이 저렇게 생긴 이유는 [src/data/routine.js](src/data/routine.js) 맨 위에
적어뒀다. 요약하면 **회화 병목은 인풋이 아니라 아웃풋 경험 부족**이라
인풋:아웃풋을 5:5로 두고, "막힘 → 채우기 → 재발화" 사이클을 매일 한 번
강제하는 구조다.

### 셀프토크 질문 90개

OPIc 기출 주제를 난이도 순으로 배치했다. 1–30 사실 서술 / 31–60 경험·이유 /
61–90 비교·의견·가정 + 롤플레이.

질문 번호는 **달력 날짜가 아니라 셀프토크를 실제로 체크한 날의 수**로 센다.
하루 걸러도 질문이 건너뛰어지지 않고, 그냥 들어와서 구경만 한 날에 질문이
소모되지도 않는다.

### 듣기 링크

채널 19개 전부 핸들(`@handle`) 주소이고, 공식 사이트·위키·채널 자체 메타데이터로
교차 검증했다. **핸들은 채널명으로 짐작하면 안 된다** — 실제로 두 군데가 함정이었다.

| 채널 | 맞는 핸들 | 함정 |
|---|---|---|
| Easy English | `@EasyEnglishVideos` | `@easyenglish551` 은 구독자 458만의 전혀 다른 문법 강의 채널 |
| Super Eyepatch Wolf | `@supereyepatchwolf0` | 꼬리표 없는 `@SuperEyepatchWolf` 는 구독자 14명짜리 무관한 채널 |

Easy English 는 현재 유튜브 표시 이름이 "Easy British English" 라 들어가면 이름이
달라 보이지만 맞는 채널이다(Mitch & Isi 의 브라이턴 길거리 인터뷰).

링크가 깨지면 채널명으로 짐작해 고치지 말고 공식 사이트에서 확인할 것.

과목을 더 붙이는 방법은 [docs/SUBJECT_SCHEMA.md](docs/SUBJECT_SCHEMA.md).
엔진은 과목을 모르므로 데이터 폴더 하나만 추가하면 된다.

## 스택

| | |
|---|---|
| 프레임워크 | React 19 + Vite |
| 라우팅 | react-router-dom 7 |
| 저장소 | localStorage (서버 없음) |
| 폰트 | [Galmuri](https://github.com/quiple/galmuri) — 한글 도트 폰트 (SIL OFL) |
| 배포 | Vercel |

## 실행

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # dist/
npm run preview
npm run lint
```

## 구조

경로 첫 칸이 과목이다. `/adsp/quiz/study/7`

```
src/
├─ data/
│  ├─ shared.js            문제 유형 · 학습 모드 (과목 공통)
│  ├─ listening.js         영어 듣기 자료 링크 (과목 아님)
│  ├─ routine.js           영어 루틴 블록 + 셀프토크 90문 (과목 아님)
│  └─ subjects/
│     ├─ index.js          과목 레지스트리 ← 과목 추가는 여기 한 줄
│     ├─ jeongcheogi/      meta · chapters · questions + gap-questions
│     ├─ adsp/             meta · chapters · questions
│     ├─ toeic/            meta · chapters · questions + words-tsl
│     ├─ ngsl/             meta · chapters · questions + words-ngsl
│     └─ chinese/          meta · chapters · questions + words-hsk1~6
├─ lib/
│  ├─ grade.js             채점 (유형별 + 표기 흔들림 흡수)
│  ├─ score.js             합격 판정 (총점 + 과목별 과락)
│  ├─ storage.js           localStorage 읽기/쓰기 + 통계 파생
│  └─ quiz.js              모드별 문제 묶음 생성
├─ components/
│  ├─ SubjectShell.jsx     URL 의 과목을 해석해 학습 기록을 주입
│  ├─ Mascot.jsx           16x16 도트 마스코트 "칩이" (표정 4종)
│  ├─ Pixel.jsx            Box / Btn / Badge / Bar / CodeBlock
│  ├─ QuestionCard.jsx
│  ├─ Flashcard.jsx
│  ├─ EnglishNav.jsx       영어 세 화면을 오가는 탭
│  └─ Layout.jsx
├─ pages/                  Subjects · Home · Select · Quiz · Result · Stats
│                          + Routine · Notes · Listening (영어 곁다리)
├─ styles/
│  ├─ tokens.css           2색 팔레트 + 도트 격자 + 디더링 패턴
│  ├─ base.css             리셋 + 도트 렌더링
│  └─ pixel.css            도트 UI 컴포넌트
├─ store.jsx               과목 하나의 학습 기록 (Context)
└─ settings.jsx            과목 무관 전역 설정 (흑백 반전)
```

`src/lib/` 아래 어느 파일도 특정 과목을 import 하지 않는다. 항상 `subject` 를
인자로 받는다. 과목이 늘어나도 엔진은 그대로다.

## 학습 모드

| 모드 | 동작 |
|---|---|
| 학습 | 문항 순서대로. 한 문제씩 풀고 즉시 해설 |
| 모의고사 | 과목마다 정한 문항 수만큼 랜덤 출제. 마지막에 한 번에 채점 |
| 오답 | 틀렸던 문제만. 맞히면 목록에서 빠진다 |
| 암기 | 카드 뒤집기. 입력 없이 O/X 자가 체크 |

모의고사는 과목이 `examPlan` 을 갖고 있으면 **과목별 배분을 지켜** 뽑는다.
해당 과목 문제가 배분보다 적으면 있는 만큼만 낸다 — 모자란 걸 다른 과목에서
채우면 과목별 점수가 왜곡되기 때문이다.

## 문제 유형

`short` 단답형 · `blank` 빈칸 · `choice` 객관식 · `code` 코드 실행결과 · `essay` 약술형

스키마는 [docs/QUESTION_SCHEMA.md](docs/QUESTION_SCHEMA.md).

## 디자인 규칙

**색은 검정과 흰색 두 개뿐이다.** 회색이 필요하면 색을 쓰지 말고 디더링
(체커보드 패턴)으로 만든다. `tokens.css` 의 `.dither-25 / -50 / -75` 를 쓴다.

- 모든 간격·테두리는 `--dot`(4px) 배수
- `border-radius` 는 전역에서 0으로 막아둠
- 그림자는 blur 없는 하드 오프셋만
- 마스코트·아이콘은 SVG + `shape-rendering: crispEdges`
- 헤더의 ● 버튼으로 흑백 반전 (CSS 변수 두 개만 뒤집힌다)

## PDF 넣기

`content/` 에 PDF 를 두고 [docs/PDF-변환가이드.md](docs/PDF-변환가이드.md) 참고.
`content/` 는 gitignore 되어 있어 PDF 원본은 커밋되지 않는다.
남의 자료에서 만든 문항은 공개 저장소에 커밋하지 않는다 — PDF 에서 옮긴 문항은
직접 만든 자료에서 나온 것만 커밋한다.

## 배포

이 저장소에는 배포 자동화(CI)가 들어 있지 않다. `npm run build` 로 만든 `dist/` 를
정적 호스팅에 올리면 된다.

`vercel.json` 에 Vercel 용 설정이 들어 있다. SPA 리라이트가 걸려 있어서
`/adsp/quiz/study/8` 같은 경로를 새로고침해도 404가 나지 않고, 모든 응답에
`X-Robots-Tag: noindex, nofollow, noarchive` 헤더를 붙인다. 다른 호스팅에 올리면
이 두 가지를 그쪽 설정으로 옮겨야 한다.

## 알아둘 것

학습 기록은 **이 브라우저의 localStorage에만** 있고, **과목별로 분리**된다.

```
dotcheogi.<과목id>.v1   과목별 기록
dotcheogi.english.v1    영어 루틴 체크 + 덩어리 노트 (과목과 무관)
dotcheogi.settings.v1   흑백 반전 등 전역 설정
```

브라우저를 바꾸거나 사이트 데이터를 지우면 진도가 사라진다. 기기 간 동기화가
필요하면 그때 백엔드를 붙여야 한다.

과목이 하나뿐이던 시절의 키(`dotcheogi.v1`)는 처음 실행할 때 정처기 기록으로
자동 승격된다. 원본은 지우지 않고 남겨둔다.
