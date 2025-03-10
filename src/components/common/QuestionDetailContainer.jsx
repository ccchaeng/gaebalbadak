import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { addComment, listenToComments } from "../../firebaseUtils"; // ✅ 댓글 기능 추가
import styles from "./QuestionDetailContainer.module.scss";
import ProfileImage from "./ProfileImage";

function QuestionDetailContainer() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]); // ✅ 댓글 상태 추가
  const [commentText, setCommentText] = useState(""); // ✅ 댓글 입력 상태

  const boardType = location.pathname.startsWith("/collaboration")
    ? "posts_collaboration"
    : "posts_question";

  // ✅ Firestore에서 게시글 데이터 가져오기
  useEffect(() => {
    const fetchPost = async () => {
      if (!postId) return;
      try {
        const docRef = doc(db, boardType, postId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setPost(docSnap.data());
        } else {
          console.error("❌ 게시글을 찾을 수 없습니다.");
        }
      } catch (error) {
        console.error("❌ 게시글 불러오기 실패:", error);
      }
    };

    fetchPost();
  }, [postId, boardType]);

  // ✅ Firestore에서 댓글 가져오기 (실시간 업데이트)
  useEffect(() => {
    if (!postId) return;
    const unsubscribe = listenToComments(postId, boardType, setComments);
    return () => unsubscribe(); // ✅ 언마운트 시 Firestore 구독 해제
  }, [postId, boardType]);

  // ✅ 댓글 추가 핸들러
  const handleAddComment = async () => {
    if (!commentText.trim()) return;
    await addComment(postId, boardType, commentText);
    setCommentText(""); // ✅ 입력 후 초기화
  };

  // ✅ 로딩 화면
  if (!post) {
    return <div className={styles.loading}>게시글을 불러오는 중...</div>;
  }

  return (
    <div className={styles.container}>
      {/* 🔥 상단 제목 & 뒤로 가기 버튼 */}
      <div className={styles.header}>
        <button className={styles.backButton} onClick={() => navigate(-1)}>
          ←
        </button>
        <h2 className={styles.title}>{post.title}</h2>
        <span className={styles.authorInfo}>
          {post.category} |{" "}
          {post.createdAt?.seconds
            ? new Date(post.createdAt.seconds * 1000).toLocaleDateString()
            : "날짜 없음"}
        </span>
      </div>

      {/* 🔥 게시글 내용 */}
      <div className={styles.content}>
        <p className={styles.postContent}>{post.content}</p>
        {post.images && post.images.length > 0 && (
          <div className={styles.imageContainer}>
            {post.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`업로드된 이미지 ${index}`}
                className={styles.uploadedImage}
              />
            ))}
          </div>
        )}
      </div>

      {/* 🔥 댓글 목록 */}
      <div className={styles.commentsSection}>
        <h3>댓글</h3>
        {comments.length > 0 ? (
         <ul className={styles.commentsList}>
         {comments.map((comment) => (
           <li key={comment.id} className={styles.commentItem}>
             {/* ✅ 프로필 이미지 표시 */}
             <ProfileImage 
               photoURL={comment.profileImage} 
               nickname={comment.nickname} 
               className={styles.profileImage}
             />
       
             {/* ✅ 닉네임 & 댓글 내용 */}
             <div className={styles.commentContentBox}>
               <div className={styles.commentHeader}>
                 <span className={styles.nickname}>{comment.nickname}</span>
                 <span className={styles.commentDate}>
                   {comment.createdAt?.seconds
                     ? new Date(comment.createdAt.seconds * 1000).toLocaleString()
                     : "방금 전"}
                 </span>
               </div>
               <p className={styles.commentContent}>{comment.content}</p>
             </div>
           </li>
         ))}
       </ul>
              
        ) : (
          <p>아직 댓글이 없습니다.</p>
        )}
      </div>

      {/* 🔥 댓글 입력 박스 */}
      <div className={styles.inputBox}>
        <textarea
          placeholder="댓글을 입력하세요..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <button onClick={handleAddComment}>확인</button>
      </div>
    </div>
  );
}

export default QuestionDetailContainer;