import React from "react";
import styles from "./Box.module.scss";

const Box = ({ className = "" }) => {
  return (
    <div className={`${styles.box} ${className}`}>
      <div className={styles.innerBox1}></div> {/* 🔥 내부 박스 1 */}
      <div className={styles.innerBox2}></div> {/* 🔥 내부 박스 2 */}
    </div>
  );
};

export default Box;
