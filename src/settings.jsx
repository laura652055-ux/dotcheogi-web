/**
 * 과목과 무관한 전역 설정. 지금은 흑백 반전 하나뿐이다.
 *
 * 학습 기록(store.jsx)과 분리한 이유: 과목을 바꿔도 화면 반전은 유지돼야 하고,
 * 과목 선택 화면처럼 아직 과목이 정해지지 않은 곳에서도 필요하기 때문이다.
 */

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { loadSettings, saveSettings } from './lib/storage.js'

const SettingsContext = createContext(null)

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(loadSettings)

  useEffect(() => {
    saveSettings(settings)
    // 반전은 CSS 변수만 뒤집으면 되므로 html 속성 하나로 처리한다
    document.documentElement.dataset.invert = settings.invert ? 'on' : 'off'
  }, [settings])

  const api = useMemo(
    () => ({
      settings,
      toggleInvert: () => setSettings((s) => ({ ...s, invert: !s.invert })),
    }),
    [settings],
  )

  return <SettingsContext.Provider value={api}>{children}</SettingsContext.Provider>
}

export function useSettings() {
  const ctx = useContext(SettingsContext)
  if (!ctx) throw new Error('useSettings 는 SettingsProvider 안에서만 쓸 수 있다')
  return ctx
}
