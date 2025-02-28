import React from 'react';
import styles from "./ProfileImage.module.scss";
import default_profile from "/default_profile.png";

const ProfileImage = ({ photoURL, nickname, className }) => {
    return (
        <div className={`${styles.profileContainer} ${className}`}>
            <img
                src={photoURL && photoURL !== "" ? photoURL : default_profile}
                alt="프로필"
                className={styles.profileImage}
                title={nickname || "사용자"}
                onError={(e) => e.target.src = default_profile}
            />
        </div>
    );
};

export default ProfileImage;