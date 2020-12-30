import React from "react";
import { useSelector } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Redux } from "../../interfaces/Redux";
import styles from "../../styles/registerLoginModal.module.css";
import Input from "./Input";

const Login = () => {
  const styling = useSelector((state: Redux) => state.styling);
  return (
    <div
      className={`${styles.login} ${
        !styling.toggleLoginHeader ? styles.register_active : ""
      }`}
    >
      <Field component={Input} label="Email" type="text" name="email" />
      <Field
        component={Input}
        label="Password"
        type="password"
        name="password"
      />
    </div>
  );
};

export default reduxForm({ form: "Login" })(Login);
