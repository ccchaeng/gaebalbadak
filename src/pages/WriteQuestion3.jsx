import React, { useState } from "react";
import styles from "./WriteQuestion.module.scss"; 
import bannerImage from "../assets/banner3.jpg";
import Banner from "../components/common/Banner";
import QuestionContainer from "../components/common/QuestionContainer";

function WriteQuestion3() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState(""); 

  const categories = [
    { id: 1, name: "창업" },
    { id: 2, name: "서포터즈" },
    { id: 3, name: "취업" },
    { id: 4, name: "인턴십" },
    { id: 5, name: "공모전" }
  ];

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.homeContainer}>
        <div className={styles.bannerWrapper}>
          <Banner 
            image={bannerImage} 
            title="신청할래?" 
            description="대외활동, 공모전, 지원사업! 지금 바로 신청할래?"
            className={styles.customBanner}
          />
        </div>
      </div>

      {/* ✅ QuestionContainer에 필요한 props 전달 */}
      <QuestionContainer
        title={title} 
        setTitle={setTitle}
        content={content} 
        setContent={setContent}
        selectedCategory={category} 
        setSelectedCategory={setCategory} 
        categories={categories} 
        categoryTitle="모집 분야" 
      />
    </div>
  );
}

export default WriteQuestion3;
