import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSettings } from '../settings.jsx'
import { Btn } from './Pixel.jsx'
import Mascot from './Mascot.jsx'

/**
 * 앱 껍데기. subject 가 없으면 과목 선택 화면(/)이라는 뜻이다.
 * 그때는 과목 이름과 통계 링크를 감춘다.
 */
export default function Layout({ subject, children }) {
  const { settings, toggleInvert } = useSettings()
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const home = subject ? `/${subject.id}` : '/'
  const atHome = pathname === home

  return (
    <>
      <header className="appbar">
        <div className="appbar-inner">
          <Link to={home} className="row" style={{ gap: 'var(--d2)' }}>
            <Mascot mood="idle" size={28} />
            <span>
              <span className="brand">닷처기</span>{' '}
              {subject && <span className="brand-sub t-dim">{subject.fullName}</span>}
            </span>
          </Link>

          <nav className="row" style={{ gap: 'var(--d1)' }}>
            {!atHome && (
              <Btn size="ghost" onClick={() => navigate(-1)}>
                ← 뒤로
              </Btn>
            )}
            {/* a 안에 button 을 넣으면 안 되므로 Link 자체에 버튼 스타일을 준다 */}
            {subject && (
              <>
                <Link to={`/${subject.id}/stats`} className="btn btn-ghost btn-sm">
                  통계
                </Link>
                <Link to="/" className="btn btn-ghost btn-sm" title="과목 바꾸기">
                  과목
                </Link>
              </>
            )}
            <Btn size="ghost" onClick={toggleInvert} title="흑백 반전" aria-label="흑백 반전">
              {settings.invert ? '○' : '●'}
            </Btn>
          </nav>
        </div>
      </header>

      <main className="shell">{children}</main>
    </>
  )
}
