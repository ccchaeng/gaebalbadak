import React, { useState } from 'react'
import styles from './ProfileInfo.module.scss'

// 컴포넌트
import Button from './Button'
import ProfileImage from './ProfileImage'

const ProfileInfo = ({ user, onEdit }) => {
    return (
        <div className={styles.profileContainer}>
            {/* 프로필 이미지 */}
            <ProfileImage
                photoURL={user.photoURL}
                nickname={user.nickname}
                className={styles.ProfileImage} />
            {/* 사용자 디테일 정보 */}
            <div className={styles.profileDetails}>
                <p>{user.nickname}</p>
                <p>{user.email}</p>
                <p>열정 점수: </p>
                <p>티어: </p>
            </div>
            {/* 프로필 수정 버튼 */}
            <Button text="수정" onClick={onEdit} className={styles.editButton}/>
        </div>
    )
}

export default ProfileInfo