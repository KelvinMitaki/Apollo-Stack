import React from "react";
import Layout from "../../components/Layout/Layout";
import ProfileSidebar from "../../components/profileEdit/ProfileSidebar";
import withAuth from "../../HOCs/withAuth";
import styles from "../../styles/favorites.module.css";

const favorites = () => {
  return (
    <Layout title="Favorites">
      <div className={styles.container}>
        <ProfileSidebar />
      </div>
    </Layout>
  );
};

export default withAuth(favorites);
