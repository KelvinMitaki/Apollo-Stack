import React, { useEffect, useState } from "react";
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
    console.log("reached 1");
    date = Object.prototype.toString.call(new Date(value));
  } else if (Object.prototype.toString.call(value) === "[object Date]") {
    console.log("reached 2");
    date = Object.prototype.toString.call(value);
  } else {
    console.log("reached 3");
    date = value;
  }
  useEffect(() => {
    if (
      typeof props.input.value === "string" &&
      props.input.value.length !== 0 &&
      !focused
    ) {
      console.log("reached 4");
      setFocused(true);
    }
  }, [props.input.value, focused]);
  const minDate = new Date();
  return (
    <div className={`${styles.dp} ${focused ? styles.focused : ""}`}>
      <label htmlFor={props.input.name}>{props.label}</label>
      <ReactDatePicker
        onChange={e => {
          props.input.onChange(e);
          console.log("changed");
        }}
        className={styles.DatePicker}
        selected={
          value
            ? date !== "[object Date]"
              ? value.toDate()
              : new Date(value)
            : null
        }
        minDate={minDate}
        popperClassName={styles.popper}
        popperPlacement="top"
        wrapperClassName={styles.wrapper}
        dateFormat="EEE do MMMM, yyyy"
        onChangeRaw={e => e.preventDefault()}
        onFocus={e => {
          props.input.onFocus(e);
          !focused && setFocused(true);
          console.log("reached 5");
        }}
        onBlur={e => {
          console.log("reached 6");
          props.input.onBlur(e);
          focused && setFocused(false);
        }}
      />
      {props.meta.error && props.meta.touched && (
        <div className={styles.error}>{props.meta.error}</div>
      )}
    </div>
  );
};

export default DateInput;
