import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import styles from "./Box.module.scss";

const Box = ({ tabs, categoryTitle }) => { // ✅ `categoryTitle` 추가
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("전체");
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState([]);

  const postsPerPage = 3;

  useEffect(() => {
    const fetchPosts = async () => {
      const collectionName = location.pathname.startsWith("/question") 
        ? "posts_question" 
        : "posts_collaboration"; 

      try {
        const querySnapshot = await getDocs(collection(db, collectionName));
        const postData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setPosts(postData);
      } catch (error) {
        console.error("❌ Firestore 데이터 불러오기 실패:", error);
      }
    };

    fetchPosts();
  }, [location.pathname]);

  const filteredPosts = activeTab === "전체" ? posts : posts.filter(post => post.category === activeTab);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const handlePostClick = (postId) => {
    const detailPath = location.pathname.startsWith("/question") 
      ? `/question/${postId}` 
      : `/collaboration/${postId}`;
    navigate(detailPath);
  };

  const handleWriteClick = () => {
    if (location.pathname.startsWith("/question")) {
      navigate("/write");
    } else if (location.pathname.startsWith("/collaboration")) {
      navigate("/write2");
    }
  };

  return (
    <div className={styles.outerBox}>
      <div className={styles.innerBox1}>
        <span 
          className={styles.category} 
          onClick={() => { setActiveTab("전체"); setCurrentPage(1); }} 
          style={{ cursor: "pointer" }}
        >
          {categoryTitle} {/* ✅ 전달받은 "모집분야" 문구를 표시 */}
        </span>
        <div className={styles.tabContainer}>
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`${styles.tabButton} ${activeTab === tab ? styles.active : ""}`}
              onClick={() => {
                setActiveTab(tab);
                setCurrentPage(1);
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.innerBox2}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>제목</th>
              <th>언어</th>
              <th>글쓴이</th>
              <th>댓글</th>
              <th>👍</th>
              <th>채택 레벨 🔥</th>
              <th>작성일</th>
            </tr>
          </thead>
          <tbody>
            {currentPosts.length > 0 ? (
              currentPosts.map((post) => (
                <tr key={post.id} onClick={() => handlePostClick(post.id)} style={{ cursor: "pointer" }}>
                  <td>{post.title || "-"}</td>
                  <td>{post.language || "-"}</td>  
                  <td>{post.author || "-"}</td>
                  <td>{post.comments !== undefined ? post.comments : "-"}</td>
                  <td>{post.likes !== undefined ? post.likes : "-"}</td>
                  <td>{post.level || "-"}</td>
                  <td>{post.createdAt ? new Date(post.createdAt.seconds * 1000).toLocaleDateString() : "-"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">게시글이 없습니다.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {filteredPosts.length > 0 && (
        <div className={styles.pagination}>
          <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>이전</button>
          <span className={styles.pageNumbers}>
            {Array.from({ length: totalPages }, (_, i) => (
              <button key={i + 1} onClick={() => setCurrentPage(i + 1)} className={currentPage === i + 1 ? styles.activePage : ""}>
                {i + 1}
              </button>
            ))}
          </span>
          <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>다음</button>
        </div>
      )}

      <button className={styles.writeButton} onClick={handleWriteClick}>
        글쓰기
      </button>
    </div>
  );
};

export default Box;
