import React from "react";
import Router from "next/router";
import Search from "../../components/properties/Search";
import Property from "../../components/properties/Properties";
import styles from "../../styles/properties.module.css";
import Layout from "../../components/Layout/Layout";
import { NextPage } from "next";

const property: NextPage = props => {
  return (
    <Layout title="Properties">
      <div className={styles.container}>
        <Search />
        <Property />
      </div>
    </Layout>
  );
};

property.getInitialProps = async ctx => {
  console.log(ctx.query);
  return {
    hey: ""
  };
};

export default property;
