import React from "react";
import { InjectedFormProps, reduxForm } from "redux-form";
import validator from "validator";

interface FormValues {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const AgentRegister: React.FC<InjectedFormProps<FormValues>> = props => {
  return <div>AgentRegister AgentRegister</div>;
};

const validate = (formValues: FormValues) => {
  const errors = {} as FormValues;
  if (!formValues.fullName || formValues.fullName.trim().length === 0) {
    errors.fullName = "Please enter a valid full name";
  }
  if (
    !formValues.email ||
    (formValues.email && !validator.isEmail(formValues.email))
  ) {
    errors.email = "Please enter a valid email";
  }
  if (
    !formValues.password ||
    (formValues.password && formValues.password.trim().length < 6)
  ) {
    errors.password = "Password must be six characters minimum";
  }
  if (formValues.password !== formValues.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }
  return errors;
};

export default reduxForm<FormValues>({ form: "AgentRegister", validate })(
  AgentRegister
);
