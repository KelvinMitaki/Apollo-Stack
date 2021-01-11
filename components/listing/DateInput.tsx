import React, { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import { WrappedFieldProps } from "redux-form";
import styles from "../../styles/listingEdit.module.css";
import { parse } from "date-fns";

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
  useEffect(() => {
    if (
      typeof props.input.value === "string" &&
      props.input.value.length !== 0 &&
      !focused
    ) {
      setFocused(true);
    }
  }, [props.input.value, focused]);
  const minDate = new Date();
  let dateValue;
  if (value) {
    if (date !== "[object Date]") {
      dateValue = value.toDate();
    } else {
      const dt = new Date(value);
      // @ts-ignore
      if (dt != "Invalid Date") {
        dateValue = new Date(value);
      } else {
        dateValue = new Date(parse(value, "EEE do MMMM, yyyy", new Date()));
      }
    }
  }

  return (
    <div className={`${styles.dp} ${focused ? styles.focused : ""}`}>
      <label htmlFor={props.input.name}>{props.label}</label>
      <ReactDatePicker
        onChange={e => {
          props.input.onChange(e);
        }}
        className={styles.DatePicker}
        selected={dateValue || null}
        minDate={minDate}
        popperClassName={styles.popper}
        popperPlacement="top"
        wrapperClassName={styles.wrapper}
        dateFormat="EEE do MMMM, yyyy"
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
