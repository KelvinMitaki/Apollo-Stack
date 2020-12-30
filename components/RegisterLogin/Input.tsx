import React from "react";
import { WrappedFieldProps } from "redux-form";

const Input: React.FC<WrappedFieldProps> = props => {
  return (
    <div>
      <input type="text" {...props.input} />
      {props.meta.error && <div>{props.meta.error}</div>}
    </div>
  );
};

export default Input;
