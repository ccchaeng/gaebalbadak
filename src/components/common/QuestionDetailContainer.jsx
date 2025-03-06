import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../firebase"; // ✅ Firestore 연결
import { addComment, listenToComments } from "../../hooks/useComments";
import styles from "./QuestionDetailContainer.module.scss";

function QuestionDetailContainer() {
  const { postId } = useParams(); // ✅ URL에서 postId 가져오기
  const navigate = useNavigate();
  const [post, setPost] = useState(null); // ✅ 게시글 데이터 상태
  const [comments, setComments] = useState([]); // ✅ 댓글 상태 추가
  const [newComment, setNewComment] = useState(""); // ✅ 입력된 댓글 상태

  // 🔥 Firestore에서 특정 postId의 게시글 데이터 가져오기
  useEffect(() => {
    const fetchPost = async () => {
      if (!postId) return;
      try {
        const docRef = doc(db, "posts", postId);
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
  }, [postId]);

    // ✅ Firestore에서 댓글 실시간 가져오기
    useEffect(() => {
      if (!postId) return;
  
      const unsubscribe = listenToComments(postId, setComments);
      return () => unsubscribe(); // ✅ 언마운트 시 구독 해제
    }, [postId]);
  
    // ✅ 댓글 추가 함수
    const handleAddComment = async () => {
      if (!newComment.trim()) return; // 빈 댓글 방지
  
      await addComment(postId, newComment, "사용자"); // 사용자 이름 (임시)
      setNewComment(""); // 입력창 비우기
    };

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

      <div className={styles.commentsContainer}>
  {comments.map((comment) => (
    <div key={comment.id} className={styles.commentBox}>  {/* ✅ 박스 추가 */}
      <p className={styles.commentNickname}>{comment.nickname || "익명"}</p>  {/* ✅ 닉네임 스타일 적용 */}
      <p>{comment.content}</p>
      <span className={styles.commentDate}>
        {comment.createdAt?.seconds 
          ? new Date(comment.createdAt.seconds * 1000).toLocaleString() 
          : "방금 전"}
      </span>
    </div>
  ))}
</div>



      {/* 🔥 댓글 입력 박스 */}
      <div className={styles.inputBox}>
        <textarea 
          placeholder="댓글을 입력하세요..." 
          value={newComment} 
          onChange={(e) => setNewComment(e.target.value)} 
        />
        <button onClick={handleAddComment}>확인</button>
      </div>
      </div>
  );
}

export default QuestionDetailContainer;