import React from "react";
import bannerImage from "../assets/banner3.jpg";
import Banner from "../components/common/Banner";
import SearchBar from "../components/common/SearchBar";
import styles from "./Collaboration.module.scss"; // 스타일 파일
import Box from "../components/common/Box"; 

const Collaboration = () => {
  // ✅ 같이할래 게시판 전용 탭 목록
  const collaborationTabs = ["전체", "Web", "App", "Unity", "Game Dev", "Blockchain","UnrealEngine", "기타"];

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
      {/* 🔥 `Box` 컴포넌트에 `tabs` 전달 */}
      <Box tabs={collaborationTabs} categoryTitle="모집분야" /> {/* ✅ 변경된 props 전달 */}
    </div>
  );
};

export default Collaboration;
