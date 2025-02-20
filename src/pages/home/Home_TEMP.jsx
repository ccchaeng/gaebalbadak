import React from "react";
import mockData from "../../data/mockData";
import MainContent from "./MainContent";
import styles from "./MainContent.module.scss"; // SCSS 모듈 import

function Home() {
  return (
    <div className={styles.homeContainer}>
      <MainContent title="질문할래" items={mockData.questions} link="/question" />
      <MainContent title="같이할래" items={mockData.collaborations} link="/collaboration" />
      <MainContent title="신청할래" items={mockData.applications} link="/apply" />
    </div>
  );
}

export default Home;
