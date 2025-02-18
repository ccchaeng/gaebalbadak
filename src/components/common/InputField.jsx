import React from "react";
import styles from "./InputField.module.scss"; // 입력 필드 SCSS 모듈

const InputField = ({ label, type, name, value, onChange, className }) => {
    return (
        <div className={`${styles.inputContainer} ${className}`}>
            <label className={styles.label}>{label}</label>
            <input
                type={type} // 입력 필드 타입
                name={name} // name 속성
                value={value} // 입력된 값
                onChange={onChange} // 값 변경 시 실행되는 이벤트
                className={styles.input} // 공통 스타일
            />
        </div>
    );
};

export default InputField;
