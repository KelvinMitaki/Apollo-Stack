import React, { useEffect } from "react";
import { InjectedFormProps, reduxForm, Field, reset } from "redux-form";
import validator from "validator";
import Input from "./Input";
import styles from "../../styles/registerLoginModal.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Redux } from "../../interfaces/Redux";
import { useMutation } from "@apollo/client";
import { REGISTER_AGENT } from "../../graphql/mutations/mutations";
import { ToggleLoginHeader } from "./RegisterLoginModal";
import { ActionTypes } from "../../redux/types/types";
import Loading from "../loading/Loading";

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}
interface Props {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const AgentRegister: React.FC<
  InjectedFormProps<FormValues, Props> & Props
> = props => {
  const dispatch = useDispatch();
  const styling = useSelector((state: Redux) => state.styling);
  const [registerAgent, { loading }] = useMutation(REGISTER_AGENT, {
    onError(err) {
      console.log(err);
    },
    onCompleted() {
      dispatch(reset("AgentRegister"));
      dispatch<ToggleLoginHeader>({
        type: ActionTypes.toggleLoginHeader,
        payload: "login"
      });
    }
  });
  useEffect(() => {
    props.setLoading(loading);
  }, [loading]);
  return (
    <div
      className={`${styles.agent} ${
        styling.toggleLoginHeader === "agent" ? styles.agent_active : ""
      }`}
    >
      <form
        onSubmit={props.handleSubmit(formValues =>
          registerAgent({
            variables: {
              ...formValues,
              phoneNumber: parseInt(formValues.phoneNumber)
            }
          })
        )}
      >
        <Field
          component={Input}
          label="First Name"
          type="text"
          name="firstName"
          capitalize
        />
        <Field
          component={Input}
          label="Last Name"
          type="text"
          capitalize
          name="lastName"
        />
        <Field component={Input} label="Email" type="text" name="email" />
        <Field
          component={Input}
          label="Phone Number"
          type="text"
          name="phoneNumber"
        />
        <Field component={Input} label="Address" type="text" name="address" />
        <Field
          component={Input}
          label="Password"
          type="password"
          name="password"
        />
        <Field
          component={Input}
          label="Confirm Password"
          type="password"
          name="confirmPassword"
        />
        <div className={styles.register_btn}>
          <button type="submit" disabled={props.invalid}>
            register
          </button>
        </div>
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
    !validator.isNumeric(formValues.phoneNumber) ||
    formValues.phoneNumber.trim().length < 8
  ) {
    errors.phoneNumber = "Please enter a valid phone number";
  }
  if (
    !formValues.address ||
    (formValues.address && formValues.address.trim().length === 0)
  ) {
    errors.address = "Please enter a valid address";
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

export default reduxForm<FormValues, Props>({
  form: "AgentRegister",
  validate
})(AgentRegister);
