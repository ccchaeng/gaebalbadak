import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ useNavigate 추가
import styles from "./Box.module.scss";

const tabs = ["전체", "Web", "App", "Unity", "Unreal Engine", "JavaScript", "Kotlin", "PHP", "TypeScript", "기타"];

// 더미 데이터
const posts = [
  { title: "React 프로젝트 모집", lang: "JavaScript", author: "Alice", comments: 3, likes: 10, level: "🔥🔥", date: "2024-02-28", category: "Web" },
  { title: "Kotlin 개발자 구함", lang: "Kotlin", author: "Bob", comments: 1, likes: 5, level: "🔥", date: "2024-02-27", category: "Kotlin" },
  { title: "유니티 개발자 모집", lang: "C#", author: "Charlie", comments: 2, likes: 8, level: "🔥🔥🔥", date: "2024-02-26", category: "Unity" },
  { title: "PHP 개발팀 구성", lang: "PHP", author: "David", comments: 4, likes: 12, level: "🔥🔥", date: "2024-02-25", category: "PHP" },
  { title: "TypeScript 프로젝트", lang: "TypeScript", author: "Eve", comments: 2, likes: 7, level: "🔥", date: "2024-02-24", category: "TypeScript" }
];

const Box = () => {
  const navigate = useNavigate(); // ✅ useNavigate 훅 사용
  const [activeTab, setActiveTab] = useState("전체");
  const [currentPage, setCurrentPage] = useState(1);

  const postsPerPage = 3; // 한 페이지에 보여줄 게시글 수
  const filteredPosts = activeTab === "전체" ? posts : posts.filter(post => post.category === activeTab);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  // ✅ 글쓰기 버튼 클릭 시 /write 페이지로 이동
  const handleWriteClick = () => {
    navigate("/write");
  };

  return (
    <div className={styles.outerBox}>
      {/* 🔹 모집 분야 & 탭 버튼 리스트 */}
      <div className={styles.innerBox1}>
        <span className={styles.category} onClick={() => { setActiveTab("전체"); setCurrentPage(1); }} style={{ cursor: "pointer" }}>
          모집분야
        </span>
        <div className={styles.tabContainer}>
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`${styles.tabButton} ${activeTab === tab ? styles.active : ""}`}
              onClick={() => {
                setActiveTab(tab);
                setCurrentPage(1); // 탭 변경 시 페이지 초기화
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* 🔹 데이터 테이블 */}
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
              currentPosts.map((post, index) => (
                <tr key={index}>
                  <td>{post.title}</td>
                  <td>{post.lang}</td>
                  <td>{post.author}</td>
                  <td>{post.comments}</td>
                  <td>{post.likes}</td>
                  <td>{post.level}</td>
                  <td>{post.date}</td>
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

      {/* 🔹 페이지네이션 */}
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

      {/* 🔹 글쓰기 버튼 */}
      <button className={styles.writeButton} onClick={handleWriteClick}>
        글쓰기
      </button>
    </div>
  );
};

export default Box;
