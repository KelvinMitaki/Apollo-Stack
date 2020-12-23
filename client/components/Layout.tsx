import React from "react";
import Head from "next/head";
import styles from "../styles/Head.module.css";

interface Props {
  title: string;
}

const Layout: React.FC<Props> = props => {
  return (
    <div>
      <Head>
        <title>{props.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <div>
          <p>yellow market</p>
        </div>
        <div>
          <p>for sale</p>
        </div>
        <div>
          <p>to rent</p>
        </div>
        <div>
          <p>developments</p>
        </div>
        <div>
          <p>repossessed</p>
        </div>
        <div>
          <p>login</p>
        </div>
        <div>
          <p>register</p>
        </div>
      </div>
    </div>
  );
};

export default Layout;
