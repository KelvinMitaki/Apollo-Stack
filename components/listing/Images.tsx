import React from "react";
import { HeaderType } from "../../pages/listing/new";
import styles from "../../styles/listingEdit.module.css";
interface Props {
  active: HeaderType;
  images?: string[];
}
const Images: React.FC<Props> = props => {
  const images = [] as JSX.Element[];
  for (let i = 0; i < 15; i++) {
    images.push(
      <>
        <div
          key={Math.random() * Date.now() + 1 * i}
          style={{
            backgroundImage:
              "url(https://e-commerce-gig.s3.eu-west-2.amazonaws.com/5efd9987b53dfa39cc27bae9/image-1.jpeg)"
          }}
          className={styles.bg_image}
        ></div>
        <div
          key={Math.random() * Date.now() + 2 * i}
          style={{
            backgroundImage:
              "url(https://e-commerce-gig.s3.eu-west-2.amazonaws.com/5efd9987b53dfa39cc27bae9/image-2.jpg)"
          }}
          className={styles.bg_image}
        ></div>
        <div
          key={Math.random() * Date.now() + 3 * i}
          style={{
            backgroundImage:
              "url(https://e-commerce-gig.s3.eu-west-2.amazonaws.com/5efd9987b53dfa39cc27bae9/image-3.jpg)"
          }}
          className={styles.bg_image}
        ></div>
      </>
    );
  }
  return (
    <div
      className={`${styles.Images} ${
        props.active === "images" ? styles.active_header : ""
      }`}
    >
      {props.images
        ? props.images.map((img, i) => (
            <div
              className={styles.bg_image}
              style={{ backgroundImage: `url(${img})` }}
              key={i}
            ></div>
          ))
        : images}
    </div>
  );
};

export default Images;
