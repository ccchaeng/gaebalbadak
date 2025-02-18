import React from 'react';
import { Link } from "react-router-dom";
import styles from "./Card.module.scss";

function Card({title, moreLink, items}) {
  return (
    <div className={styles.card}>
        <div className={styles.cardHeader}>
            <h3>{title}</h3>
            <Link to={moreLink} className={styles.moreLink}>더보기</Link>
        </div>
        <ul className={styles.cardList}>
            {items.map((item, index) => (
                <li key={index} className={styles.cardItem}>
                    <Link to={moreLink}>{item} &gt;</Link>
                </li>
            ))}
        </ul>
    </div>
  );
}

export default Card;
