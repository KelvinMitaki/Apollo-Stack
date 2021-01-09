import { useMutation } from "@apollo/client";
import Router from "next/router";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Field, InjectedFormProps, reduxForm, reset } from "redux-form";
import validator from "validator";
import { LOGIN_USER } from "../../graphql/mutations/mutations";
import { Redux } from "../../interfaces/Redux";
import { ActionTypes } from "../../redux/types/types";
import styles from "../../styles/registerLoginModal.module.css";
import { SetToggleLogin } from "../Layout/Layout";
import Loading from "../loading/Loading";
import Input from "./Input";

interface FormValues {
  email: string;
  password: string;
}

const Login: React.FC<InjectedFormProps<FormValues>> = props => {
  const [error, setError] = useState<string>("");
  const dispatch = useDispatch();
  const styling = useSelector((state: Redux) => state.styling);
  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    onCompleted(data) {
      if (process.env.NODE_ENV === "production") {
        document.cookie = `client_token=${
          data.loginUser.token
        }; Path=/; Expires=${new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)};`;
      }
      Router.replace("/profile/edit");
      dispatch(reset("Login"));
      dispatch<SetToggleLogin>({
        type: ActionTypes.toggleLogin,
        payload: false
      });
    },
    onError(err) {
      setError(err.graphQLErrors[0].message);
    }
  });
  if (loading) return <Loading />;
  return (
    <div
      className={`${styles.login} ${
        styling.toggleLoginHeader === "login" ? styles.login_active : ""
      }`}
    >
      <form
        onSubmit={props.handleSubmit(async formvalues => {
          loginUser({
            variables: formvalues
          });
        })}
      >
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
        {error.trim().length !== 0 && (
          <div className={styles.error}>{error}</div>
        )}
        <div className={styles.login_btn}>
          <button type="submit" disabled={props.invalid}>
            login
          </button>
        </div>
      </form>
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
