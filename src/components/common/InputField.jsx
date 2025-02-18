import React from "react";

// 코드 재사용을 위한 props
const InputField = ({ label, type, name, value, onChange }) => {
    return (
        <div style={{ marginBottom: "10px" }}>
            <label>{label}</label> {/* 입력 필드 라벨 */}
            <input
                type={type} // input 타입 (email, text, password 등등...)
                name={name} // name 속성
                value={value} // 입력된 값
                onChange={onChange} // 값이 변경될 때 실행되는 이벤트
                style={{
                    width: "100%",
                    padding: "8px",
                    marginTop: "5px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                }}
            />
        </div>
    );
};

export default InputField;
