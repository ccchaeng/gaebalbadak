import React from "react";
import styles from "./MainContent.module.scss"; // SCSS 모듈 import

function MainContent({ title, items, link }) {
  return (
    <section className={styles.contentBox}>
      <div className={styles.contentHeader}>
        <h2>{title}</h2>
        <a href={link} className={styles.moreLink}>더보기 →</a>
      </div>
      <div className={styles.contentList}>
        {items.map((item) => (
          <a key={item.id} href={`${link}/${item.id}`} className={styles.contentItem}>
            {item.title}
            <span className={styles.arrow}>›</span>
          </a>
        ))}
      </div>
    </section>
  );
}

export default MainContent;
