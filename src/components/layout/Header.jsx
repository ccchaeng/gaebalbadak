import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/dog_logo.png";
import styles from "./Header.module.scss";
import SearchBar from "../common/SearchBar";
import NavBar from "../common/NavBar";
import Banner from "../common/Banner";

function Header() {
  return (
    <div>

      {/* 헤더 */}
      <header className={styles.header}>
        <div className={styles.header__left}>
          <Link to="/" className={styles.header__logoLink}>
            <img src={logo} alt="개발바닥" className={styles.header__logo} />
          </Link>
          <Link to="/" className={styles.header__textLink}>
            <span className={styles.header__text}>GAEBALBADAK</span>
          </Link>
        </div>

        {/* 검색창 */}
        <div className={styles.header__center}>
          <SearchBar />
        </div>

        {/* 네비게이션 */}
        <NavBar />
      </header>

      {/* 배너 */}
      <Banner />
      
    </div>
  );
}

export default Header;
