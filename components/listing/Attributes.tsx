import React, { useState } from "react";
import { Field, InjectedFormProps } from "redux-form";
import Input from "../RegisterLogin/Input";
import styles from "../../styles/listingEdit.module.css";
import { BiCheck } from "react-icons/bi";
import { HeaderType, PropertyFormValues } from "../../pages/listing/new";

interface Props extends InjectedFormProps<PropertyFormValues> {
  active: HeaderType;
  setGarden: React.Dispatch<React.SetStateAction<boolean>>;
  setFurnished: React.Dispatch<React.SetStateAction<boolean>>;
  setPet: React.Dispatch<React.SetStateAction<boolean>>;
  garden: boolean;
  furnished: boolean;
  pet: boolean;
}
export type AttributesAttrs =
  | "bedrooms"
  | "bathrooms"
  | "parkingLots"
  | "plinthArea"
  | "lotArea";

const Attributes: React.FC<Props> = props => {
  const { garden, setGarden, furnished, setFurnished, pet, setPet } = props;
  return (
    <div
      className={`${styles.Attributes} ${
        props.active === "attributes" ? styles.active_header : ""
      }`}
    >
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
        className={`${styles.inp} ${garden ? styles.clicked : ""}`}
        onClick={() => setGarden(cl => !cl)}
      >
        <div className={styles.BiCheck}>
          <BiCheck />
        </div>
        <p>garden</p>
      </div>
    </div>
  );
};
export default Attributes;
