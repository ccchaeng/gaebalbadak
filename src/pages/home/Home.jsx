import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { collection, query, orderBy, getDocs } from "firebase/firestore"; // ✅ Firestore 관련 함수 추가
import Banner from "../../components/common/Banner";
import SearchBar from "../../components/common/SearchBar";
import MainContent from "./MainContent";
import styles from "./MainContent.module.scss";
import bannerImage from "../../assets/banner2.jpg";

function Home() {
  const [questions, setQuestions] = useState([]);
  const [collaborations, setCollaborations] = useState([]);
  const [applications, setApplications] = useState([]);

  // ✅ Firestore에서 데이터 가져오는 함수
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        console.log("🔥 Firestore에서 데이터 가져오는 중...");

        // 🔥 각 컬렉션에서 최신순으로 5개만 가져오기
        const fetchData = async (collectionName, setterFunction) => {
          const q = query(collection(db, collectionName), orderBy("createdAt", "desc"));
          const querySnapshot = await getDocs(q);
          const data = querySnapshot.docs.slice(0, 5).map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setterFunction(data);
        };

        // ✅ Firestore에서 데이터를 가져와 상태 업데이트
        await Promise.all([
          fetchData("posts_question", setQuestions),
          fetchData("posts_collaboration", setCollaborations),
          fetchData("post_Apply", setApplications),
        ]);

        console.log("✅ Firestore 데이터 가져오기 완료!");
      } catch (error) {
        console.error("❌ Firestore 데이터 가져오기 실패:", error);
      }
    };

    fetchPosts();
  }, []); // ✅ 페이지 로드 시 Firestore에서 데이터 불러오기

  return (
    <div className={styles.homeContainer}>
      {/* 🔥 배너 (검색창 오버레이 포함) */}
      <div className={styles.bannerWrapper}>
        <Banner 
          image={bannerImage} 
          title="개발자들의 바닥까지 파헤치는 공간," 
          description="세상을 움직이는 코드, 여기서 시작됩니다." 
          className={styles.customBanner}
        />
        <div className={styles.searchBarOverlay}>
          <SearchBar />
        </div>
      </div>

      {/* 🔥 Firestore에서 가져온 데이터로 MainContent 구성 */}
      <div className={styles.mainContentContainer}>
        <MainContent title="질문할래" items={questions} link="/question" />
        <MainContent title="같이할래" items={collaborations} link="/collaboration" />
        <MainContent title="신청할래" items={applications} link="/apply" />
      </div>
    </div>
  );
}

export default Home;
