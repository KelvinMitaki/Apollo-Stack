import React from "react";
import { WrappedFieldProps } from "redux-form";
import styles from "../../styles/registerLoginModal.module.css";

interface Props {
  label: string;
}

const TextArea: React.FC<WrappedFieldProps & Props> = props => {
  return (
    <div
      className={`${styles.TextArea} ${
        props.meta.error && props.meta.touched ? styles.error : ""
      }`}
    >
      <label>{props.label}</label>
      <textarea
        {...props.input}
        id={props.input.name}
        cols={30}
        rows={10}
      ></textarea>
      {props.meta.error && props.meta.touched && <div>{props.meta.error}</div>}
    </div>
  );
};

export default TextArea;
