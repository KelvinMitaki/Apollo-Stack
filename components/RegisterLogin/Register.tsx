import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import validator from "validator";
import { Redux } from "../../interfaces/Redux";
import { ActionTypes } from "../../redux/types/types";
import styles from "../../styles/registerLoginModal.module.css";
import Input from "./Input";
import { ToggleLoginHeader } from "./RegisterLoginModal";

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register: React.FC<InjectedFormProps<FormValues>> = props => {
  const styling = useSelector((state: Redux) => state.styling);
  const dispatch = useDispatch();
  return (
    <div
      className={`${styles.register} ${
        styling.toggleLoginHeader === "register" ? styles.register_active : ""
      }`}
    >
      <Field
        component={Input}
        label="First Name"
        type="text"
        name="firstName"
      />
      <Field component={Input} label="Last Name" type="text" name="lastName" />
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
      <div className={styles.register_btn}>
        <button type="submit" disabled={props.invalid}>
          register
        </button>
      </div>
      <div
        className={styles.agnt_link}
        onClick={() => {
          dispatch<ToggleLoginHeader>({
            type: ActionTypes.toggleLoginHeader,
            payload: "agent"
          });
        }}
      >
        <p>or register as an Agent</p>
      </div>
    </div>
  );
};

const validate = (formValues: FormValues) => {
  const errors = {} as FormValues;
  if (!formValues.firstName || formValues.firstName.trim().length === 0) {
    errors.firstName = "Please enter a valid first name";
  }
  if (!formValues.lastName || formValues.lastName.trim().length === 0) {
    errors.lastName = "Please enter a valid last name";
  }
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
  if (formValues.password !== formValues.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }
  return errors;
};

export default reduxForm<FormValues>({ form: "Register", validate })(Register);
