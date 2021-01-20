import React from "react";
import { MdCancel } from "react-icons/md";
import { ActionTypes } from "../../redux/types/types";
import styles from "../../styles/ExpiredListingsModal.module.css";

interface Props {
  content: string;
}

export interface ExpiredListingsModal {
  type: ActionTypes.expiredListingsModal;
  payload: boolean;
}

const ExpiredListingsModal: React.FC<Props> = props => {
  return (
    <div className={styles.parent}>
      <div className={styles.container}>
        <div className={styles.header}>
          <p>confirmation dialog</p>
          <p>
            <MdCancel size="2rem" />
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
    </div>
  );
};

export default ExpiredListingsModal;
