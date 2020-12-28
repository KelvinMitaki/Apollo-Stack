import React from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import styles from "../../styles/propertyDetails.module.css";

const Contact = () => {
  return (
    <div>
      <div>
        <h3>Contact Agent</h3>
        <div>
          <div>
            <FaPhoneAlt />
            <p>Contact Number</p>
          </div>
          <p>0712345678</p>
        </div>
        <div>
          <div>
            <MdEmail />
            <p>Email Address</p>
          </div>
          <p>johndoe@gmail.com</p>
        </div>
      </div>
      <div>
        <input type="text" placeholder="Name" />
        <input type="text" placeholder="Email" />
        <input type="text" placeholder="Phone Number" />
        <input type="text" placeholder="Message" />
        <button>Send Message</button>
      </div>
    </div>
  );
};

export default Contact;
