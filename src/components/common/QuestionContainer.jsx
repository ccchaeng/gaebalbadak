import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; 
import { savePost } from "../../usePost"; // ✅ Firestore 저장 함수 가져오기
import styles from "./QuestionContainer.module.scss";

const QuestionContainer = ({ 
  title, setTitle, 
  content, setContent, 
  selectedCategory, setSelectedCategory, 
  categories, onCancel, 
  categoryTitle // ✅ "모집 분야" 문구를 props로 받음
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [images, setImages] = useState([]);
  const boardType = location.pathname.startsWith("/write2") ? "collaboration" : "question"; 

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const toBase64 = (file) => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

    Promise.all(files.map(toBase64)).then((base64Images) => {
      setImages((prevImages) => [...prevImages, ...base64Images]);
    });
  };

  const handleDeleteImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    const postId = await savePost(title, content, selectedCategory, images, boardType);
  
    if (postId) {
      const redirectPath = boardType === "question" 
        ? `/question/${postId}` 
        : `/collaboration/${postId}`; 
      console.log(`🔄 페이지 이동: ${redirectPath}`);  
      navigate(redirectPath);
    } else {
      console.error("❌ postId가 없습니다. 페이지 이동 취소");
    }
  };

  return (
    <div className={styles.container}>
      {/* 🔥 제목 + "모집 분야" 선택 */}
      <div className={styles.titleRow}>
        <input
          type="text"
          className={styles.customTitle}
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className={styles.extraBox} onClick={() => setDropdownOpen(!dropdownOpen)}>
          {selectedCategory || categoryTitle} {/* ✅ props로 받은 문구 사용 */}
          <span>▼</span>
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

      {/* 🔥 본문 입력 */}
      <textarea
        className={styles.textArea}
        placeholder="내용"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      {/* 🔥 이미지 업로드 */}
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

      {/* 🔥 이미지 미리보기 + 삭제 기능 */}
      <div className={styles.imagePreviewContainer}>
        {images.map((image, index) => (
          <div key={index} className={styles.imageBox}>
            <img src={image} alt={`업로드된 이미지 ${index}`} className={styles.previewImage} />
            <button className={styles.deleteButton} onClick={() => handleDeleteImage(index)}>❌</button>
          </div>
        ))}
      </div>

      {/* 🔥 버튼 */}
      <div className={styles.buttonRow}>
        <button className={`${styles.button} ${styles.submitButton}`} onClick={handleSubmit}>글쓰기</button>
        <button className={`${styles.button} ${styles.cancelButton}`} onClick={onCancel}>삭제</button>
      </div>
    </div>
  );
};

export default QuestionContainer;
