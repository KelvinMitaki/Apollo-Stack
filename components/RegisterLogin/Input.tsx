import React, { useEffect, useState } from "react";
import { WrappedFieldProps } from "redux-form";
import styles from "../../styles/registerLoginModal.module.css";

interface Props {
  type: "text" | "password";
  label: "Email" | "Password";
  disabled?: boolean;
  sup?: number;
}

const Input: React.FC<WrappedFieldProps & Props> = props => {
  const [focused, setFocused] = useState<boolean>(false);
  useEffect(() => {
    if (
      typeof props.input.value === "string" &&
      props.input.value.length !== 0
    ) {
      setFocused(true);
    }
  }, []);
  return (
    <div
      className={`${styles.input} ${focused ? styles.focused : ""} ${
        props.meta.error && props.meta.touched ? styles.error : ""
      }`}
    >
      <label>
        {props.label}
        {props.sup && <sup>{props.sup}</sup>}
      </label>
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
        disabled={props.disabled}
        style={{ ...(props.disabled && { cursor: "not-allowed" }) }}
      />
      {props.meta.error && props.meta.touched && <div>{props.meta.error}</div>}
    </div>
  );
};

export default Input;
