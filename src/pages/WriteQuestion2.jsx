import React, { useEffect, useState } from "react";
import { db } from "../firebase"; // Firebase 연결
import { collection, getDocs } from "firebase/firestore";
import bannerImage from "../assets/banner3.jpg";
import Banner from "../components/common/Banner";
import QuestionContainer from "../components/common/QuestionContainer";
import { savePost } from "../usePost"; // 🔥 수정된 저장 함수 가져오기
import styles from "./WriteQuestion.module.scss";

function WriteQuestion2() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState(""); // 선택한 모집 분야 저장
  const [categories, setCategories] = useState([]); // 모집 분야 목록

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "categories"));
        const categoryList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setCategories(categoryList);
      } catch (error) {
        console.error("❌ 모집 분야 불러오기 실패:", error);
      }
    };

    fetchCategories();
  }, []);

  // 📌 글쓰기 버튼 클릭 시 Firestore에 저장
  const handleSubmit = (images) => {
    console.log("🔥 글쓰기 버튼 클릭! 데이터 저장 시작...");
    savePost(title, content, category, images); // ✅ Base64 이미지 포함
  };

  const handleCancel = () => {
    setTitle("");
    setContent("");
    setCategory("");
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.homeContainer}>
        <div className={styles.bannerWrapper}>
          <Banner 
            image={bannerImage} 
            title="같이할래?" 
            description="저희 프로젝트에 함께 참여해보시는 건 어떨까요?"
            className={styles.customBanner}
          />
        </div>
      </div>

      {/* ✅ Firestore에서 불러온 categories를 QuestionContainer로 전달 */}
      <QuestionContainer 
        title={title} 
        setTitle={setTitle}
        content={content} 
        setContent={setContent}
        selectedCategory={category} 
        setSelectedCategory={setCategory} 
        categories={categories} 
        onSubmit={handleSubmit} 
        onCancel={handleCancel}
      />
    </div>
  );
}

export default WriteQuestion2;
