import React from "react";
import HouseFilter from "../components/Homepage/Header/HouseFilter";
import Layout from "../components/Layout/Layout";
import Listing from "../components/listings/Listing";
import MobileListing from "../components/listings/MobileListing";
import withAuth from "../HOCs/withAuth";
import styles from "../styles/listings.module.css";

const listings = () => {
  const listings = [];
  for (let i = 0; i < 50; i++) {
    listings.push(
      <Listing key={i} className={`${i % 2 === 0 ? "active" : ""}`} />
    );
  }
  const mobileListings = [];
  for (let i = 0; i < 50; i++) {
    mobileListings.push(<MobileListing key={i} />);
  }
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
                  <p>price in ksh</p>
                </th>
                <th>
                  <p>bedrooms</p>
                </th>
                <th>
                  <p>bathrooms</p>
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
            <tbody>{listings}</tbody>
          </table>
          {mobileListings}
        </div>
      </div>
    </Layout>
  );
};

export default withAuth(listings);
