import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import styles from "./ProfileInfo.module.scss";

// 파이어베이스
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase"; // Firestore 인스턴스 가져오기
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

// 컴포넌트
import ProfileImage from "./ProfileImage";
import Button from "./Button";

const ProfileInfo = ({ user }) => {
    const [editing, setEditing] = useState(false); // 수정 모드 여부 관리
    const [nickname, setNickname] = useState(user.nickname); // 닉네임 상태 관리
    const [photo, setPhoto] = useState(user.photoURL); // 프로필 상태 관리
    const navigate = useNavigate(); // 페이지 이동

    // 이미지 파일 Base64로 변환하여 Firestore 저장
    const handleImageChange = (e) => {
        if (!e.target.files || e.target.files.length === 0) {
            console.error("파일이 선택되지 않았습니다.");
            return;
        }

        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = async () => {
            const base64String = reader.result; // Base64 변환된 이미지 데이터

            // 상태 업데이트 (UI 반영)
            setPhoto(base64String);

            // Firestore 업데이트
            try {
                const userDoc = doc(db, "users", user.uid);
                await updateDoc(userDoc, { photoURL: base64String });
            } catch (error) {
                console.error("이미지 저장 오류:", error);
            }
        };

        reader.readAsDataURL(file); // 파일을 Base64 형식으로 변환
    };

    // Firestore 사용자 정보 업데이트 함수
    const handleSave = async () => {
        // 사용자 정보 올바르게 제공 안 됐으면 업데이트 중지
        if (!user || !user.uid) {
            console.error("사용자 정보가 올바르지 않습니다.");
            return;
        }
    
        try {
            // Firestore에서 현재 로그인된 사용자의 문서 참조 가져옴
            const userDoc = doc(db, "users", user.uid);

            // 해당 문서 업데이트 (닉네임, 사진)
            await updateDoc(userDoc, {
                nickname: nickname,
                photoURL: photo
            });
    
            // Firestore 업데이트 후 로컬 상태도 변경 (UI 반영)
            user.nickname = nickname;
            user.photoURL = photo;
    
            setEditing(false); // 수정 모드 종료
            alert("프로필이 업데이트되었습니다!");
        } catch (error) {
            console.error("프로필 업데이트 오류:", error);
        }
    };

    // 로그아웃 기능
    const handleLogout = async () => {
        try {
            await signOut(auth); // Firebase 로그아웃
            navigate("/"); // 홈 화면으로 이동
        } catch (error) {
            console.error("로그아웃 오류:", error);
        }
    };
    

    return (
        <div className={styles.infoContainer}>
            {/* 사용자 프로필 이미지 */}
            <ProfileImage photoURL={photo} nickname={nickname} className={styles.image}/>

            {/* 수정 모드일 때만 이미지 파일 업로드 표시  */}
            {editing && <input type="file" accept="image/*" onChange={handleImageChange} />}

            {/* 사용자 정보 */}
            <div className={styles.profileDetails}>
                {editing ? ( // 수정 모드 시 닉네임 입력 필드 표시
                    <input type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} />
                ) : (
                    <p>{nickname}</p>
                )}

                <div className={styles.line} />
                <p>{user.email}</p>
                <div className={styles.line} />
                <p>열정 점수: {user.passionScore}</p>
                <div className={styles.line} />
                <p>티어 점수: {user.tier}</p>
            </div>

            <div className={styles.buttonContainer}>
                {editing ? (
                    <Button text="저장" onClick={handleSave} className={styles.saveButton} />
                ) : (
                    <Button text="수정" onClick={() => setEditing(true)} className={styles.editButton} />
                )}
                <Button text="로그아웃" onClick={handleLogout} className={styles.logoutButton} />
            </div>
        </div>
    );
};

export default ProfileInfo;
