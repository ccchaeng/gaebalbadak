import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase"; // ✅ Firebase 설정 불러오기

export const getUserInfo = async (userId) => {
  if (!userId) return null;
  try {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      return userSnap.data(); // ✅ 닉네임 & 프로필 사진 반환
    } else {
      console.log("사용자 정보를 찾을 수 없습니다.");
      return null;
    }
  } catch (error) {
    console.error("사용자 정보 가져오기 오류:", error);
    return null;
  }
};
