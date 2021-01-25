import React, { useEffect, useRef } from "react";
import { MdCancel } from "react-icons/md";
import styles from "../../styles/requestModal.module.css";

const RequestModal: React.FC = () => {
  const divRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleClickOutside = (e: Event) => {
    // @ts-ignore
    if (divRef.current && !divRef.current.contains(e.target)) {
    }
  };
  return (
    <div className={styles.prt}>
      <div className={styles.container} ref={divRef}>
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
