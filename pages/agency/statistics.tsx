import React from "react";
import Layout from "../../components/Layout/Layout";
import styles from "../../styles/agencyStatistics.module.css";

const statistics = () => {
  return (
    <Layout title="Agency Statistics">
      <div className={styles.container}>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Jul</th>
              <th>Aug</th>
              <th>Sep</th>
              <th>Oct</th>
              <th>Nov</th>
              <th>Dec</th>
              <th>Jan</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Views</td>
              <td>8721781</td>
              <td>873268</td>
              <td>1628768</td>
              <td>72197</td>
              <td>092180</td>
              <td>726156</td>
              <td>6752176</td>
            </tr>
            <tr>
              <td>Leads</td>
              <td>8721781</td>
              <td>873268</td>
              <td>1628768</td>
              <td>72197</td>
              <td>092180</td>
              <td>726156</td>
              <td>6752176</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default statistics;
