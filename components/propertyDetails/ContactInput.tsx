import React from "react";
import { WrappedFieldProps } from "redux-form";
import styles from "../../styles/propertyDetails.module.css";

interface Props {
  type: string;
  placeholder: string;
  className?: string;
}

const ContactInput: React.FC<WrappedFieldProps & Props> = props => {
  return (
    <input
      {...props.input}
      type={props.type}
      placeholder={props.placeholder}
      className={styles[props.className || ""]}
    />
  );
};

export default ContactInput;
