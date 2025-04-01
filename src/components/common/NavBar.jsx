import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./NavBar.module.scss";

import default_profile from "/default_profile.png"

// 컴포넌트
import ProfileImage from "./ProfileImage";

// Firebase
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

import useAuth from "../../hooks/useAuth";

function NavBar({ className = "" }) {
  const { user } = useAuth(); // 로그인한 유저 정보
  const [profile, setProfile] = useState({ nickname: "", photoURL: "" });

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfile(docSnap.data());
        }
      }
    };

    fetchProfile();
  }, [user]);

  return (
    <nav className={`${styles.navBar} ${className}`}>
      <Link to="/question">질문할래</Link>
      <Link to="/collaboration">같이할래</Link>
      <Link to="/apply">신청할래</Link>

      <div className={styles.authGroup}>
        {user ? (
          <div className={styles.profileContainer}>
            <Link to={`/profile/${user.uid}`}>
              <ProfileImage
                photoURL={profile.photoURL || default_profile}
                nickname={profile.nickname}
                className={styles.image}
              />
            </Link>
          </div>
        ) : (
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
