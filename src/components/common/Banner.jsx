import React from "react";
import styles from "./Banner.module.scss";

function Banner({ image, title = "개발자들의 바닥까지 파헤치는 공간,", description = "세상을 움직이는 코드, 여기서 시작됩니다." }) {
  return (
    <section className={styles.banner} style={{ backgroundImage: `url(${image})` }}>
      <div className={styles.bannerContentWrapper}>
        <div className={styles.bannerContent}>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
      </div>
    </section>
  );
}

export default Banner;
