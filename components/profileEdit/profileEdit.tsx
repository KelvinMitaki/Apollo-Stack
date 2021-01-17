import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import validator from "validator";
import { EDIT_PROFILE } from "../../graphql/mutations/mutations";
import styles from "../../styles/edit.module.css";
import Loading from "../loading/Loading";
import ProfileInput from "./ProfileInput";

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  isAgent?: boolean;
  initialValues: Partial<FormValues>;
}

const ProfileEdit: React.FC<
  InjectedFormProps<FormValues, {}, string>
> = props => {
  const [error, setError] = useState<string | null>(null);
  const [editProfile, { loading }] = useMutation(EDIT_PROFILE, {
    onError(err) {
      console.log(err);
      console.log(err.graphQLErrors);
      console.log(err.message);
    }
  });
  return (
    <div className={styles.edit}>
      <h4>Profile</h4>
      {loading && <Loading />}
      <form
        onSubmit={props.handleSubmit(formValues => {
          error && setError("");
          if (props.initialValues.isAgent && !formValues.phoneNumber) {
            setError("phone number is required");
            return;
          }

          editProfile({
            variables: {
              ...formValues,
              phoneNumber: parseInt(formValues.phoneNumber)
            }
          });
        })}
      >
        <Field
          component={ProfileInput}
          label="First Name"
          type="text"
          name="firstName"
          capitalize
        />
        <Field
          component={ProfileInput}
          label="Last Name"
          type="text"
          name="lastName"
          capitalize
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

        <button type="submit" disabled={props.invalid || props.pristine}>
          Save
        </button>
      </form>
      {error && <div style={{ fontWeight: "bold", color: "red" }}>{error}</div>}
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
  if (formValues.phoneNumber && formValues.phoneNumber.length !== 0) {
    if (
      !validator.isNumeric(formValues.phoneNumber.toString()) ||
      formValues.phoneNumber.length < 8
    ) {
      errors.phoneNumber =
        "Please enter a valid phone number of eight characters minimum";
    }
  }
  return errors;
};
// @ts-ignore
export default reduxForm<FormValues>({ form: "ProfileEdit", validate })(
  // @ts-ignore
  ProfileEdit
);
