import React from "react";
import styles from "../../styles/listings.module.css";

const Listing = () => {
  return (
    <>
      <div>
        <p>123</p>
      </div>
      <div>
        <p>12373625681269798</p>
      </div>
      <div>
        <div
          className={styles.bg_image}
          style={{ backgroundImage: "url(/image-3.jpg)" }}
        ></div>
      </div>{" "}
      <div>
        <p>townhouse</p>
      </div>{" "}
      <div>
        <p>Ongata Rongai, Nairobi</p>
      </div>{" "}
      <div>
        <p>32,000,000</p>
      </div>{" "}
      <div>
        <p>rent</p>
      </div>{" "}
      <div>
        <p>expired</p>
      </div>{" "}
      <div>
        <p>31/12/2020</p>
      </div>
    </>
  );
};

export default Listing;
