import React from "react";
import Router from "next/router";
import Search from "../../components/properties/Search";
import Property from "../../components/properties/Property";
import styles from "../../styles/properties.module.css";

const property: React.FC = props => {
  return (
    <div>
      <Search />
      <Property />
    </div>
  );
};

export default property;
