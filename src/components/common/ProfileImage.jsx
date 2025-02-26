import React from 'react'
import styles from "./ProfileImage.module.scss"

import default_profile from "/default_profile.png"

const ProfileImage = ({ photoURL, nickname, className}) => {
    return (
        <div className={`${styles.profileContainer} ${className}`}>
            <img
                src={photoURL || default_profile }
                alt="프로필"
                className={styles.profileImage}
                title={nickname || "사용자"}
            />
        </div>
    )
}

export default ProfileImage