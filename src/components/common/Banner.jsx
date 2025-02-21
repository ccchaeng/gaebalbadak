import React from "react";
import bannerImage from "../../assets/banner2.jpg";
import styles from "./Banner.module.scss";

function Banner() {
  return (
    <section className={styles.banner} style={{ backgroundImage: `url(${bannerImage})` }}>
      <div className={styles.bannerContentWrapper}>
        <div className={styles.bannerContent}>
          <h1>개발자들의 바닥까지 파헤치는 공간,</h1>
          <p>세상을 움직이는 코드, 여기서 시작됩니다.</p>
        </div>
      </div>
    </section>
  );
}

export default Banner;
