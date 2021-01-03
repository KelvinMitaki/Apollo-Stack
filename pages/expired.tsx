import React from "react";
import ExpiredListing from "../components/Expired/ExpiredListing";
import ExpiredMobileListing from "../components/Expired/ExpiredMobileListing";
import HouseFilter from "../components/Homepage/Header/HouseFilter";
import Layout from "../components/Layout/Layout";
import Listing from "../components/listings/Listing";
import MobileListing from "../components/listings/MobileListing";
import styles from "../styles/listings.module.css";

const expired = () => {
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
                  <p>expiry date</p>
                </th>
                <th>
                  <p>modified</p>
                </th>
              </tr>
            </thead>
            <tbody>
              <ExpiredListing className="active" />
              <ExpiredListing />
              <ExpiredListing className="active" />
              <ExpiredListing />
              <ExpiredListing className="active" />
              <ExpiredListing />
              <ExpiredListing className="active" />
              <ExpiredListing />
              <ExpiredListing className="active" />
              <ExpiredListing />
              <ExpiredListing className="active" />
              <ExpiredListing />
              <ExpiredListing className="active" />
              <ExpiredListing />
              <ExpiredListing className="active" />
              <ExpiredListing />
              <ExpiredListing className="active" />
              <ExpiredListing />
              <ExpiredListing className="active" />
              <ExpiredListing />
              <ExpiredListing className="active" />
              <ExpiredListing />
              <ExpiredListing className="active" />
              <ExpiredListing />
              <ExpiredListing className="active" />
              <ExpiredListing />
            </tbody>
          </table>
          <ExpiredMobileListing />
          <ExpiredMobileListing />
          <ExpiredMobileListing />
          <ExpiredMobileListing />
          <ExpiredMobileListing />
          <ExpiredMobileListing />
          <ExpiredMobileListing />
          <ExpiredMobileListing />
          <ExpiredMobileListing />
          <ExpiredMobileListing />
        </div>
      </div>
    </Layout>
  );
};

export default expired;
