import React from "react";
import { useParams } from "react-router-dom";
import { db, auth } from "../firebase";
import bannerImage from "../assets/banner3.jpg";
import Banner from "../components/common/Banner";
import styles from "./ApplyDetail.module.scss";
import ApplyDetailContainer from "../components/common/ApplyDetailContainer";

function ApplyDetail() {
  const { postId } = useParams(); // ✅ URL에서 postId 가져오기
  console.log("현재 URL에서 가져온 postId:", postId);

  return (
    <div className={styles.homeContainer}>
      <div className={styles.bannerWrapper}>
        <Banner
          image={bannerImage}
          title="같이할래?"
          description="저희 프로젝트에 함께 참여해보시는 건 어떨까요?"
          className={styles.customBanner}
        />
      </div>

      {/* ✅ `postId`를 `ApplyDetailContainer`에 전달 */}
      <ApplyDetailContainer postId={postId} boardType="post_Apply" />
    </div>
  );
}

export default ApplyDetail;
