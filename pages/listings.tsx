import React from "react";
import HouseFilter from "../components/Homepage/Header/HouseFilter";
import Layout from "../components/Layout/Layout";
import Listing from "../components/listings/Listing";
import styles from "../styles/listings.module.css";

const listings = () => {
  return (
    <Layout title="Listings">
      <div className={styles.container}>
        <HouseFilter alternate={false} btnContent="Search" width="90vw" />
        <div>
          <div className={styles.body}>
            <div>
              <p>reference</p>
            </div>
            <div>
              <p>list no</p>
            </div>
            <div>
              <p>thumbnail</p>
            </div>
            <div>
              <p>category</p>
            </div>
            <div>
              <p>address</p>
            </div>
            <div>
              <p>price</p>
            </div>
            <div>
              <p>type</p>
            </div>
            <div>
              <p>status</p>
            </div>
            <div>
              <p>modified</p>
            </div>
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
