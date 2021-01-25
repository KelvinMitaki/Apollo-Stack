import React from "react";
import { MdCancel } from "react-icons/md";
import styles from "../../styles/requestModal.module.css";

const RequestModal: React.FC = () => {
  return (
    <div className={styles.prt}>
      <div className={styles.container}>
        <div className={styles.header}>
          <p>request</p>
          <MdCancel size="2rem" />
        </div>
        <div className={styles.body}>
          <p>please choose a type before searching for properties</p>
        </div>
      </div>
    </div>
  );
};

export default RequestModal;
