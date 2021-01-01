import React from "react";
import Layout from "../../../components/Layout/Layout";
import styles from "../../../styles/listingEdit.module.css";

const listingId = () => {
  return (
    <Layout title="Edit Listing">
      <div className={styles.container}>
        <div className={styles.body}>
          <div className={styles.header}>
            <div className={styles.active}>
              <p>listing</p>
            </div>
            <div>
              <p>attributes</p>
            </div>
            <div>
              <p>marketing</p>
            </div>
            <div>
              <p>images</p>
            </div>
            <div></div>
            <div className={styles.btn}>
              <button>save</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default listingId;
