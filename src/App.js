import './App.css'
import { Routes, Route } from 'react-router-dom'
import { Login } from './pages/Login/Login'
import { Home } from './pages/Home/Home'
import { History } from './pages/History/History'
import { Signup } from './pages/Signup/Signup'
import { Examination } from './pages/Exam/Examination'
import { Finish } from './pages/Finish/Finish'
import { Submit } from './pages/Finish/Submit'
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/examination" element={<Examination />} />
        <Route path="/exam-finished" element={<Finish />} />
        <Route path="/submit-exam" element={<Submit />} />
      </Routes>
    </div>
  )
}

export default App
