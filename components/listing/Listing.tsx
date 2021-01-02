import React from "react";
import styles from "../../styles/listingEdit.module.css";
const Listing = () => {
  return (
    <div className={styles.Listing}>
      <div>
        <label>list no</label>
        <input type="text" />
      </div>
      <div>
        <label>reference</label>
        <input type="text" />
      </div>
      <div>
        <label>category</label>
        <input type="text" />
      </div>
      <div>
        <label>location</label>
        <input type="text" />
      </div>
      <div>
        <label>street address</label>
        <input type="text" />
      </div>
    </div>
  );
};

export default Listing;
