import React from "react";
import styles from "../../styles/listings.module.css";

const MobileListing = () => {
  return (
    <div className={styles.MobileListing}>
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
      <div className={styles.body}>
        <div style={{ backgroundImage: "url(/image-3.jpg)" }}></div>
        <div>
          <div>
            <p>for rent:</p>
            <p>townhouse</p>
          </div>
          <div>
            <p>price:</p>
            <p>ksh:2,000,000</p>
          </div>
          <p>address</p>
          <p>Ongata Rongai</p>
          <p></p>
        </div>
      </div>
      <button>edit</button>
    </div>
  );
};

export default MobileListing;
