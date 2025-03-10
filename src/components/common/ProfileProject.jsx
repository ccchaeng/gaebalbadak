import React, { useState, useEffect, useRef } from 'react'
import styles from './ProfileProject.module.scss'

// firebase
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase'

// 컴포넌트
import Button from './Button'

const ProfileProject = ({ user }) => {
    const [projects, setProjects] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const fileInputRefs = useRef([]);

    useEffect(() => {
        const fetchProjects = async () => {
            if (!user) return;

            const userDoc = doc(db, "users", user.uid);
            const userSnap = await getDoc(userDoc);

            if (userSnap.exists()) {
                const data = userSnap.data();
                setProjects(data.projects || []);
            } else {
                setProjects([]);
            }
        };

        fetchProjects();
    }, [user]);



    const handleAddProject = async () => {
        if (!user) return;

        const newProject = {
            image: "",
            description: "새 프로젝트 설명을 입력하세요.",
        };

        const updatedProjects = [...(projects || []), newProject];

        try {
            const userDoc = doc(db, "users", user.uid);
            await updateDoc(userDoc, { projects: updatedProjects });

            setProjects(updatedProjects);
        } catch (error) {
            console.error("프로젝트 추가 오류:", error);
        }
    };


    const handleImageUpload = async (index, event) => {
        if (!user) return;

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


    const handleDescriptionChange = async (index, newDescription) => {
        if (!user) return;

        const updatedProjects = [...projects];
        updatedProjects[index].description = newDescription;

        setProjects(updatedProjects);

        const userDoc = doc(db, "users", user.uid);
        await updateDoc(userDoc, { projects: updatedProjects });
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
                <button
                    className={styles.arrow}
                    onClick={prevSlide}
                    disabled={currentIndex === 0} // ✅ 첫 번째 페이지면 비활성화
                >
                    {"<"}
                </button>

                <div className={styles.projectList}>
                    {projects.slice(currentIndex, currentIndex + 3).map((project, index) => (
                        <div key={index} className={styles.projectCard}>
                            <div className={styles.imageContainer}>
                                {project.image ? (
                                    <img src={project.image} alt="프로젝트 이미지" className={styles.projectImage} />
                                ) : (
                                    <>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            ref={(el) => (fileInputRefs.current[index] = el)} // ✅ 올바르게 배열 할당
                                            style={{ display: "none" }}
                                            onChange={(event) => handleImageUpload(index, event)}
                                        />
                                        <Button
                                            className={styles.uploadButton}
                                            text="+"
                                            onClick={() => fileInputRefs.current[index]?.click()} // ✅ 안전하게 `?` 사용하여 오류 방지
                                        />

                                    </>
                                )}
                            </div>
                            <textarea
                                className={styles.description}
                                value={project.description}
                                onChange={(e) => handleDescriptionChange(index, e.target.value)}
                            />
                        </div>
                    ))}
                </div>

                <button
                    className={styles.arrow}
                    onClick={nextSlide}
                    disabled={projects.length <= 3 || currentIndex >= projects.length - 3} // ✅ 마지막 페이지면 비활성화
                >
                    {">"}
                </button>
            </div>

            <Button className={styles.addProjectButton} text="새 프로젝트 추가" onClick={handleAddProject} />
        </div>
    )
}

export default ProfileProject