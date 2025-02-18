import React, { useState } from "react";
import InputField from "../components/common/InputField";
import Button from "../components/common/Button";
import styles from "./Login.module.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("로그인 시도:", email, password);
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginContainer}>
        <h2>로그인</h2>
        <InputField className={styles.loginInput} label="이메일" type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <InputField className={styles.loginInput} label="비밀번호" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button text="Log In" onClick={handleLogin} className={styles.loginButton} />
        <p className={styles.loginFooter}>회원이 아니십니까? <a href="/signup">Sign Up</a></p>
      </div>
    </div>
  );
};

export default Login;
