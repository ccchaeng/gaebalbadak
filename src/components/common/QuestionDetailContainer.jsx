import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../firebase"; // ✅ Firestore 연결
import styles from "./QuestionDetailContainer.module.scss";

function QuestionDetailContainer() {
  const { postId } = useParams(); // ✅ URL에서 postId 가져오기
  const navigate = useNavigate();
  const location = useLocation();
  const [post, setPost] = useState(null); // ✅ 게시글 데이터 상태

  // 🔥 Firestore에서 특정 postId의 게시글 데이터 가져오기
  useEffect(() => {
    const fetchPost = async () => {
      if (!postId) return;
      try {
        // ✅ 게시판 종류에 따라 Firestore 컬렉션 변경
        const boardType = location.pathname.startsWith("/collaboration") 
          ? "posts_collaboration" 
          : "posts_question";

        const docRef = doc(db, boardType, postId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setPost(docSnap.data()); // ✅ Firestore에서 데이터 가져오기
        } else {
          console.error("❌ 게시글을 찾을 수 없습니다.");
        }
      } catch (error) {
        console.error("❌ 게시글 불러오기 실패:", error);
      }
    };

    fetchPost();
  }, [postId, location.pathname]);

  // ✅ post가 null이면 "로딩 중..."을 먼저 표시
  if (!post) {
    return <div className={styles.loading}>게시글을 불러오는 중...</div>;
  }

  return (
    <div className={styles.container}>
      {/* 🔥 상단 제목 & 뒤로 가기 버튼 */}
      <div className={styles.header}>
        <button className={styles.backButton} onClick={() => navigate(-1)}>←</button>
        <h2 className={styles.title}>{post.title}</h2>  {/* ✅ Firestore 제목 표시 */}
        <span className={styles.authorInfo}>
          {post.category} | {post.createdAt?.seconds ? new Date(post.createdAt.seconds * 1000).toLocaleDateString() : "날짜 없음"}
        </span>  {/* ✅ Firestore 카테고리 + 날짜 표시 */}
      </div>

      {/* 🔥 게시글 내용 */}
      <div className={styles.content}>
        <p className={styles.postContent}>{post.content}</p>  {/* ✅ Firestore 내용 표시 */}

        {/* 🔥 Firestore에 저장된 이미지 표시 */}
        {post.images && post.images.length > 0 && (
          <div className={styles.imageContainer}>
            {post.images.map((image, index) => (
              <img key={index} src={image} alt={`업로드된 이미지 ${index}`} className={styles.uploadedImage} />
            ))}
          </div>
        )}
      </div>

      {/* 🔥 댓글 입력 박스 (추후 기능 추가 가능) */}
      <div className={styles.inputBox}>
        <textarea placeholder="댓글을 입력하세요..." />
        <button>확인</button>
      </div>
    </div>
  );
}

export default QuestionDetailContainer;
