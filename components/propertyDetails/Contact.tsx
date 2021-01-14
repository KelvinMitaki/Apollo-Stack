import React from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { PropertyDetails } from "../../pages/property/[id]";
import styles from "../../styles/propertyDetails.module.css";

const Contact: React.FC<PropertyDetails> = props => {
  const formatPhoneNumber = (phoneNumber: number): string => {
    if (phoneNumber.toString().length === 8) {
      return `+2547${phoneNumber}`;
    }
    if (phoneNumber.toString().length === 9) {
      return `+254${phoneNumber}`;
    }
    return phoneNumber.toString();
  };
  return (
    <div>
      <div className={styles.contact}>
        <div className={styles.contact_header}>
          <h3>Contact Agent</h3>
          <div className={styles.phone}>
            <div>
              <FaPhoneAlt />
              <p>Contact Number</p>
            </div>
            <h4>{formatPhoneNumber(props.agent.phoneNumber)}</h4>
          </div>
          <div className={styles.email}>
            <div>
              <MdEmail />
              <p>Email Address</p>
            </div>
            <h4>{props.agent.email}</h4>
          </div>
        </div>
        <div className={styles.input}>
          <input type="text" placeholder="Name" />
          <input type="text" placeholder="Email" />
          <input type="text" placeholder="Phone Number" />
          <input type="text" placeholder="Message" />
          <button>Send Message</button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
