import React from "react";
import Router from "next/router";
import Search from "../../components/properties/Search";
import Property from "../../components/properties/Properties";
import styles from "../../styles/properties.module.css";
import Layout from "../../components/Layout/Layout";

const property: React.FC = props => {
  return (
    <Layout title="Properties">
      <div className={styles.container}>
        <Search />
        <Property />
      </div>
    </Layout>
  );
};

export default property;
