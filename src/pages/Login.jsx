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
    <div className={styles.loginContainer}>
      <h2>로그인</h2>
      <InputField label="이메일" type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <InputField label="비밀번호" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button text="Log In" onClick={handleLogin} className={styles.loginButton} />
      <p>회원이 아니십니까? <a href="/signup">Sign Up</a></p>
    </div>
  );
};

export default Login;
