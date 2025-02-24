import React, { use, useState } from 'react'

import styles from "./SignUp.module.scss"

// 라우터 
import { useNavigate } from 'react-router-dom'

// 컴포넌트
import Button from '../components/common/Button'
import InputField from '../components/common/InputField'

// firebase 회원가입
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      console.log("회원가입 성공: ", userCredential.user);
      alert(`${name} 님, 환영합니다! 로그인 후 서비스를 이용하세요.`);
      navigate("/login"); // 로그인 페이지로 이동
    } catch (error) {
      console.error("회원가입 실패: ", error.message);
      alert(`회원가입 실패: ${error.message}`);
    }
  };

  return (
    <div className={styles.signup}>
      <div className={styles.container}>
        <h2 className={styles.container__title}>회원가입</h2>
        <div className={styles.container__divider}></div>
        <InputField label="닉네임" type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} className={styles.container__input}/>
        <InputField label="이메일" type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className={styles.container__input}/>
        <InputField label="비밀번호" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} className={styles.container__input}/>
        <Button text="Sign Up" onClick={handleSignUp} className={styles.container__button}/>
        <p className={styles.container__footer}>이미 회원이십니까?&nbsp;<a href="/login">Log In</a></p>
      </div>
    </div>
  )
}

export default SignUp