import React, { useState, useEffect, useRef } from 'react';
import styles from './ProfileProject.module.scss';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import Button from './Button';

const ProfileProject = ({ user }) => {
    const [projects, setProjects] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [editModes, setEditModes] = useState([]);
    const fileInputRefs = useRef([]);

    useEffect(() => {
        const fetchProjects = async () => {
            if (!user) return;
            const userDoc = doc(db, "users", user.uid);
            const userSnap = await getDoc(userDoc);

            if (userSnap.exists()) {
                const data = userSnap.data();
                setProjects(data.projects || []);
                setEditModes(Array(data.projects.length).fill(false));
            } else {
                setProjects([]);
            }
        };

        fetchProjects();
    }, [user]);

    useEffect(() => {
        fileInputRefs.current = projects.map((_, i) => fileInputRefs.current[i] || React.createRef());
    }, [projects]);

    const handleAddProject = async () => {
        if (!user) return;

        const newProject = {
            image: "",
            description: "새 프로젝트 설명을 입력하세요.",
        };

        const updatedProjects = [...projects, newProject];
        const userDoc = doc(db, "users", user.uid);
        await updateDoc(userDoc, { projects: updatedProjects });

        setProjects(updatedProjects);
        setEditModes([...editModes, false]);
    };

    const handleImageUpload = async (index, event) => {
        if (!user || !editModes[index]) return;

        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = async () => {
            const base64Image = reader.result;

            const updatedProjects = [...projects];
            updatedProjects[index].image = base64Image;

            const userDoc = doc(db, "users", user.uid);
            await updateDoc(userDoc, { projects: updatedProjects });

            setProjects(updatedProjects);
        };
    };

    const handleDescriptionChange = (index, newDescription) => {
        if (!user || !editModes[index]) return;
    
        // Firestore 업데이트 대신, 상태만 변경
        const updatedProjects = [...projects];
        updatedProjects[index].description = newDescription;
        setProjects(updatedProjects);
    };
    
    const toggleEditMode = async (index) => {
        // 수정 모드를 끄는 경우에만 Firestore 업데이트 실행
        if (editModes[index]) {
            if (!user) return;
    
            const userDoc = doc(db, "users", user.uid);
            await updateDoc(userDoc, { projects });
        }
    
        // 수정 모드 토글
        setEditModes(editModes.map((mode, i) => (i === index ? !mode : mode)));
    };
    

    const handleDeleteProject = (index) => {
        if (!user) return;
    
        const confirmDelete = window.confirm("해당 프로젝트를 삭제하시겠습니까?");
        
        if (!confirmDelete) return;
    
        const updatedProjects = [...projects];
        updatedProjects.splice(index, 1);
    
        setProjects(updatedProjects);
    
        const userDoc = doc(db, "users", user.uid);
        updateDoc(userDoc, { projects: updatedProjects })
            .then(() => console.log("프로젝트 삭제 완료"))
            .catch((error) => console.error("삭제 오류:", error));
    };
    

    const nextSlide = () => {
        if (currentIndex < projects.length - 3) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const prevSlide = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    return (
        <div className={styles.projectContainer}>
            <h2>Projects</h2>
            <div className={styles.carousel}>
                <button className={styles.arrow} onClick={prevSlide} disabled={currentIndex === 0}>{"<"}</button>

                <div className={styles.projectList}>
                    {projects.slice(currentIndex, currentIndex + 3).map((project, index) => (
                        <div key={index} className={styles.projectCard}>
                            <div className={styles.imageContainer}>
                                <input
                                    type="file"
                                    accept="image/*"
                                    ref={(el) => (fileInputRefs.current[index] = el)}
                                    style={{ display: "none" }}
                                    onChange={(event) => handleImageUpload(index, event)}
                                    disabled={!editModes[index]}
                                />
                                {project.image ? (
                                    <img src={project.image} alt="프로젝트 이미지" className={styles.projectImage} />
                                ) : (
                                    <Button
                                        className={styles.uploadButton}
                                        text="+"
                                        onClick={() => {
                                            if (editModes[index]) fileInputRefs.current[index]?.click();
                                        }}
                                        disabled={!editModes[index]}
                                    />
                                )}
                                {editModes[index] && project.image && (
                                    <Button
                                        className={styles.changeImageButton}
                                        text="이미지 변경"
                                        onClick={() => fileInputRefs.current[index]?.click()}
                                    />
                                )}

                            </div>
                            <textarea
                                className={styles.description}
                                value={project.description}
                                onChange={(e) => handleDescriptionChange(index, e.target.value)}
                                disabled={!editModes[index]}
                            />
                            <div className={styles.buttonContainer}>
                                <Button
                                    className={styles.editButton}
                                    text={editModes[index] ? "저장" : "수정"}
                                    onClick={() => toggleEditMode(index)}
                                />
                                <Button
                                    className={styles.deleteButton}
                                    text="삭제"
                                    onClick={() => handleDeleteProject(index)}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                <button className={styles.arrow} onClick={nextSlide} disabled={projects.length <= 3 || currentIndex >= projects.length - 3}>{">"}</button>
            </div>

            <Button className={styles.addProjectButton} text="새 프로젝트 추가" onClick={handleAddProject} />
        </div>
    );
};

export default ProfileProject;
