import React, { useState } from "react";
import styles from "./QuestionContainer.module.scss";

const QuestionContainer = ({ 
  title, setTitle, 
  content, setContent, 
  selectedCategory, setSelectedCategory, 
  categories, onSubmit, onCancel 
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [images, setImages] = useState([]); // 🔥 업로드된 이미지 상태

  // ✅ 이미지 업로드 핸들러
  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);

    // 🔹 파일을 Base64로 변환
    const toBase64 = (file) => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

    Promise.all(files.map(toBase64)).then((base64Images) => {
      setImages((prevImages) => [...prevImages, ...base64Images]); // 🔹 기존 이미지 + 새 이미지 추가
    });
  };

  // ✅ 이미지 삭제 핸들러
  const handleDeleteImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

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
        <div className={styles.extraBox} onClick={() => setDropdownOpen(!dropdownOpen)}>
          {selectedCategory || "모집 분야"} <span>▼</span>
          {dropdownOpen && categories.length > 0 && (
            <div className={styles.dropdownContent}>
              {categories.map((cat) => (
                <div 
                  key={cat.id} 
                  className={styles.dropdownItem}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedCategory(cat.name);
                    setDropdownOpen(false);
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

      {/* ✅ 이미지 업로드 버튼 */}
      <input 
        id="imageUploadInput" 
        type="file" 
        multiple 
        accept="image/*" 
        style={{ display: "none" }} 
        onChange={handleImageUpload} 
      />
      <button onClick={() => document.getElementById("imageUploadInput").click()} className={styles.uploadButton}>
        📷 이미지 선택
      </button>

      {/* ✅ 이미지 미리보기 + 삭제 기능 (가로 정렬) */}
      <div className={styles.imagePreviewContainer}>
        {images.map((image, index) => (
          <div key={index} className={styles.imageBox}>
            <img src={image} alt={`업로드된 이미지 ${index}`} className={styles.previewImage} />
            <button className={styles.deleteButton} onClick={() => handleDeleteImage(index)}>❌</button>
          </div>
        ))}
      </div>

      {/* 버튼 */}
      <div className={styles.buttonRow}>
        <button className={`${styles.button} ${styles.submitButton}`} onClick={() => onSubmit(images)}>글쓰기</button>
        <button className={`${styles.button} ${styles.cancelButton}`} onClick={onCancel}>삭제</button>
      </div>
    </div>
  );
};

export default QuestionContainer;
