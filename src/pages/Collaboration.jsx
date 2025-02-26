import React from "react";
import styles from "./Collaboration.module.scss"; // SCSS 모듈 import

const Collaboration = () => {
  return (
    <div className={styles.collaboration}> 

      {/* 모집 분야 탭 */}
      <div className={styles.collaboration__tabs}>
        <button>모집분야</button>
        <button>Web</button>
        <button>App</button>
        <button>Unity</button>
        <button>Unreal Engine</button>
        <button>JavaScript</button>
        <button>Kotlin</button>
        <button>PHP</button>
        <button>TypeScript</button>
        <button>기타</button>
      </div>

      {/* 게시판 테이블 */}
      <table className={styles.collaboration__table}>
        <thead>
          <tr>
            <th>제목</th>
            <th>언어</th>
            <th>글쓴이</th>
            <th>댓글</th>
            <th>👍</th>
            <th>채택 레벨🔥</th>
            <th>작성일</th>
          </tr>
        </thead>
      </table>

      {/* 페이지네이션 (위치 고정) */}
      <div className={styles.collaboration__pagination}>
        <button>이전</button>
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button>4</button>
        <button>다음</button>
      </div>

      {/* 글쓰기 버튼 */}
      <button className={styles.collaboration__write_button}>글쓰기</button> 
    </div>
  );
};

export default Collaboration; 