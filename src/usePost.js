import { db } from "./firebase"; // ✅ Firestore 설정 가져오기
import { collection, addDoc, serverTimestamp, getDoc, doc } from "firebase/firestore";

/**
 * 🔥 특정 게시글 가져오기 (Firestore에서 postId로 조회)
 */
export const getPostById = async (postId) => {  // ✅ 함수가 export되고 있는지 확인!
  try {
    const docRef = doc(db, "posts", postId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.error("❌ 해당 게시글을 찾을 수 없습니다.");
      return null;
    }
  } catch (error) {
    console.error("❌ Firestore에서 게시글 불러오기 실패:", error);
    return null;
  }
};

/**
 * 🔥 게시글 저장 함수 (Firestore에 저장)
 */
export const savePost = async (title, content, category, images) => {
  if (!title || !content) {
    alert("❌ 제목과 내용을 입력해주세요!");
    return null;
  }

  try {
    console.log("🔥 Firestore 저장 시작...");
    
    const postRef = collection(db, "posts");
    const docRef = await addDoc(postRef, {
      title,
      content,
      category,
      images, // ✅ Base64 이미지 저장
      createdAt: serverTimestamp(),
    });

    console.log("✅ Firestore 저장 완료! postId:", docRef.id);
    return docRef.id; // ✅ 저장된 postId 반환

  } catch (error) {
    console.error("❌ 게시글 저장 중 오류 발생:", error);
    alert("게시글 등록에 실패했습니다.");
    return null;
  }
};
