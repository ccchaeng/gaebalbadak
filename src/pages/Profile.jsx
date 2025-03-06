import React from 'react';
import styles from "./Profile.module.scss";

import useAuth from "../hooks/useAuth"; // 현재 로그인된 사용자의 uid 가져오기 위함

// 컴포넌트
import bannerImage from "../assets/banner3.jpg";
import Banner from "../components/common/Banner";
import SearchBar from "../components/common/SearchBar";
import ProfileInfo from '../components/common/ProfileInfo';

const Profile = () => {
  const { user } = useAuth();

  if (!user) {
    return <p>로그인이 필요합니다.</p>;
  }

  const userInfo = {
    nickname: user.displayName || "익명",
    email: user.email,
    photoURL: user.photoURL,
    passionScore: 243,  // 예시 (실제 데이터 연동 필요)
    tier: "골드",       // 예시 (실제 데이터 연동 필요)
  };

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

      {/* 프로필 정보 */}
      <ProfileInfo user={user} />
    </div>
  );
};

export default Profile;
