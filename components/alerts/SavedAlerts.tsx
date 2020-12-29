import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { MdCancel } from "react-icons/md";
import styles from "../../styles/alerts.module.css";

const SavedAlerts = () => {
  return (
    <div>
      <h4>my saved alerts</h4>
      <div>
        <div className={styles.header}>
          <p>type</p>
          <p>area</p>
          <p>min price</p>
          <p>max price</p>
          <p>beds</p>
          <p>baths</p>
          <p>property type</p>
          <p>created</p>
        </div>
        <div className={styles.body}>
          <div className={styles.alert}>
            <MdCancel />
            <p>to rent</p>
            <p>karen nairobi</p>
            <p>ksh 150,000</p>
            <p>ksh 200,000</p>
            <p>any</p>
            <p>any</p>
            <p>4+</p>
            <p>any</p>
            <p>apartment</p>
            <p>2020-12-28</p>
            <AiOutlineSearch />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavedAlerts;
