import React from "react";
import Layout from "../../components/Layout/Layout";
import ProfileSidebar from "../../components/profileEdit/ProfileSidebar";
import styles from "../../styles/alerts.module.css";

const alerts = () => {
  return (
    <Layout title="Alerts">
      <div className={styles.container}>
        <ProfileSidebar />
      </div>
    </Layout>
  );
};

export default alerts;
