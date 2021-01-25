import React from "react";
import styles from "../../styles/singleListing.module.css";
import { ContactFormMessagesI } from "./ContactFormMessages";

interface Props {
  active: boolean;
  contactFormMessage: ContactFormMessagesI;
}

const SingleListingBody: React.FC<Props> = props => {
  const {
    contactFormMessage: { createdAt, email, fullName, message, phoneNumber }
  } = props;
  return (
    <tr className={`${props.active ? styles.active : ""} ${styles.msg_row}`}>
      <td>
        {new Date(createdAt).toDateString()}{" "}
        <span style={{ textTransform: "lowercase" }}>at</span>{" "}
        {new Date(createdAt).toLocaleTimeString()}
      </td>
      <td>{fullName}</td>
      <td className={styles.email}>{email}</td>
      <td>07{phoneNumber.toString().slice(-8)}</td>
      <td className={styles.msg}>{message}</td>
    </tr>
  );
};

export default SingleListingBody;
