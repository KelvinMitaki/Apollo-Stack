import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { MdCancel } from "react-icons/md";
import styles from "../../styles/alerts.module.css";

const MobileAlertTable = () => {
  return (
    <div className={styles.MobileAlertTable}>
      <div>
        <p>type:</p>
        <p>to rent</p>
      </div>
      <div>
        <p>area:</p>
        <p>karen nairobi</p>
      </div>
      <div>
        <p>min price:</p>
        <p>ksh 150,000,000</p>
      </div>
      <div>
        <p>max price:</p>
        <p>ksh 200,000,000</p>
      </div>
      <div>
        <p>beds:</p>
        <p>4+</p>
      </div>
      <div>
        <p>baths:</p>
        <p>any</p>
      </div>
      <div>
        <p>property type:</p>
        <p>apartment</p>
      </div>
      <div>
        <p>created:</p>
        <p>2020-12-28</p>
      </div>
      <div className={styles.remove}>
        <MdCancel size="3rem" />
      </div>
      <div className={styles.search}>
        <AiOutlineSearch size="3rem" />
      </div>
    </div>
  );
};

export default MobileAlertTable;
