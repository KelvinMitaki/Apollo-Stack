import React from "react";
import styles from "../../styles/Layout.module.css";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { ActionTypes } from "../../redux/types/types";
import { Redux } from "../../interfaces/Redux";
import { ToggleLoginHeader } from "../RegisterLogin/RegisterLoginModal";
import { SetToggleNavbar, SetToggleLogin } from "./Layout";

interface Props {
  toggleRef: React.RefObject<HTMLDivElement>;
}

const LayoutHeader: React.FC<Props> = props => {
  const toggleNavbar = useSelector(
    (state: Redux) => state.styling.toggleNavbar
  );
  const dispatch = useDispatch();
  const { toggleRef } = props;
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.logo_prt}>
          <div className={styles.logo}>
            <Link href="/">
              <a>
                <p>property domain</p>
              </a>
            </Link>
          </div>
        </div>
        <div className={styles.opts}>
          <Link href="/properties/123">
            <a>
              <div className={styles.opts_item}>
                <p>for sale</p>
              </div>
            </a>
          </Link>
          <Link href="/properties/123">
            <a>
              <div className={styles.opts_item}>
                <p>to rent</p>
              </div>
            </a>
          </Link>
          <Link href="/properties/123">
            <a>
              <div className={styles.opts_item}>
                <p>developments</p>
              </div>
            </a>
          </Link>
          <Link href="/properties/123">
            <a>
              <div className={styles.opts_item}>
                <p>repossessed</p>
              </div>
            </a>
          </Link>
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
              dispatch<ToggleLoginHeader>({
                type: ActionTypes.toggleLoginHeader,
                payload: "login"
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
              dispatch<ToggleLoginHeader>({
                type: ActionTypes.toggleLoginHeader,
                payload: "register"
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
    </div>
  );
};

export default LayoutHeader;