import React from "react";
import styles from "../../styles/listings.module.css";

const MobileListing = () => {
  return (
    <div className={styles.MobileListing}>
      <div className={styles.header}>
        <div>
          <p>list no:</p>
          <p>982378632687437683709</p>
        </div>
        <div>
          <p>reference</p>
          <p>123</p>
        </div>
        <div>
          <p>status:</p>
          <p>expired</p>
        </div>
      </div>
      <div className={styles.mb_body}>
        <div
          className={styles.mb_img}
          style={{ backgroundImage: "url(/image-3.jpg)" }}
        ></div>
        <div className={styles.content}>
          <div>
            <p>for rent:</p>
            <p>townhouse</p>
          </div>
          <div>
            <p>price:</p>
            <p>ksh:2,000,000</p>
          </div>
          <div>
            <p>address:</p>
            <p>Ongata Rongai</p>
          </div>
        </div>
      </div>
      <div className={styles.btn}>
        <button>edit</button>
      </div>
    </div>
  );
};

export default MobileListing;
