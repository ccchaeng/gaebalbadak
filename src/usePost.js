import { db } from "./firebase";
import { collection, addDoc, serverTimestamp, getDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // ✅ Firebase 인증 가져오기

export const savePost = async (title, content, category, images, boardType) => {
  if (!title || !content) {
    alert("❌ 제목과 내용을 입력해주세요!");
    return;
  }

  try {
    console.log("🔥 Firestore 저장 시작...");

    const auth = getAuth(); 
    const user = auth.currentUser; // ✅ 현재 로그인한 사용자 가져오기
    let nickname = "익명"; // 기본값
    let authorUid = null;  // ✅ UID 저장할 변수 추가

    if (user) {
      authorUid = user.uid; // ✅ 사용자 UID 저장

      // ✅ Firestore에서 users 컬렉션에서 닉네임 가져오기
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        nickname = userSnap.data().nickname || "익명";
      }
    }

    const collectionName = boardType === "question" ? "posts_question" : "posts_collaboration";
    const postRef = collection(db, collectionName);

    const docRef = await addDoc(postRef, {
      title,
      content,
      category,
      images,
      nickname, // ✅ 닉네임 저장
      authorUid, // ✅ 사용자 UID 저장 (닉네임을 나중에 가져올 때 사용)
      createdAt: serverTimestamp(),
    });

    console.log("✅ Firestore 저장 완료! ID:", docRef.id);
    return docRef.id;

  } catch (error) {
    console.error("❌ 게시글 저장 중 오류 발생:", error);
    alert("게시글 등록에 실패했습니다.");
  }
};
