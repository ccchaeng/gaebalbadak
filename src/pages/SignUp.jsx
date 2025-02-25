import React, { use, useState } from 'react'

import styles from "./SignUp.module.scss"

// 라우터 
import { useNavigate } from 'react-router-dom'

// 컴포넌트
import Button from '../components/common/Button'
import InputField from '../components/common/InputField'

// firebase 회원가입
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore'

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      // Authentication 사용자 생성
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Authentication 프로필 업데이트
      await updateProfile(user, {
        displayName: name,
        photoURL: "/default_profile.png"
      });

      // Firestore에 사용자 데이터 저장
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        nickname: name,
        photoURL: user.photoURL,
      });
      console.log("Firestore 사용자 데이터 저장 완료");
      
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