import React from "react";
import { useParams, useLocation } from "react-router-dom";
import bannerImage from "../assets/banner3.jpg";
import Banner from "../components/common/Banner";
import styles from "./QuestionDetail.module.scss";
import QuestionDetailContainer from "../components/common/QuestionDetailContainer";

function QuestionDetail() {
  const { postId } = useParams();
  const location = useLocation(); // ✅ 현재 경로 확인

  // ✅ 현재 페이지의 게시판 타입에 따라 제목 & 설명 변경
  const isCollaboration = location.pathname.startsWith("/collaboration");
  const bannerTitle = isCollaboration ? "같이할래?" : "질문할래?";
  const bannerDescription = isCollaboration
    ? "저희 프로젝트에 함께 참여해보시는 건 어떨까요?"
    : "궁금한 게 무엇이든 질문해보세요.";

  console.log("현재 URL에서 가져온 postId:", postId);

  return (
    <div className={styles.homeContainer}>
      <div className={styles.bannerWrapper}>
        <Banner
          image={bannerImage}
          title={bannerTitle} // ✅ 게시판 유형에 따라 변경된 제목 전달
          description={bannerDescription} // ✅ 게시판 유형에 따라 변경된 설명 전달
          className={styles.customBanner}
        />
      </div>

      {/* ✅ `postId`를 `QuestionDetailContainer`에 전달 */}
      <QuestionDetailContainer postId={postId} />
    </div>
  );
}

export default QuestionDetail;
