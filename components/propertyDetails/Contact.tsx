import React from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import validator from "validator";
import { PropertyDetails } from "../../pages/property/[id]";
import styles from "../../styles/propertyDetails.module.css";
import ContactInput from "./ContactInput";
interface FormValues {
  fullName: string;
  email: string;
  phoneNumber: string;
  message: string;
}
const Contact: React.FC<
  InjectedFormProps<FormValues, PropertyDetails> & PropertyDetails
> = props => {
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
        <form
          onSubmit={props.handleSubmit(formValues => console.log(formValues))}
        >
          <div className={styles.input}>
            <Field
              component={ContactInput}
              type="text"
              name="fullName"
              placeholder="Name"
            />
            <Field
              component={ContactInput}
              type="text"
              name="email"
              placeholder="Email"
            />
            <Field
              component={ContactInput}
              type="number"
              name="phoneNumber"
              placeholder="Phone Number"
            />
            <Field
              component={ContactInput}
              type="text"
              name="message"
              placeholder="Message"
            />
            <button type="submit" disabled={props.invalid}>
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
const validate = (formValues: FormValues) => {
  const { email, fullName, message, phoneNumber } = formValues;
  const errors = {} as FormValues;
  if (!email || (email && !validator.isEmail(email))) {
    errors.email = "Invalid email";
  }
  if (!fullName || (fullName && fullName.trim().length === 0)) {
    errors.fullName = "Invalid name";
  }
  if (!message || (message && message.trim().length === 0)) {
    errors.message = "Invalid Message";
  }
  if (
    !phoneNumber ||
    (phoneNumber && !validator.isNumeric(phoneNumber)) ||
    (phoneNumber && phoneNumber.length < 8)
  ) {
    errors.phoneNumber = "invalid phone number";
  }
  return errors;
};
export default reduxForm<FormValues, PropertyDetails>({
  form: "Contact",
  validate
})(Contact);
