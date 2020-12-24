import React, { useContext } from "react";
import { MdCancel } from "react-icons/md";
import { StylingContext } from "../../../Context/StylingContext";
import styles from "../../../styles/Layout.module.css";

interface Props {
  toggle: boolean;
  toggleRef: React.RefObject<HTMLDivElement>;
}

const Sidebar: React.FC<Props> = props => {
  const { setToggle } = useContext(StylingContext);
  return (
    <div
      className={`${styles.sidebar} ${
        props.toggle ? styles.sidebar_show : styles.sidebar_hide
      }`}
      ref={props.toggleRef}
    >
      <div className={styles.sidebar_header}>
        <h3>yellow market</h3>
        <MdCancel size="3rem" onClick={() => setToggle && setToggle(false)} />
      </div>
      <div className={styles.sidebar_body}>
        <div className={styles.opts_item}>
          <p>for sale</p>
        </div>
        <div className={styles.opts_item}>
          <p>to rent</p>
        </div>
        <div className={styles.opts_item}>
          <p>developments</p>
        </div>
        <div className={styles.opts_item}>
          <p>repossessed</p>
        </div>
        <div className={styles.opts_item}>
          <p>login</p>
        </div>
        <div className={styles.opts_item}>
          <p>register</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
