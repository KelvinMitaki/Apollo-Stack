import React, { useState } from "react";
import styles from "../../styles/profile.module.css";

const ProfileEdit = () => {
  const [input, setInput] = useState({
    firstName: false,
    lastName: false,
    email: false,
    phoneNumber: false
  });
  const inputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: true });
  };
  const inputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: false });
  };
  return (
    <div className={styles.edit}>
      <h4>Profile</h4>
      <form>
        <div className={input.firstName ? styles.focused : ""}>
          <label htmlFor="firstName">First Name</label>
          <input
            onFocus={inputFocus}
            onBlur={inputBlur}
            type="text"
            id="firstName"
            name="firstName"
          />
        </div>
        <div className={input.lastName ? styles.focused : ""}>
          <label htmlFor="lastName">Last Name</label>
          <input
            onFocus={inputFocus}
            onBlur={inputBlur}
            type="text"
            id="lastName"
            name="lastName"
          />
        </div>
        <div className={input.email ? styles.focused : ""}>
          <label htmlFor="email">Email</label>
          <input
            onFocus={inputFocus}
            onBlur={inputBlur}
            type="text"
            id="email"
            name="email"
          />
        </div>
        <div className={input.phoneNumber ? styles.focused : ""}>
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            onFocus={inputFocus}
            onBlur={inputBlur}
            type="text"
            id="phoneNumber"
            name="phoneNumber"
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default ProfileEdit;
