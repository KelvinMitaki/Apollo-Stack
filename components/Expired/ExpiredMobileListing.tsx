import Link from "next/link";
import React from "react";
import styles from "../../styles/listings.module.css";

const ExpiredMobileListing = () => {
  return (
    <div className={styles.MobileListing}>
      <div className={styles.header}>
        <div>
          <p>list no:</p>
          <p>982378632687437683709</p>
        </div>
        <div>
          <p>reference:</p>
          <p>123</p>
        </div>
        <div>
          <p>expiry date:</p>
          <p>3/3/2020</p>
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
            <p>ksh 2,000,000</p>
          </div>
          <div>
            <p>address:</p>
            <p>Ongata Rongai</p>
          </div>
          <div>
            <p>bedrooms:</p>
            <p>3</p>
          </div>
          <div>
            <p>bathrooms:</p>
            <p>2</p>
          </div>
        </div>
      </div>
      <Link href="/listing/edit/123">
        <a>
          <div className={styles.btn}>
            <button>edit</button>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default ExpiredMobileListing;
