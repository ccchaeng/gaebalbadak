import React, { useState } from 'react';
import styles from "./Profile.module.scss";

// 컴포넌트
import bannerImage from "../assets/banner3.jpg";
import Banner from "../components/common/Banner";
import SearchBar from "../components/common/SearchBar";
import ProfileInfo from '../components/common/ProfileInfo';
import ProfileIntroduction from '../components/common/ProfileIntroduction';
import ProfileProject from '../components/common/ProfileProject';

const Profile = () => {
  // 임시 사용자 정보
  const [user, setUser] = useState({
    photoURL: "/profile-example.png",
    nickname: "KIMCHACHA",
    email: "KIMCHACHA@naver.com",
    passionScore: 243,
    tier: "골드",
    intro: "3D 게임 개발을 향해 나아가는 예비 개발자 🎮 Unity & 알고리즘 탐구",
    projects: [
      { image: "/project1.png", description: "Unity로 만든 아케이드 게임" },
      { image: "/project2.png", description: "캘린더 앱" },
    ],
  });

  // 자기소개 수정 핸들러
  const updateIntro = (newIntro) => setUser({ ...user, intro: newIntro });

  // 프로젝트 추가 핸들러 (임시 데이터)
  const addProject = () => {
    setUser({
      ...user,
      projects: [...user.projects, {image: "", description: "새로운 프로젝트"}],
    });
  };

  return (
    <div className={styles.homeContainer}>
      {/* 배너 (검색창 포함) */}
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

      <div className={styles.profileContent}>
        <ProfileInfo user={user} onEdit={() => console.log("프로필 수정 기능 추가 예정")} />
        <ProfileIntroduction intro={user.intro} onSave={updateIntro} />
      </div>

      <ProfileProject projects={user.projects} onAddProject={addProject}/>
    </div>
  );
}

export default Profile;
