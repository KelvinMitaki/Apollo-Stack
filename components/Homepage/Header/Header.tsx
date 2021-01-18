import React from "react";
import styles from "../../../styles/home.module.css";
import HouseFilter from "./HouseFilter";

const Header = () => {
  return (
    <div className={styles.header}>
      <HouseFilter
        bathrooms={[1, 2, 3, 4, 5]}
        bedrooms={[1, 2, 3, 4, 5]}
        categories={[
          { name: "apartement", subCats: true },
          { name: "house", subCats: true },
          { name: "townhouse", subCats: true },
          { name: "vacant land" },
          { name: "farm" },
          { name: "commercial" },
          { name: "industrial" }
        ]}
        alternate={false}
        btnContent="Search"
        width="90vw"
      />
    </div>
  );
};

export default Header;
