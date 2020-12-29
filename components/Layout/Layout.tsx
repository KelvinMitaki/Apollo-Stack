import React, { useEffect, useRef } from "react";
import Head from "next/head";
import styles from "../../styles/Layout.module.css";
import Footer from "../Homepage/Footer/Footer";
import Sidebar from "../Homepage/Sidebar/Sidebar";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { ActionTypes } from "../../redux/types/types";
import { Redux } from "../../interfaces/Redux";
import RegisterLoginModal from "../RegisterLogin/RegisterLoginModal";
export interface SetToggleNavbar {
  type: ActionTypes.toggleNavbar;
  payload: boolean;
}
export interface SetToggleLogin {
  type: ActionTypes.toggleLogin;
  payload: boolean;
}

interface Props {
  title: string;
  children: React.ReactNode;
}

const Layout: React.FC<Props> = props => {
  const dispatch = useDispatch();
  const toggleNavbar = useSelector(
    (state: Redux) => state.styling.toggleNavbar
  );
  const toggleRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);
  const handleOutsideClick = (e: Event) => {
    // @ts-ignore
    if (toggleRef.current && !toggleRef.current.contains(e.target)) {
      dispatch<SetToggleNavbar>({
        type: ActionTypes.toggleNavbar,
        payload: false
      });
    }
  };
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
      <main className={styles.main}>
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
            <div
              className={styles.opts_item}
              onClick={() => {
                dispatch<SetToggleNavbar>({
                  type: ActionTypes.toggleNavbar,
                  payload: false
                });
                dispatch<SetToggleLogin>({
                  type: ActionTypes.toggleLogin,
                  payload: true
                });
              }}
            >
              <p>login</p>
            </div>
            <div
              className={styles.opts_item}
              onClick={() => {
                dispatch<SetToggleNavbar>({
                  type: ActionTypes.toggleNavbar,
                  payload: false
                });
                dispatch<SetToggleLogin>({
                  type: ActionTypes.toggleLogin,
                  payload: true
                });
              }}
            >
              <p>register</p>
            </div>
          </div>
          <div
            className={styles.sidebar_toggle}
            onClick={() => {
              dispatch<SetToggleNavbar>({
                type: ActionTypes.toggleNavbar,
                payload: !toggleNavbar
              });
            }}
            ref={toggleRef}
          >
            <div></div>
          </div>
        </div>
        <div className={` ${toggleNavbar ? styles.toggle : ""}`}></div>
        <Sidebar toggleRef={toggleRef} />
        <RegisterLoginModal />
        {props.children}
        <div className={styles.footer}>
          <Footer />
        </div>
      </main>
    </div>
  );
};

export default Layout;
