import React from "react";
import styles from "./QuestionDetailContainer.module.scss";
import bannerImage from "../../assets/banner3.jpg"; // ✅ 이미지 경로 확인
import Banner from "../common/Banner"; 

function QuestionDetailContainer({ children }) {
  return (
    <div className={styles.container}>
      {/* 🔥 상단 제목 & 뒤로 가기 버튼 */}
      <div className={styles.header}>
        <button className={styles.backButton}>←</button>
        <h2 className={styles.title}>질문 제목</h2>
        <span className={styles.authorInfo}>작성자 | 날짜</span>
      </div>

      {/* 🔥 콘텐츠 영역 (질문 상세 내용이 들어갈 공간) */}
      <div className={styles.content}>{children}</div>

      {/* 🔥 입력 박스 영역 (댓글 입력이 들어갈 공간) */}
      <div className={styles.inputBox}>
        <textarea placeholder="댓글을 입력하세요..." />
        <button>확인</button>
      </div>
    </div>
  );
}

export default QuestionDetailContainer;
