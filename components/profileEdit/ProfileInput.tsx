import React, { useState } from "react";
import { WrappedFieldProps } from "redux-form";
import styles from "../../styles/edit.module.css";

interface Props {
  label: string;
  disabled: boolean;
}

const ProfileInput: React.FC<WrappedFieldProps & Props> = props => {
  const [inputFocus, setInputFocus] = useState<string>("");
  return (
    <div className={inputFocus === props.input.name ? styles.focused : ""}>
      <label htmlFor={props.input.name}>{props.label}</label>
      <input
        {...props.input}
        onFocus={e => {
          props.input.onFocus(e);
          setInputFocus(e.target.name);
        }}
        onBlur={e => {
          props.input.onBlur(e);
          setInputFocus("");
        }}
        type="text"
        id={props.input.name}
        name={props.input.name}
        disabled={props.disabled}
        style={{ ...(props.disabled && { cursor: "not-allowed" }) }}
      />
      {props.meta.error && props.meta.touched && (
        <div className={styles.error}>{props.meta.error}</div>
      )}
    </div>
  );
};

export default ProfileInput;
