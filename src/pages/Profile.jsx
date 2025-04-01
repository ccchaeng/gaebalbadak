import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom"
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import styles from "./Profile.module.scss";

import useAuth from "../hooks/useAuth"; // 현재 로그인된 사용자의 uid 가져오기 위함

// 컴포넌트
import bannerImage from "../assets/banner3.jpg";
import Banner from "../components/common/Banner";
import SearchBar from "../components/common/SearchBar";
import ProfileInfo from '../components/common/ProfileInfo';
import ProfileBio from '../components/common/ProfileBio';
import ProfileProject from '../components/common/ProfileProject';

const Profile = () => {
  const { userId } = useParams();
  const { user: loggedInUser } = useAuth();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!userId) return;

      try {
        const userRef = doc(db, "users", userId);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUser({ uid: userId, ...userSnap.data() });
        } else {
          console.error("사용자 정보를 찾을 수 없습니다.");
        }
      } catch (error) {
        console.error("사용자 정보 불러오기 오류:", error);
      }
    };

    fetchUserInfo();
  }, [userId]);

  if (!user) {
    return <p>사용자 정보를 불러오는 중입니다...</p>;
  }


  return (
    <div className={styles.profileContainer}>
      {/* 배너 */}
      <div className={styles.bannerWrapper}>
        <Banner
          image={bannerImage}
          title="개발자들의 바닥까지 파헤치는 공간,"
          description="세상을 움직이는 코드, 여기서 시작됩니다."
          className={styles.customBanner}
        />
        <div className={styles.searchBarOverlay}>
          <SearchBar />
        </div>
      </div>

      <div className={styles.infoContainer}>
        {/* 프로필 정보 */}
        <ProfileInfo user={user} />
        {/* 프로필 자기소개 */}
        <ProfileBio user={user} />
      </div>
      <div>
        {/* 프로필 프로젝트란 */}
        <ProfileProject user={user} />
      </div>
    </div>
  );
};

export default Profile;
