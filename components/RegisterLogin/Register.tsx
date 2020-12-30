import React from "react";
import { useSelector } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Redux } from "../../interfaces/Redux";
import styles from "../../styles/registerLoginModal.module.css";
import Input from "./Input";

const Register = () => {
  const styling = useSelector((state: Redux) => state.styling);
  return (
    <div
      className={`${styles.register} ${
        !styling.toggleLoginHeader ? styles.register_active : ""
      }`}
    >
      <Field component={Input} label="Full Name" type="text" name="fullName" />
      <Field component={Input} label="Email" type="text" name="email" />
      <Field
        component={Input}
        label="Password"
        type="password"
        name="password"
      />
      <Field
        component={Input}
        label="Confirm Password"
        type="password"
        name="confirmPassword"
      />
    </div>
  );
};

export default reduxForm({ form: "Register" })(Register);
