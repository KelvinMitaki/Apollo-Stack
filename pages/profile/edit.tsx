import { useQuery } from "@apollo/client";
import React from "react";
import Layout from "../../components/Layout/Layout";
import ProfileEdit from "../../components/profileEdit/profileEdit";
import ProfileSidebar from "../../components/profileEdit/ProfileSidebar";
import { FETCH_CURRENT_USER } from "../../graphql/queries/queries";
import withAuth from "../../HOCs/withAuth";
import styles from "../../styles/edit.module.css";

const edit = () => {
  const { data } = useQuery(FETCH_CURRENT_USER, {
    fetchPolicy: "cache-only",
    variables: "edit"
  });
  return (
    <Layout title="Edit Profile">
      <div className={styles.container}>
        <ProfileSidebar />
        <ProfileEdit initialValues={data.currentUser} />
      </div>
    </Layout>
  );
};

export default withAuth(edit);
