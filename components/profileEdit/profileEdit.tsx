import React, { useState } from "react";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import validator from "validator";
import styles from "../../styles/edit.module.css";
import ProfileInput from "./ProfileInput";

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  initialValues: Partial<FormValues>;
}

const ProfileEdit: React.FC<
  InjectedFormProps<FormValues, {}, string>
> = props => {
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
          disabled
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

const validate = (formValues: FormValues) => {
  const errors = {} as FormValues;
  if (!formValues.firstName || formValues.firstName.trim().length === 0) {
    errors.firstName = "Please enter a valid first name";
  }
  if (!formValues.lastName || formValues.lastName.trim().length === 0) {
    errors.lastName = "Please enter a valid last name";
  }
  if (
    !formValues.email ||
    (formValues.email && !validator.isEmail(formValues.email))
  ) {
    errors.email = "Please enter a valid email";
  }
  if (
    !formValues.phoneNumber ||
    (formValues.phoneNumber && !validator.isNumeric(formValues.phoneNumber)) ||
    (formValues.phoneNumber && formValues.phoneNumber.length < 8)
  ) {
    errors.phoneNumber =
      "Please enter a valid phone number of eight characters minimum";
  }
  return errors;
};
// @ts-ignore
export default reduxForm<FormValues>({ form: "ProfileEdit", validate })(
  // @ts-ignore
  ProfileEdit
);
