import React from "react";
import styles from "../../styles/properties.module.css";
import Property from "./Property";
const Properties = () => {
  return (
    <div>
      <p>Property</p>
      <div className={styles.properties}>
        <Property />
      </div>
    </div>
  );
};

export default Properties;
