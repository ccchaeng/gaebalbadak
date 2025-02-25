import React from 'react'
import bannerImage from "../assets/banner3.jpg";
import Banner from "../components/common/Banner";
import SearchBar from "../components/common/SearchBar";
import styles from "./Collaboration.module.scss";


function Collaboration() {
  return (
    <div className={styles.homeContainer}>
      {/* 🔥 배너 (검색창 오버레이 포함) */}
      <div className={styles.bannerWrapper}>
        <Banner 
          image={bannerImage} 
          title="같이할래?" 
          description="저희 프로젝트에 함께 참여해보시는 건 어떨까요?" 
          className={styles.customBanner}
        />
        <div className={styles.searchBarOverlay}>
          <SearchBar />
        </div>
      </div>
    </div>
  );
}

export default Collaboration