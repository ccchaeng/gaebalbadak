import React, { useState } from 'react'
import styles from './ProfileProject.module.scss'

// 컴포넌트
import Button from './Button'

const ProfileProject = ({ projects, onAddProject }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const visibleProjects = projects.slice(currentIndex, currentIndex + 3);

    return (
        <div className={styles.projectContainer}>
          <h2>Project</h2>
          <div className={styles.projectGrid}>
            {visibleProjects.map((project, index) => (
              <div key={index} className={styles.projectCard}>
                <img src={project.image} alt="프로젝트" className={styles.projectImage} />
                <p>{project.description}</p>
              </div>
            ))}
    
            {/* 3개 미만이면 + 버튼 추가 */}
            {visibleProjects.length < 3 && (
              <div className={styles.addProjectCard} onClick={onAddProject}>
                <span className={styles.plusIcon}>+</span>
              </div>
            )}
          </div>
    
          <div className={styles.navigation}>
            {currentIndex > 0 && <Button text="◀" onClick={() => setCurrentIndex(currentIndex - 1)} />}
            {currentIndex + 3 < projects.length && <Button text="▶" onClick={() => setCurrentIndex(currentIndex + 3)} />}
          </div>
        </div>
      );
    };

export default ProfileProject