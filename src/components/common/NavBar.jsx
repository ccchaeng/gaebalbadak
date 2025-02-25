import React from "react";
import { Link } from "react-router-dom";
import styles from "./NavBar.module.scss";

function NavBar({ className = "" }) {
  return (
    <nav className={`${styles.navBar} ${className}`}>
      <Link to="/question">질문할래</Link>
      <Link to="/collaboration">같이할래</Link>
      <Link to="/apply">신청할래</Link>

      {/* 로그인 및 회원가입 */}
      <div className={styles.authGroup}>
        <Link to="/login">Login</Link>
        <Link to="/signup">
          <button className={styles.authButton}>Sign Up</button>
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
