import React, { useState } from "react";
import { WrappedFieldProps } from "redux-form";
import styles from "../../styles/registerLoginModal.module.css";

interface Props {
  type: "text" | "password";
  label: "Email" | "Password";
}

const Input: React.FC<WrappedFieldProps & Props> = props => {
  const [focused, setFocused] = useState<boolean>(false);
  return (
    <div
      className={`${styles.input} ${focused ? styles.focused : ""} ${
        props.meta.error && props.meta.touched ? styles.error : ""
      }`}
    >
      <label>{props.label}</label>
      <input
        type={props.type}
        {...props.input}
        onBlur={e => {
          props.input.onBlur(e);
          if (
            typeof props.input.value === "string" &&
            props.input.value.length === 0
          ) {
            setFocused(false);
          }
        }}
        onFocus={e => {
          props.input.onFocus(e);
          setFocused(true);
        }}
      />
      {props.meta.error && props.meta.touched && <div>{props.meta.error}</div>}
    </div>
  );
};

export default Input;
