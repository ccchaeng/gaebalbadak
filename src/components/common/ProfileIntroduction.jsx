import React, { useState } from 'react'
import styles from './ProfileIntroduction.module.scss'

// 컴포넌트
import Button from './Button'

const ProfileIntroduction = ({ intro, onSave }) => {
    const [isEdit, setEdit] = useState(false);
    const [editIntro, setEditIntro] = useState(intro);

    return (
        <div className={styles.introContainer}>
            {isEdit ? (
                <textarea value={editIntro} onChange={(e) => setEditedBio(e.target.value)} className={styles.textarea} />
            ) : (
                <p className={styles.introText}>{intro}</p>
            )}
            <Button text={isEdit ? "저장" : "수정"} onClick={() => {
                if (isEdit) onSave(editIntro);
                setIsEditing(!isEdit);
            }} />
        </div>
    );
}

export default ProfileIntroduction