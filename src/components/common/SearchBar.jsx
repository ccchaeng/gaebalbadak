import React from "react";
import searchIcon from "../../assets/search.png";
import styles from "./SearchBar.module.scss";

function SearchBar() {
  return (
    <div className={styles.searchBar}>
      <input  className={styles.searchInput} type="text" placeholder="지금 바로 검색해 보세요." />
      <img src={searchIcon} alt="search" className={styles.searchIcon} />
    </div>
  );
}

export default SearchBar;
