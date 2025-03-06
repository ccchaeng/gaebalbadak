import React from "react";
import bannerImage from "../assets/banner3.jpg";
import Banner from "../components/common/Banner";
import styles from "./QuestionDetail.module.scss";
import QuestionDetailContainer from "../components/common/QuestionDetailContainer";


function QuestionDetail() {
  return (
    <div className={styles.homeContainer}>
      <div className={styles.bannerWrapper}>
        <Banner
          image={bannerImage}
          title="질문할래?"
          description="궁금한 게 무엇이든 질문해보세요."
          className={styles.customBanner}
        />
      </div>
      {/* 🔥 QuestionDetailContainer 컴포넌트 불러오기 */}
      <QuestionDetailContainer />
    </div>
  );
}

export default QuestionDetail;
