import React from 'react';
import bannerImage from "../assets/banner3.jpg";
import Banner from "../components/common/Banner";
import SearchBar from "../components/common/SearchBar";
import styles from "./Apply.module.scss";
import Box from "../components/common/Box"; 

function Apply() {
  return (
    <div className={styles.homeContainer}>
      {/* 🔥 배너 (검색창 오버레이 포함) */}
      <div className={styles.bannerWrapper}>
        <Banner 
          image={bannerImage} 
          title="신청할래?" 
          description="같이 도전하고 성장할 팀원을 찾아보세요!" 
          className={styles.customBanner}
        />
        <div className={styles.searchBarOverlay}>
          <SearchBar />
        </div>
      </div>
      <Box></Box>
    </div>
  );
}

export default Apply;
