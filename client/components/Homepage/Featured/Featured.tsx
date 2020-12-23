import React from "react";
import styles from "../../../styles/Featured.module.css";
import Card from "./Card";

const Featured = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span>Listing from our agents</span>
        <h3>featured properties</h3>
        <div></div>
      </div>
      <Card />
    </div>
  );
};

export default Featured;
