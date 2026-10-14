import { NavLink } from 'react-router-dom'

/** 영어 세 화면(루틴 · 노트 · 듣기)을 오가는 탭. 과목 화면에는 안 붙는다. */
const TABS = [
  { to: '/routine', label: '루틴' },
  { to: '/notes', label: '덩어리 노트' },
  { to: '/listening', label: '듣기 자료' },
]

export default function EnglishNav() {
  return (
    <nav className="row wrap" style={{ gap: 'var(--d1)' }}>
      {TABS.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          className={({ isActive }) => `btn btn-sm${isActive ? ' btn-solid' : ''}`}
        >
          {tab.label}
        </NavLink>
      ))}
    </nav>
  )
}
