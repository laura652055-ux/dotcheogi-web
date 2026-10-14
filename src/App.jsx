import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import SubjectShell from './components/SubjectShell.jsx'
import Subjects from './pages/Subjects.jsx'
import Home from './pages/Home.jsx'
import Select from './pages/Select.jsx'
import Quiz from './pages/Quiz.jsx'
import Result from './pages/Result.jsx'
import Stats from './pages/Stats.jsx'
import Listening from './pages/Listening.jsx'
import Routine from './pages/Routine.jsx'
import Notes from './pages/Notes.jsx'
import { SettingsProvider } from './settings.jsx'

/**
 * 경로 첫 칸이 과목이다. (/adsp/quiz/study/7)
 * 과목 아래 화면들은 SubjectShell 이 감싸서 해당 과목의 학습 기록을 주입한다.
 */
export default function App() {
  return (
    <BrowserRouter>
      <SettingsProvider>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Subjects />
              </Layout>
            }
          />

          {/* 영어 곁다리. 과목이 아니므로 /:subjectId 보다 먼저 잡아야 한다. */}
          <Route
            path="/routine"
            element={
              <Layout>
                <Routine />
              </Layout>
            }
          />
          <Route
            path="/notes"
            element={
              <Layout>
                <Notes />
              </Layout>
            }
          />
          <Route
            path="/listening"
            element={
              <Layout>
                <Listening />
              </Layout>
            }
          />

          <Route path="/:subjectId" element={<SubjectShell />}>
            <Route index element={<Home />} />
            <Route path="select/:mode" element={<Select />} />
            <Route path="quiz/:mode" element={<Quiz />} />
            <Route path="quiz/:mode/:chapter" element={<Quiz />} />
            <Route path="result" element={<Result />} />
            <Route path="stats" element={<Stats />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </SettingsProvider>
    </BrowserRouter>
  )
}
