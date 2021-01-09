import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Field, InjectedFormProps, reduxForm, reset } from "redux-form";
import validator from "validator";
import { REGISTER_USER } from "../../graphql/mutations/mutations";
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
  const [error, setError] = useState<string>("");
  const styling = useSelector((state: Redux) => state.styling);
  const dispatch = useDispatch();
  const [registerUser] = useMutation(REGISTER_USER, {
    onError(err) {
      setError(err.graphQLErrors[0].message);
    },
    onCompleted() {
      dispatch(reset("Register"));
      dispatch<ToggleLoginHeader>({
        type: ActionTypes.toggleLoginHeader,
        payload: "login"
      });
    }
  });
  return (
    <div
      className={`${styles.register} ${
        styling.toggleLoginHeader === "register" ? styles.register_active : ""
      }`}
    >
      <form
        onSubmit={props.handleSubmit((formValues: FormValues) =>
          registerUser({ variables: formValues })
        )}
      >
        <Field
          setError={setError}
          component={Input}
          label="First Name"
          type="text"
          name="firstName"
          capitalize
        />
        <Field
          setError={setError}
          component={Input}
          label="Last Name"
          type="text"
          name="lastName"
          capitalize
        />
        <Field
          setError={setError}
          component={Input}
          label="Email"
          type="text"
          name="email"
        />
        <Field
          setError={setError}
          component={Input}
          label="Password"
          type="password"
          name="password"
        />
        <Field
          setError={setError}
          component={Input}
          label="Confirm Password"
          type="password"
          name="confirmPassword"
        />
        {error.trim().length !== 0 && (
          <div className={styles.error} style={{ marginBottom: "2rem" }}>
            {error}
          </div>
        )}
        <div className={styles.register_btn}>
          <button type="submit" disabled={props.invalid}>
            register
          </button>
        </div>
      </form>
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
