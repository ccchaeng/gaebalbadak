import React, { useEffect, useState } from "react";
import { db } from "../firebase"; // ✅ Firestore 연결
import { collection, getDocs } from "firebase/firestore";
import bannerImage from "../assets/banner3.jpg";
import Banner from "../components/common/Banner";
import QuestionContainer from "../components/common/QuestionContainer";
import { savePost } from "../usePost"; // ✅ Firestore 저장 함수
import styles from "./WriteQuestion.module.scss";

function WriteQuestion2() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState(""); // ✅ 선택한 언어
  const [languages, setLanguages] = useState([]); // ✅ Firestore에서 불러온 언어 목록

  // 🔥 Firestore에서 `languages` 컬렉션 불러오기
  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "language")); // ✅ "language" 컬렉션에서 데이터 가져오기
        const languageList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setLanguages(languageList); // ✅ 가져온 데이터를 상태에 저장
      } catch (error) {
        console.error("❌ 언어 목록 불러오기 실패:", error);
      }
    };

    fetchLanguages();
  }, []);

  // 📌 글쓰기 버튼 클릭 시 Firestore에 저장
  const handleSubmit = (images) => {
    console.log("🔥 글쓰기 버튼 클릭! 데이터 저장 시작...");
    savePost(title, content, selectedLanguage, images); // ✅ Base64 이미지 포함
  };

  const handleCancel = () => {
    setTitle("");
    setContent("");
    setSelectedLanguage(""); // ✅ 선택한 언어 초기화
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.homeContainer}>
        <div className={styles.bannerWrapper}>
          <Banner 
            image={bannerImage} 
            title="질문할래?" 
            description="궁금한 게 무엇이든 질문해보세요." 
            className={styles.customBanner}
          />
        </div>
      </div>

      {/* ✅ Firestore에서 불러온 `languages`를 QuestionContainer로 전달 */}
      <QuestionContainer 
        title={title} 
        setTitle={setTitle}
        content={content} 
        setContent={setContent}
        selectedCategory={selectedLanguage}  // ✅ 기존 category → language로 변경
        setSelectedCategory={setSelectedLanguage} // ✅ 기존 setCategory → setSelectedLanguage 변경
        categories={languages} // ✅ 기존 categories → languages로 변경
        onSubmit={handleSubmit} 
        onCancel={handleCancel}
        categoryTitle="질문 분야" // ✅ 문구 전달
      />
    </div>
  );
}

export default WriteQuestion2;
