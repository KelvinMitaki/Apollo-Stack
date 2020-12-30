import React from "react";
import Layout from "../../components/Layout/Layout";
import Contact from "../../components/propertyDetails/Contact";
import Details from "../../components/propertyDetails/Details";
import styles from "../../styles/propertyDetails.module.css";

const propertyDetails = () => {
  return (
    <Layout title="Property Details">
      <div className={styles.container}>
        <Details />
        <Contact />
      </div>
    </Layout>
  );
};

export default propertyDetails;
