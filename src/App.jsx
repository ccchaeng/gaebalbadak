import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout_TEMP';
import Home from './pages/home/Home_TEMP';
import Question from './pages/Question';
import QuestionDetail from "./pages/QuestionDetail"
import Collaboration from './pages/Collaboration';
import Apply from './pages/Apply';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import WriteQuestion from './pages/WriteQuestion';
import WriteQuestion2 from './pages/WriteQuestion2';


function App() {
  return (
    <Router>
      <Routes>
        {/* Layout이 필요한 페이지 */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/question" element={<Question />} />
          <Route path="/question/:postId" element={<QuestionDetail />} />
          <Route path="/collaboration" element={<Collaboration />} />
          <Route path="/collaboration/:postId" element={<QuestionDetail />} />  {/* ✅ 추가 */}
          <Route path="/apply" element={<Apply />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/write" element={<WriteQuestion />} />
          <Route path="/write2" element={<WriteQuestion2 />} />
        </Route>

        {/* Layout이 필요 없는 개별 페이지 */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;