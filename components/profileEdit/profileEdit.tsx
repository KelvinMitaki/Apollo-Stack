import React, { useState } from "react";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import styles from "../../styles/edit.module.css";
import ProfileInput from "./ProfileInput";

const ProfileEdit: React.FC<InjectedFormProps> = props => {
  return (
    <div className={styles.edit}>
      <h4>Profile</h4>
      <form>
        <Field
          component={ProfileInput}
          label="First Name"
          type="text"
          name="firstName"
        />
        <Field
          component={ProfileInput}
          label="Last Name"
          type="text"
          name="lastName"
        />
        <Field
          component={ProfileInput}
          label="Email"
          type="text"
          name="email"
        />
        <Field
          component={ProfileInput}
          label="Phone Number"
          type="text"
          name="phoneNumber"
        />

        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default reduxForm({ form: "ProfileEdit" })(ProfileEdit);
