import React from "react";
import Layout from "../../components/Layout/Layout";
import styles from "../../styles/agencyStatistics.module.css";
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
const getMonth = (month: number) => {
  const d = new Date();
  d.setMonth(d.getMonth() - month);
  return months[d.getMonth()];
};
const statistics = () => {
  return (
    <Layout title="Agency Statistics">
      <div className={styles.container}>
        <table cellSpacing="0">
          <thead>
            <tr className={styles.active}>
              <th></th>
              <th>{getMonth(6)}</th>
              <th>{getMonth(5)}</th>
              <th>{getMonth(4)}</th>
              <th>{getMonth(3)}</th>
              <th>{getMonth(2)}</th>
              <th>{getMonth(1)}</th>
              <th>{getMonth(0)}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={styles.views}>Views</td>
              <td>8721781</td>
              <td>873268</td>
              <td>1628768</td>
              <td>72197</td>
              <td>092180</td>
              <td>726156</td>
              <td>6752176</td>
            </tr>
            <tr className={styles.active}>
              <td className={styles.leads}>Leads</td>
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
