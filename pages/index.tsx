import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import Featured from "../components/Homepage/Featured/Featured";
import Header from "../components/Homepage/Header/Header";
import Layout, { SetToggleNavbar } from "../components/Layout/Layout";
import { ActionTypes } from "../redux/types/types";
import styles from "../styles/home.module.css";

export default function Home() {
  return (
    <div className={`${styles.container}`}>
      <Layout title="Home Page">
        <Header />
        <Featured />
      </Layout>
    </div>
  );
}
