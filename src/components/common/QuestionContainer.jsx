import React from "react";
import styles from "./QuestionContainer.module.scss";

const QuestionContainer = ({ 
  title, 
  setTitle, 
  content, 
  setContent, 
  onSubmit, 
  onCancel 
}) => {
  return (
    <div className={styles.container}>
      {/* 제목 + 언어 선택 */}
      <div className={styles.titleRow}>
        <input
          type="text"
          className={styles.customTitle}
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className={styles.extraBox}>
          언어 선택 <span>▼</span>
        </div>
      </div>

      {/* 본문 입력 */}
      <textarea
        className={styles.textArea}
        placeholder="내용"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
    <div className={styles.imageEx}>이미지 첨부</div>
      {/* 이미지 업로드 */}
      <div className={styles.imageUpload}>
        <div className={styles.imageBox}>
            <img src="/Camera.png" alt="카메라 아이콘" />
        </div>
        <div className={styles.imageBox}>
            <img src="/Camera.png" alt="카메라 아이콘" />
        </div>
        <div className={styles.imageBox}>
            <img src="/Camera.png" alt="카메라 아이콘" />
        </div>
      </div>

      {/* 버튼 */}
      <div className={styles.buttonRow}>
        <button className={`${styles.button} ${styles.submitButton}`} onClick={onSubmit}>글쓰기</button>
        <button className={`${styles.button} ${styles.cancelButton}`} onClick={onCancel}>삭제</button>
      </div>
    </div>
  );
};

export default QuestionContainer;
