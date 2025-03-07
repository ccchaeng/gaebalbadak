import React from "react";
import bannerImage from "../assets/banner3.jpg";
import Banner from "../components/common/Banner";
import SearchBar from "../components/common/SearchBar";
import styles from "./Collaboration.module.scss"; // 스타일 파일
import Box from "../components/common/Box"; 

function Question() {
  return (
    <div className={styles.homeContainer}>
      <div className={styles.bannerWrapper}>
        <Banner 
          image={bannerImage} 
          title="질문할래?" 
          description="궁금한 게 무엇이든 질문해보세요." 
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

export default Question;
