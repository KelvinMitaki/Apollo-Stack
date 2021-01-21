import { useQuery } from "@apollo/client";
import React from "react";
import { WrappedFieldProps } from "redux-form";
import { FETCH_CURRENT_USER } from "../../graphql/queries/queries";
import styles from "../../styles/propertyDetails.module.css";

interface Props {
  type: string;
  placeholder: string;
  className?: string;
  reference?: number;
}

const ContactInput: React.FC<WrappedFieldProps & Props> = props => {
  const user = useQuery(FETCH_CURRENT_USER, { fetchPolicy: "cache-only" });
  const messageValue = () => {
    if (
      props.input.name === "message" &&
      !props.input.value &&
      !props.meta.touched
    ) {
      return `Please contact me regarding web reference ${props.reference}`;
    }
    if (props.input.name === "message" && props.input.value) {
      return props.input.value;
    }
    return props.input.value;
  };
  return (
    <>
      {props.className ? (
        <textarea
          {...props.input}
          placeholder={props.placeholder}
          className={styles[props.className]}
          value={messageValue()}
        ></textarea>
      ) : (
        <>
          {user.data &&
          user.data.currentUser &&
          props.input.name === "fullName" &&
          !props.input.value ? (
            <input
              {...props.input}
              type={props.type}
              placeholder={props.placeholder}
              value={`${user.data.currentUser.firstName} ${user.data.currentUser.lastName}`}
              className={styles.fullName}
            />
          ) : (
            <input
              {...props.input}
              type={props.type}
              placeholder={props.placeholder}
            />
          )}
        </>
      )}
    </>
  );
};

export default ContactInput;
