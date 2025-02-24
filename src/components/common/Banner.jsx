import React from "react";
import styles from "./Banner.module.scss";

const Banner = ({ image, title, description, className = "" }) => {
  return (
    <section className={`${styles.banner} ${className}`} style={{ backgroundImage: `url(${image})` }}>
      <div className={styles.bannerContentWrapper}>
        <div className={styles.bannerContent}>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
      </div>
    </section>
  );
};

export default Banner;
