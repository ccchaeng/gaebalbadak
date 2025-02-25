import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./NavBar.module.scss";
import default_profile from "/default_profile.png"

// Firebase 관련 기능
import { auth, db } from "../../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

function NavBar({ className = "" }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({ nickname: "", photoURL: "" });

  // 로그인 상태 확인과 사용자 정보 불러오기
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) setProfile(docSnap.data());
        setUser(currentUser);
      } else setUser(null);
    });

    return () => unsubscribe();
  }, []);

  return (
    <nav className={`${styles.navBar} ${className}`}>
      <Link to="/question">질문할래</Link>
      <Link to="/collaboration">같이할래</Link>
      <Link to="/apply">신청할래</Link>

      <div className={styles.authGroup}>
        {/* 로그인 했을 경우 프로필만 보이게 */}
        {user ? (
          <>
            <div className={styles.profileContainer}>
              <Link to="/profile">
                <img
                  src={profile.photoURL || default_profile}
                  alt="프로필"
                  className={styles.profileImage}
                  title={profile.nickname || "사용자"}
                />
              </Link>
            </div>
          </>
        ) : (
          // 로그인 안 했을 경우 로그인, 회원가입 버튼 보이게
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">
              <button className={styles.authButton}>Sign Up</button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
