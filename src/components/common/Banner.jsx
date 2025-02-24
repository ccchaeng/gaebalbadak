import React from "react";
import styles from "./Banner.module.scss";

function Banner({ title, subtitle, backgroundImage, className = "" }) {
  return (
    <section
      className={`${styles.banner} ${className}`}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className={styles.bannerContentWrapper}>
        <div className={styles.bannerContent}>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
      </div>
    </section>
  );
}

export default Banner;
