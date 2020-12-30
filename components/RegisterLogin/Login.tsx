import React from "react";
import { Field, reduxForm } from "redux-form";
import styles from "../../styles/registerLoginModal.module.css";
import Input from "./Input";

const Login = () => {
  return (
    <div>
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
