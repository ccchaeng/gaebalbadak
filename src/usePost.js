import { db } from "./firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

/**
 * 🔥 게시글 저장 함수 (게시판에 따라 다르게 저장)
 */
export const savePost = async (title, content, category, images, boardType) => {
  if (!title || !content) {
    alert("❌ 제목과 내용을 입력해주세요!");
    return null;
  }

  try {
    console.log("🔥 Firestore 저장 시작...");
    
    // ✅ 게시판에 따라 Firestore 컬렉션 다르게 지정
    const collectionName = boardType === "question" ? "posts_question" : "posts_collaboration";
    const postRef = collection(db, collectionName);

    const docRef = await addDoc(postRef, {
      title,
      content,
      category,
      images, 
      createdAt: serverTimestamp(),
    });

    console.log("✅ Firestore 저장 완료! postId:", docRef.id);  // ✅ 저장된 postId 콘솔 출력
    return docRef.id; // ✅ 저장된 postId 반환

  } catch (error) {
    console.error("❌ 게시글 저장 중 오류 발생:", error);
    alert("게시글 등록에 실패했습니다.");
    return null;
  }
};
