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
    </div>
  );
};

export default Properties;
