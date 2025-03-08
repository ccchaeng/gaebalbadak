import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  doc,
  getDoc,
  collection,
  query,
  orderBy,
  getDocs,
} from "firebase/firestore"; // ✅ Firestore 관련 함수 추가
import bannerImage from "../assets/banner3.jpg";
import Banner from "../components/common/Banner";
import SearchBar from "../components/common/SearchBar";
import styles from "./Apply.module.scss";

function Apply() {
  const [currentPosts, setCurrentPosts] = useState([]); // ✅ Firestore에서 가져올 데이터
  const [currentPage, setCurrentPage] = useState(1);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const pageSize = 3;
  const navigate = useNavigate();

  // ✅ Firestore에서 데이터 가져오는 함수
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        console.log("🔥 Firestore에서 데이터 가져오는 중...");
        const q = query(
          collection(db, "post_Apply"),
          orderBy("createdAt", "desc")
        ); // ✅ 최신순 정렬
        const querySnapshot = await getDocs(q);

        const postsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log("✅ Firestore에서 가져온 게시글:", postsData);
        setCurrentPosts(postsData); // ✅ Firestore에서 가져온 데이터 저장
      } catch (error) {
        console.error("❌ Firestore 데이터 가져오기 실패:", error);
      }
    };

    fetchPosts();
  }, []); // ✅ 페이지 로드 시 Firestore에서 데이터 불러오기

  // ✅ Firebase 로그인 상태 확인
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          setIsAdmin(
            userData.email === "cjh5779@naver.com" ||
              userData.email === "kim020405@naver.com"
          ); // ✅ 여러 관리자 설정
        } else {
          setIsAdmin(false);
        }
      } else {
        setUser(null);
        setIsAdmin(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // ✅ 페이지네이션 계산
  const indexOfLastPost = currentPage * pageSize;
  const indexOfFirstPost = indexOfLastPost - pageSize;
  const currentDisplayedPosts = currentPosts.slice(
    indexOfFirstPost,
    indexOfLastPost
  );
  const totalPages = Math.ceil(currentPosts.length / pageSize);

  return (
    <div className={styles.homeContainer}>
      <div className={styles.bannerWrapper}>
        <Banner
          image={bannerImage}
          title="신청할래?"
          description="대외활동, 공모전, 지원사업! 지금 바로 신청할래?"
          className={styles.customBanner}
        />
        <div className={styles.searchBarOverlay}>
          <SearchBar />
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.innerBox2}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>제목</th>
                <th>모집 분야</th>
                <th>작성일</th>
              </tr>
            </thead>
            <tbody>
              {currentDisplayedPosts.length > 0
                ? currentDisplayedPosts.map((post) => (
                    <tr
                      key={post.id}
                      onClick={() => navigate(`/apply/${post.id}`)} // ✅ Firestore의 실제 post.id 사용
                      className={styles.clickableRow}
                    >
                      <td>{post.title || "-"}</td>
                      <td>{post.category || "-"}</td>
                      <td>
                        {post.createdAt?.seconds
                          ? new Date(
                              post.createdAt.seconds * 1000
                            ).toLocaleDateString()
                          : "-"}
                      </td>
                    </tr>
                  ))
                : null}{" "}
              {/* ✅ 불필요한 공백 방지 위해 `null` 반환 */}
            </tbody>
          </table>
        </div>
      </div>

      {/* ✅ 페이지네이션 */}
      {currentPosts.length > 0 && (
        <div className={styles.paginationContainer}>
          <div className={styles.pagination}>
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              이전
            </button>
            <span className={styles.pageNumbers}>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={currentPage === i + 1 ? styles.activePage : ""}
                >
                  {i + 1}
                </button>
              ))}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              다음
            </button>
          </div>
          {/* ✅ 관리자만 글쓰기 버튼 보이기 */}
          {isAdmin && (
            <div className={styles.adminActions}>
              <button
                className={styles.writeButton}
                onClick={() => navigate("/write3")}
              >
                글쓰기
              </button>
            </div>
          )}
        </div>
      )}
      {user && (
        <div className={styles.logoutContainer}>
          <button className={styles.logoutButton} onClick={() => signOut(auth)}>
            로그아웃
          </button>
        </div>
      )}
    </div>
  );
}

export default Apply;
