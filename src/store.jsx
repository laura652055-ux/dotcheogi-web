/**
 * 과목 하나의 학습 기록 전역 상태. localStorage 와 동기화한다.
 *
 * 과목마다 저장 키가 다르므로, 과목이 바뀌면 SubjectShell 이 이 Provider 를
 * key 로 다시 마운트시킨다. 그래서 여기서는 subject 가 도중에 바뀌지 않는다고
 * 가정해도 된다.
 */

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import * as db from './lib/storage.js'

const StoreContext = createContext(null)

export function StoreProvider({ subject, children }) {
  const [state, setState] = useState(() => db.load(subject.id))

  // 상태가 바뀔 때마다 통째로 저장한다. 데이터가 작아서 diff 할 이유가 없다.
  useEffect(() => {
    db.save(subject.id, state)
  }, [subject.id, state])

  const api = useMemo(
    () => ({
      subject,
      state,
      recordResult: (qid, correct) => setState((s) => db.applyResult(s, qid, correct)),
      endSession: (session) => setState((s) => db.pushSession(s, session)),
      /** 이어서 풀 자리 저장. qid 를 비우면 그 자리를 지운다. */
      setCursor: (key, qid) => setState((s) => db.setCursor(s, key, qid)),
      resetAll: () => setState(db.reset(subject.id)),
    }),
    [subject, state],
  )

  return <StoreContext.Provider value={api}>{children}</StoreContext.Provider>
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore 는 StoreProvider 안에서만 쓸 수 있다')
  return ctx
}

/** 현재 과목만 필요할 때 */
export const useSubject = () => useStore().subject
