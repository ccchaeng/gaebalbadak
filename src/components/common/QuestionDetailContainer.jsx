import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import styles from "./QuestionDetailContainer.module.scss";

// Firebase
import { getDoc, doc } from "firebase/firestore";
import { db, auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { addComment, listenToComments, editComment, deleteComment } from "../../firebaseUtils"; // ✅ 댓글 기능 추가

// 컴포넌트
import ProfileImage from "./ProfileImage";
import Button from "./Button";

function QuestionDetailContainer() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]); // ✅ 댓글 상태 추가
  const [commentText, setCommentText] = useState(""); // ✅ 댓글 입력 상태

  const [currentUserId, setCurrentUserId] = useState(null);
  const [editingComment, setEditingComment] = useState(null);
  const [editedText, setEditedText] = useState("");

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

  // 현재 로그인한 사용자의 ID 가져오기
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUserId(user.uid);
      } else {
        setCurrentUserId(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // ✅ 댓글 추가 핸들러
  const handleAddComment = async () => {
    if (!commentText.trim()) return;
    await addComment(postId, boardType, commentText);
    setCommentText(""); // ✅ 입력 후 초기화
  };

  // 댓글 수정 핸들러
  const handleEditComment = (comment) => {
    setEditingComment(comment.id);
    setEditedText(comment.content);
  };

  const handleSaveEdit = async (commentId) => {
    if (!editedText.trim()) return;

    try {
      await editComment(postId, boardType, commentId, editedText);
      setEditingComment(null);
      setEditedText("");
    } catch (error) {
      console.log("handleSaveEdit, 댓글 수정 실패: ", error);
    }
  };

  // 댓글 삭제 핸들러
  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(postId, boardType, commentId);
    } catch (error) {
      console.log("handleDeleteComment, 댓글 삭제 실패: ", error);
    }
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
                <div onClick={() => navigate(`/profile/${comment.userId}`)}>
                  <ProfileImage
                    photoURL={comment.profileImage}
                    nickname={comment.nickname}
                    className={styles.profileImage}
                  />
                </div>

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

                  {/* 댓글 수정 모드 */}
                  {editingComment === comment.id ? (
                    <div className={styles.editMode}>
                      <textarea
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                      />
                      <Button text="저장" className={styles.saveButton} onClick={() => handleSaveEdit(comment.id)} />
                      <Button text="취소" className={styles.cancelButton} onClick={() => setEditingComment(null)} />
                    </div>
                  ) : (
                    <p className={styles.commentContent}>{comment.content}</p>
                  )}

                  {/* 댓글 수정 및 삭제 버튼 */}
                  {currentUserId === comment.userId && (
                    <div className={styles.commentActions}>
                      {editingComment !== comment.id ? (
                        <>
                          <Button text="수정" className={styles.editButton} onClick={() => handleEditComment(comment)} />
                          <Button text="삭제" className={styles.deleteButton} onClick={() => handleDeleteComment(comment.id)} />
                        </>
                      ) : null}
                    </div>
                  )}
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