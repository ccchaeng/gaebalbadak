import { db } from "../firebase";
import { collection, addDoc, serverTimestamp, doc, getDoc, query, orderBy, onSnapshot } from "firebase/firestore"; // ✅ Firestore에서 필요한 함수 추가
import { auth } from "../firebase"; // Firebase 인증 가져오기

// ✅ Firestore에 댓글 추가 (닉네임 포함)
export const addComment = async (postId, commentText) => {
  if (!postId || !commentText.trim()) return;

  const user = auth.currentUser; // 현재 로그인한 사용자 가져오기
  if (!user) {
    alert("로그인 후 댓글을 작성할 수 있습니다.");
    return;
  }

  try {
    // 🔥 Firestore에서 로그인한 사용자의 닉네임 가져오기
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);
    const nickname = userSnap.exists() ? userSnap.data().nickname : "익명"; // 닉네임이 없으면 "익명" 사용

    await addDoc(collection(db, "posts", postId, "comments"), {
      content: commentText,
      userId: user.uid,
      nickname: nickname, // ✅ 닉네임 저장
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("❌ 댓글 추가 실패:", error);
  }
};

// ✅ 댓글 가져오는 함수 (실시간 업데이트)
export const listenToComments = (postId, setComments) => {
  if (!postId) return;

  const q = query(collection(db, "posts", postId, "comments"), orderBy("createdAt", "asc")); // ✅ query가 이제 정상적으로 동작

  return onSnapshot(q, (querySnapshot) => {
    const commentsArray = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setComments(commentsArray);
  });
};
