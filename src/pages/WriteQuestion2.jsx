import React, { useState } from "react";
import bannerImage from "../assets/banner3.jpg";
import Banner from "../components/common/Banner";
import QuestionContainer from "../components/common/QuestionContainer";
import styles from "./WriteQuestion.module.scss";

function WriteQuestion2() {
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
            title="같이할래?" 
            description="저희 프로젝트에 함께 참여해보시는 건 어떨까요?"
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
        Label = "모집 분야"
      />
    </div>
  );
}

export default WriteQuestion2;
