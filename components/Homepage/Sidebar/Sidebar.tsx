import React, { useContext } from "react";
import { MdCancel } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Redux } from "../../../interfaces/Redux";
import { ActionTypes } from "../../../redux/types/types";
import styles from "../../../styles/Layout.module.css";
import { SetToggleNavbar } from "../../Layout/Layout";

interface Props {
  toggleRef: React.RefObject<HTMLDivElement>;
}

const Sidebar: React.FC<Props> = props => {
  const dispatch = useDispatch();
  const toggleNavbar = useSelector(
    (state: Redux) => state.styling.toggleNavbar
  );
  return (
    <div
      className={`${styles.sidebar} ${
        toggleNavbar ? styles.sidebar_show : styles.sidebar_hide
      }`}
      ref={props.toggleRef}
    >
      <div className={styles.sidebar_header}>
        <h3>property domain</h3>
        <MdCancel
          size="3rem"
          onClick={() =>
            dispatch<SetToggleNavbar>({
              type: ActionTypes.toggleNavbar,
              payload: false
            })
          }
        />
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
