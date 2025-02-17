import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/dog_logo.png";
import bannerImage from "../../assets/banner2.jpg";
import searchIcon from "../../assets/search.png";
import styles from "./Header.module.scss";

function Header() {
  return (
    <div>
      <header className={styles.header}>
        <div className={styles.header__left}>
          <img src={logo} alt="개발바닥" className={styles.header__logo} />
          <span>GAEBALBADAK</span>
        </div>
        <div className={styles.header__center}>
          <input className={styles.header__search} type="text" placeholder="지금 바로 검색해 보세요."/>
          <img src={searchIcon} alt="search" className={styles.header__searchIcon} />
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

      <section className={styles.banner} style={{ backgroundImage: `url(${bannerImage})` }}>
        <div className={styles.banner__contentWrapper}>
          <div className="styles.banner__content">
            <h1>개발자들의 바닥까지 파헤치는 공간,</h1>
            <p>세상을 움직이는 코드, 여기서 시작됩니다.</p>
          </div>
        </div>
        
      </section>
    </div>
  );
}

export default Header;
