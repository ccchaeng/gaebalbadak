import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout_TEMP';
import Home from './pages/home/Home_TEMP';
import Question from './pages/Question';
import QuestionDetail from "./pages/QuestionDetail";
import Collaboration from './pages/Collaboration';
import Apply from './pages/Apply';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import WriteQuestion from './pages/WriteQuestion';
import WriteQuestion2 from './pages/WriteQuestion2';

function App() {
  useEffect(() => {
    const FixRatio = () => {
      const root = document.querySelector("#root");
      const app = document.querySelector("#App");

      if (!root || !app) return; // 요소가 없으면 실행하지 않음

      let width = root.clientWidth;
      let height = width * 0.5625; // 1080 ÷ 1920 ≒ 0.5625

      if (height > root.clientHeight) { 
        height = root.clientHeight;
        width = height * 1.7777; // 1920 ÷ 1080 ≒ 1.7777
      }

      app.style.width = `${width}px`;
      app.style.height = `${height}px`;
    };

    window.addEventListener("resize", FixRatio);
    FixRatio(); // 초기 실행

    return () => {
      window.removeEventListener("resize", FixRatio);
    };
  }, []);

  return (
    <div id="App">
      <Router>
        <Routes>
          {/* Layout이 필요한 페이지 */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/question" element={<Question />} />
            <Route path="/question/:postId" element={<QuestionDetail />} />
            <Route path="/collaboration" element={<Collaboration />} />
            <Route path="/collaboration/:postId" element={<QuestionDetail />} />  
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
    </div>
  );
}

export default App;
