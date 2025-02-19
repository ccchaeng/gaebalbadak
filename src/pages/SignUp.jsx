import React, { use, useState } from 'react'

import styles from "./SignUp.module.scss"

import Button from '../components/common/Button'
import InputField from '../components/common/InputField'

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");

  const handleSignUp = (e) => {
    e.preventDefault();
    console.log("회원가입 시도: ", email, password, name)
  }
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