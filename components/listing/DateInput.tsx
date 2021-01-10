import React from "react";
import ReactDatePicker from "react-datepicker";
import { WrappedFieldProps } from "redux-form";
import styles from "../../styles/listingEdit.module.css";

interface Props {
  label: string;
}

const DateInput: React.FC<WrappedFieldProps & Props> = props => {
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
    <div className={styles.customDatePickerWidth}>
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
        wrapperClassName={styles.wrapper}
        dateFormat="eeee d MMMM, yyyy"
        onChangeRaw={e => e.preventDefault()}
      />
    </div>
  );
};

export default DateInput;
