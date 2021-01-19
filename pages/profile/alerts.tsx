import React, { useLayoutEffect, useState } from "react";
import SavedAlerts from "../../components/alerts/SavedAlerts";
import HouseFilter from "../../components/Homepage/Header/HouseFilter";
import Layout from "../../components/Layout/Layout";
import ProfileSidebar from "../../components/profileEdit/ProfileSidebar";
import withAuth from "../../HOCs/withAuth";
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
    if (window.innerWidth < 1000 && num !== 95) {
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
            bathrooms={[1, 2, 3, 4, 5]}
            bedrooms={[1, 2, 3, 4, 5]}
            categories={[
              { name: "apartment", subCats: true },
              { name: "house", subCats: true },
              { name: "townhouse", subCats: true },
              { name: "vacant land" },
              { name: "farm" },
              { name: "commercial" },
              { name: "industrial" }
            ]}
            alternate
            btnContent="Add Alert"
            width={`${num?.toString()}vw` || "60vw"}
            component="alerts"
          />
          <SavedAlerts />
        </div>
      </div>
    </Layout>
  );
};

export default withAuth(alerts);
