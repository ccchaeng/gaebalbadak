import React from "react";
import styles from "./Button.module.scss"; // SCSS 모듈 가져오기

const Button = ({ text, onClick, className }) => {
  return (
    <button onClick={onClick} className={`${styles.button} ${className}`}>
      {text}
    </button>
  );
};

export default Button;
