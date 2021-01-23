import React from "react";
import Layout from "../../components/Layout/Layout";
import ListingStatisticsBody from "../../components/listing/ListingStatisticsBody";
import styles from "../../styles/listingStatistics.module.css";

const statistics = () => {
  const body = [];
  for (let i = 0; i < 10; i++) {
    body.push(<ListingStatisticsBody key={i} className={i % 2 === 0} />);
  }
  return (
    <Layout title="Listing Statistics">
      <div className={styles.container}>
        <div className={styles.prt}>
          <table cellSpacing="0">
            <thead>
              <tr>
                <th>list no</th>
                <th>street address</th>
                <th>category</th>
                <th>type</th>
              </tr>
            </thead>
            <tbody>{body}</tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default statistics;
