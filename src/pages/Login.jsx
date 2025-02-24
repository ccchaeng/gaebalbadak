import React, { useState } from "react";
import InputField from "../components/common/InputField";
import Button from "../components/common/Button";
import styles from "./Login.module.scss";

// 라우터를 위함
import { useNavigate } from "react-router-dom";

// firebase 로그인
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("로그인 성공: ", userCredential);
      navigate('/'); // home 페이지로 이동
    } catch (error) {
      console.log("로그인 실패: ", error.message);
      alert(`로그인 실패하였습니다.`);
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles.container}>
        <h2 className={styles.container__title}>로그인</h2>
        <div className={styles.container__divider}></div>
        <InputField label="이메일" type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value) } className={styles.container__input} />
        <InputField label="비밀번호" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} className={styles.container__input} />
        <Button text="Log In" onClick={handleLogin} className={styles.container__button} />
        <p className={styles.container__footer}>회원이 아니십니까?&nbsp;<a href="/signup">Sign Up</a></p>
      </div>
    </div>
  );
};

export default Login;
