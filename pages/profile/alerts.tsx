import React from "react";
import SavedAlerts from "../../components/alerts/SavedAlerts";
import HouseFilter from "../../components/Homepage/Header/HouseFilter";
import Layout from "../../components/Layout/Layout";
import ProfileSidebar from "../../components/profileEdit/ProfileSidebar";
import styles from "../../styles/alerts.module.css";

const alerts = () => {
  return (
    <Layout title="Alerts">
      <div className={styles.container}>
        <ProfileSidebar />
        <div>
          <HouseFilter alternate btnContent="Add Alert" width="60vw" />
          <SavedAlerts />
        </div>
      </div>
    </Layout>
  );
};

export default alerts;
