import React from "react";
import HouseFilter from "../components/Homepage/Header/HouseFilter";
import Layout from "../components/Layout/Layout";
import Listing from "../components/listings/Listing";
import MobileListing from "../components/listings/MobileListing";
import styles from "../styles/listings.module.css";

const listings = () => {
  return (
    <Layout title="Listings">
      <div className={styles.container}>
        <HouseFilter alternate={false} btnContent="Search" width="100%" agent />
        <div style={{ width: "100%" }}>
          <table className={styles.table} cellSpacing="0">
            <thead>
              <tr className={styles.header}>
                <th>
                  <p>reference</p>
                </th>
                <th>
                  <p>list no</p>
                </th>
                <th>
                  <p>thumbnail</p>
                </th>
                <th>
                  <p>category</p>
                </th>
                <th>
                  <p>address</p>
                </th>
                <th>
                  <p>price</p>
                </th>
                <th>
                  <p>type</p>
                </th>
                <th>
                  <p>status</p>
                </th>
                <th>
                  <p>modified</p>
                </th>
              </tr>
            </thead>
            <tbody>
              <Listing className="active" />
              <Listing />
              <Listing className="active" />
              <Listing />
              <Listing className="active" />
              <Listing />
              <Listing className="active" />
              <Listing />
              <Listing className="active" />
              <Listing />
              <Listing className="active" />
              <Listing />
              <Listing className="active" />
              <Listing />
              <Listing className="active" />
              <Listing />
              <Listing className="active" />
              <Listing />
              <Listing className="active" />
              <Listing />
              <Listing className="active" />
              <Listing />
              <Listing className="active" />
              <Listing />
              <Listing className="active" />
              <Listing />
            </tbody>
          </table>
          <MobileListing />
        </div>
      </div>
    </Layout>
  );
};

export default listings;
