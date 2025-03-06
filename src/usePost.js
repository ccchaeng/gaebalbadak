import { db } from "./firebase"; // Firebase 설정 가져오기
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

/**
 * 🔥 게시글 저장 함수 (Base64 이미지 저장)
 * @param {string} title - 제목
 * @param {string} content - 내용
 * @param {string} category - 선택된 모집 분야
 * @param {string[]} images - Base64 인코딩된 이미지 배열
 */
export const savePost = async (title, content, category, images) => {
  if (!title || !content) {
    alert("❌ 제목과 내용을 입력해주세요!");
    return;
  }

  try {
    console.log("🔥 Firestore 저장 시작...");

    // 🔹 Firestore에 데이터 저장 (Base64 이미지 포함)
    const postRef = collection(db, "posts");
    await addDoc(postRef, {
      title,
      content,
      category,
      images, // ✅ Base64 이미지 저장
      createdAt: serverTimestamp(), // Firestore 서버 타임스탬프 추가
    });

    alert("✅ 게시글이 성공적으로 등록되었습니다!");
    console.log("✅ Firestore 저장 완료!");

  } catch (error) {
    console.error("❌ 게시글 저장 중 오류 발생:", error);
    alert("게시글 등록에 실패했습니다.");
  }
};
