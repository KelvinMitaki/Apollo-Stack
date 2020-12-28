import React from "react";
import styles from "../../styles/profile.module.css";

const ProfileEdit = () => {
  return (
    <div>
      <h4>Profile</h4>
      <form>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input type="text" id="firstName" />
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <input type="text" id="lastName" />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="text" id="email" />
        </div>
        <div>
          <label htmlFor="phoneNumber">Phone Number</label>
          <input type="text" id="phoneNumber" />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default ProfileEdit;
