import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { MdCancel } from "react-icons/md";
import styles from "../../styles/alerts.module.css";

const AlertTable = () => {
  return (
    <div className={styles.table}>
      <div className={styles.MdCancel}>
        <MdCancel />
        <p>to rent</p>
      </div>
      <p>karen nairobi</p>
      <p>ksh 150,000,000</p>
      <p>ksh 200,000,000</p>
      <p>4+</p>
      <p>any</p>
      <p>apartment</p>
      <div className={styles.AiOutlineSearch}>
        <p>2020-12-28</p>
        <span>
          <AiOutlineSearch />
        </span>
      </div>
    </div>
  );
};

export default AlertTable;
