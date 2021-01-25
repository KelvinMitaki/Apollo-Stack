import React from "react";
import styles from "../../styles/requestModal.module.css";

const RequestModal: React.FC = () => {
  return (
    <div className={styles.prt}>
      <div className={styles.header}>
        <p>request</p>
      </div>
      <div className={styles.body}>
        <p>please choose a type before searching for properties</p>
      </div>
    </div>
  );
};

export default RequestModal;
