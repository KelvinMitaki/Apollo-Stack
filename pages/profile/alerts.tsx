import React, { useLayoutEffect, useState } from "react";
import SavedAlerts from "../../components/alerts/SavedAlerts";
import HouseFilter from "../../components/Homepage/Header/HouseFilter";
import Layout from "../../components/Layout/Layout";
import ProfileSidebar from "../../components/profileEdit/ProfileSidebar";
import styles from "../../styles/alerts.module.css";

const alerts = () => {
  const [num, setNum] = useState<number | null>(null);
  if (typeof window !== "undefined") {
    useLayoutEffect(() => {
      window.addEventListener("resize", resize);
      resize();
      return () => {
        window.removeEventListener("resize", resize);
      };
    }, []);
  }
  const resize = () => {
    if (window.innerWidth < 1000 && window.innerWidth > 600 && num !== 95) {
      setNum(95);
    }
    if (window.innerWidth > 1000 && num !== 60) {
      setNum(60);
    }
  };
  return (
    <Layout title="Alerts">
      <div className={styles.container}>
        <ProfileSidebar />
        <div className={styles.alert_content}>
          <HouseFilter
            alternate
            btnContent="Add Alert"
            width={`${num?.toString()}vw` || "60vw"}
          />
          <SavedAlerts />
        </div>
      </div>
    </Layout>
  );
};

export default alerts;
