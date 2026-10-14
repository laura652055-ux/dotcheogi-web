/**
 * 과목 레지스트리.
 *
 * 과목을 추가하려면 src/data/subjects/<id>/ 에 meta·chapters·questions 를 만들고
 * 여기 배열에 넣으면 된다. 엔진(채점·저장·통계·라우팅)은 손댈 필요가 없다.
 *
 * meta 가 갖춰야 할 필드는 docs/SUBJECT_SCHEMA.md 참고.
 */

import jeongcheogi from './jeongcheogi/meta.js'
import adsp from './adsp/meta.js'
import toeic from './toeic/meta.js'
import ngsl from './ngsl/meta.js'
import chinese from './chinese/meta.js'

/** 홈의 과목 목록에 이 순서대로 나온다. */
export const SUBJECTS = [jeongcheogi, adsp, toeic, ngsl, chinese]

export const getSubject = (id) => SUBJECTS.find((s) => s.id === id) ?? null

/** 챕터 id → 챕터 객체 */
export const getChapter = (subject, id) =>
  subject.chapters.find((c) => c.id === Number(id)) ?? null

/** 화면에 보일 범위 번호. 묶음마다 번호를 다시 매기는 과목은 챕터에 `no` 를 둔다 */
export const chapterNo = (ch) => ch.no ?? ch.id

/**
 * 범위 목록을 화면용 묶음으로 나눈다. 과락 단위인 parts 와는 별개로 표시만 한다.
 * chapterGroups 가 없는 과목은 이름 없는 묶음 하나로 돌려준다.
 */
export const groupChapters = (subject) =>
  subject.chapterGroups
    ? subject.chapterGroups
        .map((g) => ({ ...g, chapters: subject.chapters.filter((c) => c.group === g.id) }))
        .filter((g) => g.chapters.length > 0)
    : [{ id: null, name: null, desc: null, chapters: subject.chapters }]

/** 챕터가 속한 과목(과락 단위). parts 가 없는 시험이면 null */
export const getPart = (subject, chapterId) => {
  if (!subject.parts) return null
  const ch = getChapter(subject, chapterId)
  return ch ? (subject.parts.find((p) => p.id === ch.part) ?? null) : null
}
