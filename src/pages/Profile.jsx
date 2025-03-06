import React, { useState } from 'react';
import styles from "./Profile.module.scss";

// 컴포넌트
import bannerImage from "../assets/banner3.jpg";
import Banner from "../components/common/Banner";
import SearchBar from "../components/common/SearchBar";

const Profile = () => {
  return (
    <div className={styles.profileContainer}>
      {/* 배너 (검색창 포함) */}
      <div className={styles.bannerWrapper}>
        <Banner
          image={bannerImage}
          title="개발자들의 바닥까지 파헤치는 공간,"
          description="세상을 움직이는 코드, 여기서 시작됩니다."
          className={styles.customBanner}
        />
        <div className={styles.searchBarOverlay}>
          <SearchBar />
        </div>
      </div>
    </div>
  );
}

export default Profile;
