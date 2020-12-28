import React from "react";
import Layout from "../../components/Layout/Layout";
import ProfileEdit from "../../components/profileEdit/profileEdit";
import ProfileSidebar from "../../components/profileEdit/ProfileSidebar";
import styles from "../../styles/profile.module.css";

const edit = () => {
  return (
    <Layout title="Edit Profile">
      <ProfileSidebar />
      <ProfileEdit />
    </Layout>
  );
};

export default edit;
