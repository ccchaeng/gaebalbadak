import { db, auth } from "./firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  getDoc,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

/**
 * 🔥 Firestore에서 사용자 정보 가져오기 (닉네임 & 프로필 사진)
 * @param {string} userId - 사용자 UID
 * @returns {Promise<Object|null>} - 사용자 정보 객체 또는 null
 */
export const getUserInfo = async (userId) => {
  if (!userId) return null;
  try {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      return userSnap.data(); // ✅ 닉네임 & 프로필 사진 포함
    } else {
      console.log("❌ 사용자 정보를 찾을 수 없습니다.");
      return null;
    }
  } catch (error) {
    console.error("❌ 사용자 정보 가져오기 오류:", error.message);
    return null;
  }
};

/**
 * 🔥 Firestore에 댓글 추가 (닉네임 & 프로필 사진 포함)
 * @param {string} postId - 게시글 ID
 * @param {string} boardType - "posts_question" 또는 "posts_collaboration"
 * @param {string} commentText - 댓글 내용
 */
export const addComment = async (postId, boardType, commentText) => {
  if (!postId || !commentText.trim()) return;

  const user = auth.currentUser;
  if (!user) {
    alert("로그인 후 댓글을 작성할 수 있습니다.");
    return;
  }

  try {
    // ✅ Firestore에서 사용자 정보 가져오기
    const userInfo = await getUserInfo(user.uid);
    const nickname = userInfo?.nickname || "익명"; // 닉네임 없으면 익명
    const profileImage = userInfo?.profileImage || ""; // 프로필 사진 없으면 빈 값

    // ✅ 올바른 게시판 경로에 댓글 추가
    await addDoc(collection(db, boardType, postId, "comments"), {
      content: commentText,
      userId: user.uid,
      nickname: nickname,
      profileImage: profileImage, // ✅ 프로필 사진 추가
      createdAt: serverTimestamp(),
    });

    console.log("✅ 댓글이 성공적으로 추가되었습니다.");
  } catch (error) {
    console.error("❌ 댓글 추가 실패:", error.message);
  }
};

/**
 * 🔥 Firestore에서 댓글 실시간 가져오기
 * @param {string} postId - 게시글 ID
 * @param {string} boardType - "posts_question" 또는 "posts_collaboration"
 * @param {Function} setComments - 댓글 목록을 업데이트하는 상태 함수
 * @returns {Function} - Firestore 구독 해제 함수
 */
export const listenToComments = (postId, boardType, setComments) => {
  if (!postId) return () => {};

  try {
    const q = query(
      collection(db, boardType, postId, "comments"),
      orderBy("createdAt", "asc")
    );

    // ✅ 실시간 댓글 업데이트
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const commentsArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComments(commentsArray);
    });

    return unsubscribe; // ✅ Firestore 구독 해제 함수 반환
  } catch (error) {
    console.error("❌ 댓글 불러오기 실패:", error.message);
    return () => {};
  }
};
