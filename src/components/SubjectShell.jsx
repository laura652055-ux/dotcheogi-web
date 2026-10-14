import { useEffect } from 'react'
import { Navigate, Outlet, useParams } from 'react-router-dom'
import { getSubject } from '../data/subjects/index.js'
import { StoreProvider } from '../store.jsx'
import Layout from './Layout.jsx'

/**
 * 과목 하위 화면들의 껍데기.
 * URL 의 과목 id 를 해석해 학습 기록을 주입하고, 탭 제목을 과목에 맞춘다.
 *
 * StoreProvider 에 key 를 주는 이유: 과목이 바뀌면 저장 키도 바뀌므로
 * 상태를 이어받지 말고 새로 읽어야 한다.
 */
export default function SubjectShell() {
  const { subjectId } = useParams()
  const subject = getSubject(subjectId)

  useEffect(() => {
    if (!subject) return
    document.title = `닷처기 · ${subject.fullName}`
    return () => {
      document.title = '닷처기'
    }
  }, [subject])

  // 없는 과목이면 과목 선택으로 돌린다
  if (!subject) return <Navigate to="/" replace />

  return (
    <StoreProvider key={subject.id} subject={subject}>
      <Layout subject={subject}>
        <Outlet />
      </Layout>
    </StoreProvider>
  )
}
