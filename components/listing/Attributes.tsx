import React, { useEffect, useRef, useState } from "react";
import { Field, InjectedFormProps } from "redux-form";
import Input from "../RegisterLogin/Input";
import styles from "../../styles/listingEdit.module.css";
import { BiCheck } from "react-icons/bi";
import { PropertyFormValues } from "../../pages/listing/new";

interface FormValues {
  bedrooms: string;
  bathrooms: string;
  parkingLots: string;
  plinthArea: string;
  lotArea: string;
}
interface Props extends InjectedFormProps<PropertyFormValues> {
  setInvalid: React.Dispatch<React.SetStateAction<boolean>>;
}
export type AttributesAttrs =
  | "bedrooms"
  | "bathrooms"
  | "parkingLots"
  | "plinthArea"
  | "lotArea";

const Attributes: React.FC<Props> = props => {
  const [clicked, setClicked] = useState<boolean>(false);
  const [furnished, setFurnished] = useState<boolean>(false);
  const [pet, setPet] = useState<boolean>(false);
  useEffect(() => {
    props.setInvalid(props.invalid || props.pristine);
  }, []);
  useEffect(() => {
    props.setInvalid(props.invalid || props.pristine);
  }, [props.invalid, props.pristine]);
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
export default Attributes;
