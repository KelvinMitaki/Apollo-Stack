import React from "react";
import styles from "../../styles/singleListing.module.css";
import SingleListingBody from "./SingleListingBody";

interface Props {}

const ContactFormMessages: React.FC<Props> = props => {
  const messages = [];
  for (let i = 0; i < 10; i++) {
    messages.push(<SingleListingBody key={i} active={i % 2 === 0} />);
  }
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
        <tbody>{messages}</tbody>
      </table>
    </div>
  );
};

export default ContactFormMessages;
