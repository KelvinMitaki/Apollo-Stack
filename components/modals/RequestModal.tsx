import React, { useEffect, useRef } from "react";
import { MdCancel } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Redux } from "../../interfaces/Redux";
import { ActionTypes } from "../../redux/types/types";
import styles from "../../styles/requestModal.module.css";

export interface RequestModalI {
  type: ActionTypes.requestModal;
  payload: boolean;
}

const RequestModal: React.FC = () => {
  const divRef = useRef<HTMLDivElement>(null);
  const requestModal = useSelector(
    (state: Redux) => state.styling.requestModal
  );
  const dispatch = useDispatch();
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleClickOutside = (e: Event) => {
    // @ts-ignore
    if (divRef.current && !divRef.current.contains(e.target)) {
      dispatch<RequestModalI>({
        type: ActionTypes.requestModal,
        payload: false
      });
    }
  };
  return (
    <div className={`${styles.prt} ${!requestModal ? styles.hide : ""}`}>
      <div className={styles.container} ref={divRef}>
        <div className={styles.header}>
          <p>request</p>
          <MdCancel
            size="2rem"
            onClick={() =>
              dispatch<RequestModalI>({
                type: ActionTypes.requestModal,
                payload: false
              })
            }
          />
        </div>
        <div className={styles.body}>
          <p>please choose a type before searching for properties</p>
        </div>
      </div>
    </div>
  );
};

export default RequestModal;
