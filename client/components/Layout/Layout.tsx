import React from "react";
import Head from "next/head";
import styles from "../../styles/Head.module.css";

interface Props {
  title: string;
}

const Layout: React.FC<Props> = props => {
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
      <div className={styles.container}>
        <div className={styles.logo_prt}>
          <div className={styles.logo}>
            <p>yellow market</p>
          </div>
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
      </div>
    </div>
  );
};

export default Layout;
