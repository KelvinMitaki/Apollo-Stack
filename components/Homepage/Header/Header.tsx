import React from "react";
import styles from "../../../styles/home.module.css";
import HouseFilter from "./HouseFilter";

const Header = () => {
  return (
    <div className={styles.header}>
      <HouseFilter alternate={false} btnContent="Search" />
    </div>
  );
};

export default Header;
