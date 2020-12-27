import React from "react";
import styles from "../../styles/properties.module.css";
import Property from "./Property";
const Properties = () => {
  return (
    <div className={styles.properties_prt}>
      <h3>Property</h3>
      <div className={styles.properties}>
        <Property />
        <Property />
        <Property />
        <Property />
        <Property />
      </div>
      <div className={styles.pagination}>
        <p>1</p>
        <p>2</p>
        <p>3</p>
      </div>
    </div>
  );
};

export default Properties;
