import { db } from "./firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore"; // ✅ `collection` 추가

/**
 * 🔥 게시글 저장 함수 (게시판에 따라 다르게 저장)
 * @param {string} title - 제목
 * @param {string} content - 내용
 * @param {string} category - 선택된 모집 분야
 * @param {string[]} images - Base64 인코딩된 이미지 배열
 * @param {string} boardType - 게시판 타입 ("question" 또는 "collaboration")
 */
export const savePost = async (title, content, category, images, boardType) => {
  if (!title || !content) {
    alert("❌ 제목과 내용을 입력해주세요!");
    return;
  }

  try {
    console.log("🔥 Firestore 저장 시작...");
    
    // ✅ 게시판에 따라 Firestore 컬렉션을 다르게 지정
    const collectionName = boardType === "question" ? "posts_question" : "posts_collaboration";
    const postRef = collection(db, collectionName); // ✅ `collection` 오류 해결

    const docRef = await addDoc(postRef, {
      title,
      content,
      category,
      images, // ✅ Base64 이미지 저장
      createdAt: serverTimestamp(), // Firestore 서버 타임스탬프 추가
    });

    console.log("✅ Firestore 저장 완료! 문서 ID:", docRef.id);
    return docRef.id; // ✅ 저장된 문서 ID 반환 (postId)
  } catch (error) {
    console.error("❌ 게시글 저장 중 오류 발생:", error);
    alert("게시글 등록에 실패했습니다.");
  }
};
