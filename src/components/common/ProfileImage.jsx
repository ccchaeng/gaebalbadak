import React from 'react';
import styles from "./ProfileImage.module.scss";
import default_profile from "/default_profile.png";

const ProfileImage = ({ photoURL, nickname, className }) => {
    return (
        <div className={`${styles.profileContainer} ${className}`}>
            <img
                src={photoURL && photoURL.startsWith("data:image/") ? photoURL : default_profile} // 올바른 Base64 형식인지 확인
                alt="프로필"
                className={styles.profileImage}
                title={nickname || "사용자"}
                onError={(e) => e.target.src = default_profile}
            />
        </div>
    );
};

export default ProfileImage;