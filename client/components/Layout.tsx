import React from "react";
import Head from "next/head";

interface Props {
  title: string;
}

const Layout: React.FC<Props> = props => {
  return (
    <Head>
      <title>{props.title}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default Layout;
