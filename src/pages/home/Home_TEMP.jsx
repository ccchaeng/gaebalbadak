import React from "react";
import Banner from "../../components/common/Banner";
import SearchBar from "../../components/common/SearchBar";
import mockData from "../../data/mockData";
import MainContent from "./MainContent";
import styles from "./MainContent.module.scss";
import bannerImage from "../../assets/banner2.jpg";

function Home() {
  return (
    <div className={styles.homeContainer}>
      {/* 🔥 배너 (검색창 오버레이 포함) */}
      <div className={styles.bannerWrapper}>
        <Banner image={bannerImage} title="개발자들의 바닥까지 파헤치는 공간," description="세상을 움직이는 코드, 여기서 시작됩니다." className={styles.customBanner}/>
        <div className={styles.searchBarOverlay}>
          <SearchBar />
        </div>
      </div>

      <div className={styles.mainContentContainer}>
        <MainContent title="질문할래" items={mockData.questions} link="/question" />
        <MainContent title="같이할래" items={mockData.collaborations} link="/collaboration" />
        <MainContent title="신청할래" items={mockData.applications} link="/apply" />
      </div>
    </div>
  );
}

export default Home;
