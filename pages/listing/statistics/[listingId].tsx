import React from "react";
import Layout from "../../../components/Layout/Layout";
import SingleListingBody from "../../../components/listing/SingleListingBody";
import styles from "../../../styles/singleListing.module.css";

const singleListing = () => {
  const messages = [];
  for (let i = 0; i < 10; i++) {
    messages.push(<SingleListingBody key={i} active={i % 2 === 0} />);
  }
  return (
    <Layout title="Lavington, Nairobi">
      <div className={styles.container}>
        <div>views graph</div>
        <div>leads graph</div>
        <div className={styles.prt}>
          <p>contact form messages</p>
          <table cellSpacing="0">
            <colgroup>
              <col />
              <col />
              <col />
              <col />
              <col width="30%" />
            </colgroup>
            <thead>
              <tr>
                <th>date</th>
                <th>name</th>
                <th>email address</th>
                <th>contact number</th>
                <th>message</th>
              </tr>
            </thead>
            <tbody>{messages}</tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default singleListing;
