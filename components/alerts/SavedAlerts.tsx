import React from "react";
import styles from "../../styles/alerts.module.css";
import AlertTable from "./AlertTable";

const SavedAlerts = () => {
  return (
    <div>
      <h4>my saved alerts</h4>
      <div>
        <div className={styles.saved_alerts}>
          <div className={styles.table}>
            <p>type</p>
            <p>area</p>
            <p>min price</p>
            <p>max price</p>
            <p>beds</p>
            <p>baths</p>
            <p>property type</p>
            <p>created</p>
          </div>
          <AlertTable />
          <AlertTable />
          <AlertTable />
          <AlertTable />
          <AlertTable />
          <AlertTable />
          <AlertTable />
          <AlertTable />
          <AlertTable />
          <AlertTable />
        </div>
      </div>
    </div>
  );
};

export default SavedAlerts;
