import React, { useState } from "react";
import bannerImage from "../assets/banner3.jpg";
import Banner from "../components/common/Banner";
import QuestionContainer from "../components/common/QuestionContainer";
import styles from "./WriteQuestion.module.scss";

function WriteQuestion() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    console.log("글쓰기 버튼 클릭:", title, content);
  };

  const handleCancel = () => {
    setTitle("");
    setContent("");
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

      {/* ✅ 이제 `QuestionContainer`를 가져와서 사용 */}
      <QuestionContainer 
        title={title} 
        setTitle={setTitle} 
        content={content} 
        setContent={setContent} 
        onSubmit={handleSubmit} 
        onCancel={handleCancel} 
      />
    </div>
  );
}

export default WriteQuestion;
