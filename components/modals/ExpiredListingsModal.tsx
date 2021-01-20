import React, { useEffect, useRef } from "react";
import { MdCancel } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Redux } from "../../interfaces/Redux";
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
  const expiredListingsModal = useSelector(
    (state: Redux) => state.styling.expiredListingsModal
  );
  const dispatch = useDispatch();
  const dialogDiv = useRef<HTMLDivElement>(null);
  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleClickOutside = (e: Event) => {
    // @ts-ignore
    if (dialogDiv.current && !dialogDiv.current.contains(e.target)) {
      dispatch<ExpiredListingsModal>({
        type: ActionTypes.expiredListingsModal,
        payload: false
      });
    }
  };
  return (
    <div
      className={`${styles.parent} ${
        !expiredListingsModal ? styles.prt_hide : ""
      }`}
    >
      <div className={styles.container} ref={dialogDiv}>
        <div className={styles.header}>
          <p>confirmation dialog</p>
          <p>
            <MdCancel
              size="2rem"
              onClick={() =>
                dispatch<ExpiredListingsModal>({
                  type: ActionTypes.expiredListingsModal,
                  payload: false
                })
              }
            />
          </p>
        </div>
        <div className={styles.body}>
          <p>{props.content}</p>
        </div>
        <div className={styles.footer}>
          <button>confirm</button>
          <button
            onClick={() =>
              dispatch<ExpiredListingsModal>({
                type: ActionTypes.expiredListingsModal,
                payload: false
              })
            }
          >
            cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpiredListingsModal;
