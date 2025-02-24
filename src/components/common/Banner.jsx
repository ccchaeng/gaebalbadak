import React from "react";
import styles from "./Banner.module.scss";

function Banner({ image, title, description }) {
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
