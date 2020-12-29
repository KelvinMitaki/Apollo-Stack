import React from "react";
import { useSelector } from "react-redux";
import { Redux } from "../../interfaces/Redux";
import styles from "../../styles/registerLoginModal.module.css";

const RegisterLoginModal = () => {
  const toggleLogin = useSelector((state: Redux) => state.styling.toggleLogin);
  return (
    <div
      className={`${styles.container} ${
        toggleLogin ? styles.container__show : ""
      }`}
    >
      RegisterLoginModal RegisterLoginModal
    </div>
  );
};

export default RegisterLoginModal;
