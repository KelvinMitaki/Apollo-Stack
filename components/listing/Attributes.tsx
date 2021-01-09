import React, { useEffect, useRef, useState } from "react";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import Input from "../RegisterLogin/Input";
import styles from "../../styles/listingEdit.module.css";
import Dropdown from "../Homepage/Header/Dropdown";
import { BiCheck } from "react-icons/bi";
import validator from "validator";

interface FormValues {
  bedrooms: string;
  bathrooms: string;
  parkingLots: string;
  plinthArea: string;
  lotArea: string;
}
export type AttributesAttrs =
  | "bedrooms"
  | "bathrooms"
  | "parkingLots"
  | "plinthArea"
  | "lotArea";
const Attributes: React.FC<InjectedFormProps<FormValues>> = props => {
  const [clicked, setClicked] = useState<boolean>(false);
  const [furnished, setFurnished] = useState<boolean>(false);
  const [pet, setPet] = useState<boolean>(false);

  return (
    <div className={styles.Attributes}>
      <div>
        <Field
          component={Input}
          label="Bedrooms*"
          type="text"
          name="bedrooms"
        />
      </div>
      <div>
        <Field
          component={Input}
          label="Bathrooms*"
          type="text"
          name="bathrooms"
        />
      </div>
      <div>
        <Field
          component={Input}
          label="Parking Lots"
          type="text"
          name="parkingLots"
        />
      </div>
      <div>
        <Field
          component={Input}
          label="Plinth Area"
          type="text"
          name="plinthArea"
          sup={2}
        />
      </div>
      <div>
        <Field
          component={Input}
          label="Lot Area"
          type="text"
          name="lotArea"
          sup={2}
        />
      </div>

      <div
        className={`${styles.inp} ${furnished ? styles.clicked : ""}`}
        onClick={() => setFurnished(cl => !cl)}
      >
        <div className={styles.BiCheck}>
          <BiCheck />
        </div>
        <p>furnished</p>
      </div>

      <div
        className={`${styles.inp} ${pet ? styles.clicked : ""}`}
        onClick={() => setPet(cl => !cl)}
      >
        <div className={styles.BiCheck}>
          <BiCheck />
        </div>
        <p>pet friendly</p>
      </div>

      <div
        className={`${styles.inp} ${clicked ? styles.clicked : ""}`}
        onClick={() => setClicked(cl => !cl)}
      >
        <div className={styles.BiCheck}>
          <BiCheck />
        </div>
        <p>garden</p>
      </div>
    </div>
  );
};

const validate = (formvalues: FormValues) => {
  const errors = {} as FormValues;
  if (
    !formvalues.bathrooms ||
    (formvalues.bathrooms && !validator.isNumeric(formvalues.bathrooms))
  ) {
    errors.bathrooms = "Enter a valid bathroom number";
  }
  if (
    !formvalues.bedrooms ||
    (formvalues.bedrooms && !validator.isNumeric(formvalues.bedrooms))
  ) {
    errors.bedrooms = "Enter a valid bedroom number";
  }
  if (formvalues.parkingLots && !validator.isNumeric(formvalues.parkingLots)) {
    errors.bedrooms = "Enter a valid parking lot number";
  }
  if (formvalues.plinthArea && !validator.isNumeric(formvalues.plinthArea)) {
    errors.plinthArea = "Enter a valid plinth area number";
  }
  if (formvalues.lotArea && !validator.isNumeric(formvalues.lotArea)) {
    errors.lotArea = "Enter a valid lot area number";
  }
  return errors;
};

export default reduxForm<FormValues>({ form: "Attributes", validate })(
  Attributes
);
