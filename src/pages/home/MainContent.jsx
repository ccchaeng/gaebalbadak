import React from "react";
import { Link } from "react-router-dom";
import styles from "./MainContent.module.scss"; // ✅ SCSS 스타일 import

function MainContent({ title, items = [], link }) {  
  return (
    <div className={styles.contentBox}> {/* ✅ SCSS 스타일 적용 */}
      <div className={styles.contentHeader}>
        <h2>{title}</h2>
        <Link to={link} className={styles.moreLink}>더보기 &gt;</Link>
      </div>
      <ul className={styles.contentList}>
        {items.length > 0 ? (
          items.map((item) => (
            <li key={item.id} className={styles.contentItem}>
              <Link to={`${link}/${item.id}`}>{item.title}</Link>
              <span className={styles.arrow}>&rarr;</span>
            </li>
          ))
        ) : (
          <li>게시글이 없습니다.</li>  
        )}
      </ul>
    </div>
  );
}

export default MainContent;
