import React from "react";
import bannerImage from "../assets/banner3.jpg";
import Banner from "../components/common/Banner";
import SearchBar from "../components/common/SearchBar";
import styles from "./Apply.module.scss";

function Apply() {
  return (
    <div className={styles.homeContainer}>
      <div className={styles.bannerWrapper}>
        <Banner 
          image={bannerImage} 
          title="신청할래?" 
          description="대외활동, 공모전, 지원사업! 지금 바로 신청할래?" 
          className={styles.customBanner}
        />
        <div className={styles.searchBarOverlay}>
          <SearchBar />
        </div>
      </div>
    </div>
  );
}

export default Apply;