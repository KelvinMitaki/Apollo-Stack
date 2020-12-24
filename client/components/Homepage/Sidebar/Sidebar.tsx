import React from "react";
import styles from "../../../styles/Layout.module.css";

interface Props {
  toggle: boolean;
  toggleRef: React.RefObject<HTMLDivElement>;
}

const Sidebar: React.FC<Props> = props => {
  return (
    <div
      className={`${styles.sidebar} ${props.toggle ? styles.sidebar_show : ""}`}
      ref={props.toggleRef}
    >
      Sidebar
    </div>
  );
};

export default Sidebar;
