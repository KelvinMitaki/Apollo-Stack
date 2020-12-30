import React from "react";
import Layout from "../../components/Layout/Layout";
import ProfileEdit from "../../components/profileEdit/profileEdit";
import ProfileSidebar from "../../components/profileEdit/ProfileSidebar";
import styles from "../../styles/edit.module.css";

const edit = () => {
  return (
    <Layout title="Edit Profile">
      <div className={styles.container}>
        <ProfileSidebar />
        <ProfileEdit />
      </div>
    </Layout>
  );
};

export default edit;
