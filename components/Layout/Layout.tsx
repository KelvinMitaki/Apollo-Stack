import React, { useContext, useEffect, useRef, useState } from "react";
import Head from "next/head";
import styles from "../../styles/Layout.module.css";
import Footer from "../Homepage/Footer/Footer";
import Sidebar from "../Homepage/Sidebar/Sidebar";
import { StylingContext } from "../../Context/StylingContext";
import Link from "next/link";

interface Props {
  title: string;
  children: React.ReactNode;
}

const Layout: React.FC<Props> = props => {
  const { setToggle, toggle, toggleRef } = useContext(StylingContext);
  return (
    <div>
      <Head>
        <title>{props.title}</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Yellowtail&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          type="text/css"
          charSet="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
      </Head>
      <main>
        <div className={styles.container}>
          <div className={styles.logo_prt}>
            <Link href="/">
              <div className={styles.logo}>
                <a>
                  <p>property domain</p>
                </a>
              </div>
            </Link>
          </div>
          <div className={styles.opts}>
            <div className={styles.opts_item}>
              <p>for sale</p>
            </div>
            <div className={styles.opts_item}>
              <p>to rent</p>
            </div>
            <div className={styles.opts_item}>
              <p>developments</p>
            </div>
            <div className={styles.opts_item}>
              <p>repossessed</p>
            </div>
            <div className={styles.opts_item}>
              <p>login</p>
            </div>
            <div className={styles.opts_item}>
              <p>register</p>
            </div>
          </div>
          <div
            className={styles.sidebar_toggle}
            onClick={() => setToggle && setToggle(!toggle)}
            ref={toggleRef}
          >
            <div></div>
          </div>
        </div>
        <div className={` ${toggle ? styles.toggle : ""}`}></div>
        {toggleRef && <Sidebar toggle={toggle} toggleRef={toggleRef} />}
        {props.children}
        <Footer />
      </main>
    </div>
  );
};

export default Layout;
