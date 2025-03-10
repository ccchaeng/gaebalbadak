import React, { useState, useEffect } from 'react'
import styles from './ProfileBio.module.scss'

// firebase
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase'

// 컴포넌트
import Button from './Button'

const ProfileBio = ({ user }) => {
    const [bio, setBio] = useState("자기소개를 입력하세요.");
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        const fetchBio = async () => {
            if (!user) return;
            const userDoc = doc(db, "users", user.uid);
            const userSnap = await getDoc(userDoc);

            if (userSnap.exists()) {
                setBio(userSnap.data().bio || "자기소개를 입력하세요.");
            }
        };

        fetchBio();
    }, [user]);

    const handleSave = async () => {
        if (!user) return;

        const userDoc = doc(db, "users", user.uid);
        await updateDoc(userDoc, { bio });

        setEditing(false);
        alert("자기소개가 수정되었습니다.");
    };

    return (
        <div className={styles.bioContainer}>
            {editing ? (
                <textarea
                    className={styles.bioInput}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                />
            ) : (
                <p className={styles.bioText}>{bio}</p>
            )}

            {editing ? (
                <Button text="저장" onClick={handleSave} className={styles.saveButton} />
            ) : (
                <Button text="수정" onClick={() => setEditing(true)} className={styles.editButton} />
            )}
        </div>
    )
}

export default ProfileBio