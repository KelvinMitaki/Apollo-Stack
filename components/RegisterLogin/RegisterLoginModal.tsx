import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redux } from "../../interfaces/Redux";
import { ActionTypes } from "../../redux/types/types";
import styles from "../../styles/registerLoginModal.module.css";
import { SetToggleLogin } from "../Layout/Layout";
import Login from "./Login";
import Register from "./Register";

export interface ToggleLoginHeader {
  type: ActionTypes.toggleLoginHeader;
  payload: boolean;
}

const RegisterLoginModal = () => {
  const dispatch = useDispatch();
  const loginRef = useRef<HTMLDivElement>(null);
  const styling = useSelector((state: Redux) => state.styling);
  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);
  const handleOutsideClick = (e: Event) => {
    // @ts-ignore
    if (loginRef.current && !loginRef.current.contains(e.target)) {
      dispatch<SetToggleLogin>({
        type: ActionTypes.toggleLogin,
        payload: false
      });
    }
  };
  return (
    <div
      className={`${styles.container} ${
        styling.toggleLogin ? styles.container__show : ""
      }`}
    >
      <div ref={loginRef} className={styles.body}>
        <div className={styles.header}>
          <p
            onClick={() =>
              dispatch<ToggleLoginHeader>({
                type: ActionTypes.toggleLoginHeader,
                payload: true
              })
            }
            className={styling.toggleLoginHeader ? styles.active : ""}
          >
            login
          </p>
          <p
            onClick={() =>
              dispatch<ToggleLoginHeader>({
                type: ActionTypes.toggleLoginHeader,
                payload: false
              })
            }
            className={!styling.toggleLoginHeader ? styles.active : ""}
          >
            register
          </p>
        </div>
        <div className={styles.opts}>
          <Login />
          <Register />
        </div>
      </div>
    </div>
  );
};

export default RegisterLoginModal;
