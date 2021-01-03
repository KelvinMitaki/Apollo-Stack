import React, { useState } from "react";
import Layout from "../../../components/Layout/Layout";
import Attributes from "../../../components/listing/Attributes";
import Images from "../../../components/listing/Images";
import Listing from "../../../components/listing/Listing";
import Marketing from "../../../components/listing/Marketing";
import styles from "../../../styles/listingEdit.module.css";

type HeaderType = "listing" | "attributes" | "marketing" | "images";

const listingId = () => {
  const [active, setActive] = useState<HeaderType>("listing");
  return (
    <Layout title="Edit Listing">
      <div className={styles.container}>
        <div className={styles.body}>
          <div className={styles.header}>
            <div
              onClick={() => setActive("listing")}
              className={active === "listing" ? styles.active : ""}
            >
              <p>listing</p>
            </div>
            <div
              onClick={() => setActive("attributes")}
              className={active === "attributes" ? styles.active : ""}
            >
              <p>attributes</p>
            </div>
            <div
              onClick={() => setActive("marketing")}
              className={active === "marketing" ? styles.active : ""}
            >
              <p>marketing</p>
            </div>
            <div
              onClick={() => setActive("images")}
              className={active === "images" ? styles.active : ""}
            >
              <p>images</p>
            </div>
            <div className={styles.no_content}></div>
            <div className={styles.btn}>
              <button>save</button>
            </div>
          </div>
          <div className={styles.opts}>
            {active === "listing" && <Listing />}
            {active === "attributes" && <Attributes />}
            {active === "marketing" && <Marketing />}
            {active === "images" && <Images />}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default listingId;
