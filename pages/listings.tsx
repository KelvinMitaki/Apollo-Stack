import React from "react";
import HouseFilter from "../components/Homepage/Header/HouseFilter";
import Layout from "../components/Layout/Layout";
import Listing from "../components/listings/Listing";
import styles from "../styles/listings.module.css";

const listings = () => {
  return (
    <Layout title="Listings">
      <div className={styles.container}>
        <HouseFilter alternate={false} btnContent="Search" width="100%" agent />
        <div>
          <div className={styles.body}>
            <div className={styles.header_item}>
              <p>reference</p>
            </div>
            <div className={styles.header_item}>
              <p>list no</p>
            </div>
            <div className={styles.header_item}>
              <p>thumbnail</p>
            </div>
            <div className={styles.header_item}>
              <p>category</p>
            </div>
            <div className={styles.header_item}>
              <p>address</p>
            </div>
            <div className={styles.header_item}>
              <p>price</p>
            </div>
            <div className={styles.header_item}>
              <p>type</p>
            </div>
            <div className={styles.header_item}>
              <p>status</p>
            </div>
            <div className={styles.header_item}>
              <p>modified</p>
            </div>
            <Listing />
            <Listing />
            <Listing />
            <Listing />
            <Listing />
            <Listing />
            <Listing />
            <Listing />
            <Listing />
            <Listing />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default listings;
