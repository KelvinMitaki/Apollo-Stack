import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import validator from "validator";
import { Redux } from "../../interfaces/Redux";
import styles from "../../styles/registerLoginModal.module.css";
import Input from "./Input";

interface FormValues {
  email: string;
  password: string;
}

const Login: React.FC<InjectedFormProps<FormValues>> = props => {
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
      <div className={styles.login_btn}>
        <button type="submit" disabled={props.invalid}>
          login
        </button>
      </div>
    </div>
  );
};

const validate = (formValues: FormValues) => {
  const errors = {} as FormValues;

  if (
    !formValues.email ||
    (formValues.email && !validator.isEmail(formValues.email))
  ) {
    errors.email = "Please enter a valid email";
  }
  if (
    !formValues.password ||
    (formValues.password && formValues.password.trim().length < 6)
  ) {
    errors.password = "Password must be six characters minimum";
  }

  return errors;
};

export default reduxForm<FormValues>({ form: "Login", validate })(Login);
