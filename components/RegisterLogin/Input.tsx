import React, { useEffect, useState } from "react";
import { WrappedFieldProps } from "redux-form";
import validator from "validator";
import styles from "../../styles/registerLoginModal.module.css";
import { AttributesAttrs } from "../listing/Attributes";

interface Props {
  type: "text" | "password";
  label: "Email" | "Password";
  disabled?: boolean;
  sup?: number;
  setError?: React.Dispatch<React.SetStateAction<string>>;
  capitalize?: boolean;
  setMongoError?: React.Dispatch<React.SetStateAction<string>>;
  mongoError?: string;
}

const Input: React.FC<WrappedFieldProps & Props> = props => {
  const [focused, setFocused] = useState<boolean>(false);

  if (
    typeof props.input.value === "string" &&
    props.input.value.length !== 0 &&
    !focused
  ) {
    setFocused(true);
  }
  return (
    <div
      className={`${styles.input} ${focused ? styles.focused : ""} ${
        props.meta.error && props.meta.touched ? styles.error : ""
      }`}
    >
      <label>
        {props.label}
        {props.sup && (
          <>
            <span>(in m</span>
            <sup>{props.sup}</sup>)
            {validator.isNumeric(props.input.value) &&
              (props.input.name as AttributesAttrs) === "plinthArea" && (
                <span>
                  {" "}
                  / ({(parseInt(props.input.value) * 10.7639).toFixed(2)}) SQFT
                </span>
              )}
            {validator.isNumeric(props.input.value) &&
              (props.input.name as AttributesAttrs) === "lotArea" && (
                <span>
                  {" "}
                  / ({(parseInt(props.input.value) * 10.7639).toFixed(2)}) SQFT
                </span>
              )}
          </>
        )}
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
          if (
            props.setMongoError &&
            props.mongoError &&
            props.mongoError.trim().length !== 0
          ) {
            props.setMongoError("");
          }
        }}
        onChange={e => {
          props.input.onChange(e);
          props.setError && props.setError("");
        }}
        disabled={props.disabled}
        style={{
          ...(props.disabled && { cursor: "not-allowed" }),
          ...(props.capitalize && { textTransform: "capitalize" })
        }}
      />
      {props.meta.error && props.meta.touched && <div>{props.meta.error}</div>}
    </div>
  );
};

export default Input;
