import React from "react";
import Layout from "../components/Layout/Layout";
import Lead from "../components/Leads/Lead";
import styles from "../styles/leads.module.css";

const leads = () => {
  const genLeads = () => {
    const lead = [];
    for (let i = 0; i < 10; i++) {
      lead.push(<Lead key={i} />);
    }
    return lead;
  };
  return (
    <Layout title="Leads">
      <div className={styles.container}>
        <table cellSpacing="0">
          <thead>
            <tr>
              <th>
                <p>lead time</p>
              </th>
              <th>
                <p>list no</p>
              </th>
              <th>
                <p>address</p>
              </th>
              <th>
                <p>contact person</p>
              </th>
              <th>
                <p>email</p>
              </th>
              <th>
                <p>phone number</p>
              </th>
              <th>
                <p>message</p>
              </th>
            </tr>
          </thead>
          <tbody>{genLeads()}</tbody>
        </table>
      </div>
    </Layout>
  );
};

export default leads;
