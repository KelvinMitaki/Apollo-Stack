import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import Router from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import validator from "validator";
import { LOGIN_USER } from "../../graphql/mutations/mutations";
import { FETCH_CURRENT_USER } from "../../graphql/queries/queries";
import { Redux } from "../../interfaces/Redux";
import { ActionTypes } from "../../redux/types/types";
import styles from "../../styles/registerLoginModal.module.css";
import { SetToggleLogin } from "../Layout/Layout";
import Input from "./Input";

interface FormValues {
  email: string;
  password: string;
}

const Login: React.FC<InjectedFormProps<FormValues>> = props => {
  const dispatch = useDispatch();
  const styling = useSelector((state: Redux) => state.styling);
  // useQuery(FETCH_CURRENT_USER, { fetchPolicy: "cache-only" });
  const [loginUser] = useMutation(LOGIN_USER, {
    onCompleted(data) {
      document.cookie = `token=${
        data.loginUser.token
      }; Path=/; Expires=${new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)};`;
      Router.replace("/profile/edit");
      dispatch<SetToggleLogin>({
        type: ActionTypes.toggleLogin,
        payload: false
      });
    },
    onError(err) {
      console.log(err);
    }
  });
  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()!.split(";").shift();
  };
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
