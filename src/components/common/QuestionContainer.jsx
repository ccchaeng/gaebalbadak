import React, { useState } from "react";
import styles from "./QuestionContainer.module.scss";

const QuestionContainer = ({ 
  title, 
  setTitle, 
  content, 
  setContent, 
  selectedCategory,
  setSelectedCategory,
  categories, 
  onSubmit, 
  onCancel
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false); // 🔥 드롭다운 상태 추가

  return (
    <div className={styles.container}>
      {/* 제목 + 모집 분야 선택 */}
      <div className={styles.titleRow}>
        <input
          type="text"
          className={styles.customTitle}
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* ✅ Firestore 데이터를 기존 UI에서 직접 표시 & 드롭다운 기능 개선 */}
        <div 
          className={styles.extraBox} 
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          {selectedCategory || "모집 분야"} <span>▼</span>
          {dropdownOpen && ( // 🔥 클릭 시에만 드롭다운 표시
            <div className={styles.dropdownContent}>
              {categories.map((cat) => (
                <div 
                  key={cat.id} 
                  className={styles.dropdownItem}
                  onClick={(e) => {
                    e.stopPropagation(); // 이벤트 버블링 방지
                    setSelectedCategory(cat.name);
                    setDropdownOpen(false); // 선택 후 드롭다운 닫기
                  }}
                >
                  {cat.name}
                </div>
              ))}
            </div>
          )}
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
