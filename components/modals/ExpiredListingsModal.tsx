import React from "react";
import { MdCancel } from "react-icons/md";
import styles from "../../styles/ExpiredListingsModal.module.css";

interface Props {
  content: string;
}

const ExpiredListingsModal: React.FC<Props> = props => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p>confirmation dialog</p>
        <p>
          <MdCancel />
        </p>
      </div>
      <div className={styles.body}>
        <p>{props.content}</p>
      </div>
      <div className={styles.footer}>
        <button>confirm</button>
        <button>cancel</button>
      </div>
    </div>
  );
};

export default ExpiredListingsModal;
