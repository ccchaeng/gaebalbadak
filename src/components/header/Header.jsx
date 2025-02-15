import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import styles from "./Header.module.scss";

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.header__left}>
        <img src={logo} alt="개발바닥" className={styles.header__logo} />
        <span>GAEBALBADAK</span>
      </div>
      <div className={styles.header__center}>
        <input className={styles.header__search} type="text" placeholder="지금 바로 검색해 보세요." />
      </div>
      <nav className={styles.header__nav}>
        <Link to="/question">질문할래</Link>
        <Link to="/collaboration">같이할래</Link>
        <Link to="/apply">신청할래</Link>
        <div className={styles.header__authGroup}>
          <Link to="/login">Login</Link>
          <Link to="/signup">
            <button className={styles.header__authButton}>Sign Up</button>
          </Link>
      </div>
      </nav>
    </header>
  );
}

export default Header;
