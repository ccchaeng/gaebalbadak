import React from "react";
import { useParams } from "react-router-dom";
import { db, auth } from "../firebase";
import bannerImage from "../assets/banner3.jpg";
import Banner from "../components/common/Banner";
import styles from "./QuestionDetail.module.scss";
import QuestionDetailContainer from "../components/common/QuestionDetailContainer";

function QuestionDetail() {
  const { postId } = useParams(); // ✅ URL에서 postId 가져오기
  console.log("현재 URL에서 가져온 postId:", postId);

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

      {/* ✅ `postId`를 `QuestionDetailContainer`에 전달 */}
      <QuestionDetailContainer postId={postId} />
    </div>
  );
}

export default QuestionDetail;
