import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom"; // ✅ useNavigate 추가 확인!
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import bannerImage from "../assets/banner3.jpg";
import Banner from "../components/common/Banner";
import SearchBar from "../components/common/SearchBar";
import styles from "./Apply.module.scss";
import { signOut } from "firebase/auth"; // 🔥 로그아웃 함수 가져오기

function Apply() {
  const [currentPosts, setCurrentPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const pageSize = 3;
  const navigate = useNavigate(); // ✅ 페이지 이동 함수

  // ✅ 로그아웃 핸들러 함수 추가
  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("로그아웃 되었습니다.");
    } catch (error) {
      console.error("로그아웃 오류:", error);
    }
  };

  useEffect(() => {
    // ✅ Firebase 로그인 상태 확인
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);

        // ✅ Firestore에서 현재 로그인된 사용자의 이메일 가져오기
        const userRef = doc(db, "users", user.uid); // Firestore에서 UID 기반으로 검색
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();

          // ✅ 특정 이메일만 관리자로 설정
          if (userData.email === "cjh5779@naver.com") {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }
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

  useEffect(() => {
    const mockPosts = [
      {
        id: 1,
        title: "2025 글로벌 창업 경진대회 참가 모집!",
        category: "창업",
        createdAt: { seconds: 1740876543 },
      },
      {
        id: 2,
        title: "대학생 서포터즈 5기 모집 (~3/15)",
        category: "서포터즈",
        createdAt: { seconds: 1740876000 },
      },
      {
        id: 3,
        title: "청년 취업 지원금 신청 안내 (정부 지원)",
        category: "취업",
        createdAt: { seconds: 1740875500 },
      },
      {
        id: 4,
        title: "스타트업 인턴십 프로그램 (신청 마감 D-3)",
        category: "인턴십",
        createdAt: { seconds: 1740875000 },
      },
      {
        id: 5,
        title: "2025 전국 디자인 공모전 (총상금 1억 원)",
        category: "공모전",
        createdAt: { seconds: 1740874500 },
      },
    ];
    setCurrentPosts(mockPosts);
  }, []);

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
              {currentDisplayedPosts.length > 0 ? (
                currentDisplayedPosts
                  .filter(Boolean) // ✅ undefined나 null 값 제거
                  .map((post) => (
                    <tr
                      key={post.id}
                      onClick={() => navigate(`/apply/${post.id}`)} // ✅ 클릭하면 상세 페이지로 이동
                      className={styles.clickableRow} // ✅ 클릭 가능한 스타일 추가
                    >
                      <td>{post.title || "-"}</td>
                      <td>{post.category || "-"}</td>
                      <td>
                        {post.createdAt
                          ? new Date(
                              post.createdAt.seconds * 1000
                            ).toLocaleDateString()
                          : "-"}
                      </td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td colSpan="3">공지사항이 없습니다.</td>
                </tr>
              )}
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
                onClick={() => navigate("/write3")} // ✅ 클릭 시 /write3로 이동
              >
                글쓰기
              </button>
            </div>
          )}
        </div>
      )}
      {user && (
        <div className={styles.logoutContainer}>
          <button className={styles.logoutButton} onClick={handleLogout}>
            로그아웃
          </button>
        </div>
      )}
    </div>
  );
}

export default Apply;
