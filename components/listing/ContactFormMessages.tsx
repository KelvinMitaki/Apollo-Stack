import React from "react";
import styles from "../../styles/singleListing.module.css";
import SingleListingBody from "./SingleListingBody";

interface Props {
  contactFormMessages: ContactFormMessagesI[];
}

export interface ContactFormMessagesI {
  _id: string;
  email: string;
  fullName: string;
  phoneNumber: number;
  message: string;
  createdAt: string;
}

const ContactFormMessages: React.FC<Props> = props => {
  return (
    <div className={styles.prt}>
      <p>contact form messages</p>
      <table cellSpacing="0">
        <colgroup>
          <col />
          <col />
          <col />
          <col />
          <col width="30%" />
        </colgroup>
        <thead>
          <tr>
            <th>date</th>
            <th>name</th>
            <th>email address</th>
            <th>contact number</th>
            <th>message</th>
          </tr>
        </thead>
        <tbody>
          {props.contactFormMessages.map((msg, i) => (
            <SingleListingBody
              key={i}
              active={i % 2 === 0}
              contactFormMessage={msg}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactFormMessages;
