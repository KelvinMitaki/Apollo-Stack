import React, { useState } from "react";
import ReactDatePicker from "react-datepicker";
import { WrappedFieldProps } from "redux-form";
import styles from "../../styles/listingEdit.module.css";

interface Props {
  label: string;
}

const DateInput: React.FC<WrappedFieldProps & Props> = props => {
  const [focused, setFocused] = useState<boolean>(false);
  let date;
  const {
    input: { value }
  } = props;
  if (Object.prototype.toString.call(value) === "[object String]") {
    date = Object.prototype.toString.call(new Date(value));
  } else if (Object.prototype.toString.call(value) === "[object Date]") {
    date = Object.prototype.toString.call(value);
  } else {
    date = value;
  }
  return (
    <div className={`${styles.dp} ${focused ? styles.focused : ""}`}>
      <label htmlFor={props.input.name}>{props.label}</label>
      <ReactDatePicker
        {...props.input}
        className={styles.DatePicker}
        selected={
          value
            ? date !== "[object Date]"
              ? value.toDate()
              : new Date(value)
            : null
        }
        minDate={new Date()}
        popperClassName={styles.popper}
        popperPlacement="top"
        wrapperClassName={styles.wrapper}
        dateFormat="eeee Do MMMM, yyyy"
        onChangeRaw={e => e.preventDefault()}
        onFocus={e => {
          props.input.onFocus(e);
          setFocused(true);
        }}
        onBlur={e => {
          props.input.onBlur(e);
          setFocused(false);
        }}
      />
      {props.meta.error && props.meta.touched && (
        <div className={styles.error}>{props.meta.error}</div>
      )}
    </div>
  );
};

export default DateInput;
