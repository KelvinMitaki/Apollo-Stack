import React from "react";
import styles from "../../styles/listingEdit.module.css";

const Images = () => {
  const images = [] as JSX.Element[];
  for (let i = 0; i < 50; i++) {
    images.push(
      <div
        style={{ backgroundImage: "url(/image-3.jpg)" }}
        className={styles.bg_image}
      ></div>
    );
  }
  return <div className={styles.Images}>{images}</div>;
};

export default Images;
