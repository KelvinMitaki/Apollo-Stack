import React from "react";
import { HeaderType } from "../../pages/listing/new";
import styles from "../../styles/listingEdit.module.css";
interface Props {
  active: HeaderType;
}
const Images: React.FC<Props> = props => {
  const images = [] as JSX.Element[];
  for (let i = 0; i < 50; i++) {
    images.push(
      <div
        key={i}
        style={{ backgroundImage: "url(/image-3.jpg)" }}
        className={styles.bg_image}
      ></div>
    );
  }
  return (
    <div
      className={`${styles.Images} ${
        props.active === "images" ? styles.active_header : ""
      }`}
    >
      {images}
    </div>
  );
};

export default Images;
