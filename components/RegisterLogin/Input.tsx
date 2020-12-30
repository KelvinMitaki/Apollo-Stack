import React from "react";
import { WrappedFieldProps } from "redux-form";
import styles from "../../styles/registerLoginModal.module.css";

interface Props {
  type: "text" | "password";
  label: "Email" | "Password";
}

const Input: React.FC<WrappedFieldProps & Props> = props => {
  return (
    <div>
      <label>{props.label}</label>
      <input type={props.type} {...props.input} />
      {props.meta.error && <div>{props.meta.error}</div>}
    </div>
  );
};

export default Input;
