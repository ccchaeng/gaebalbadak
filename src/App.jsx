import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Question from './pages/Question';
import Collaboration from './pages/Collaboration';
import Apply from './pages/Apply';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/question' element={<Question />} />
        <Route path='/collaboration' element={<Collaboration />} />
        <Route path='/apply' element={<Apply />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
