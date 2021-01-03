import React, { useEffect, useRef, useState } from "react";
import { Field, reduxForm } from "redux-form";
import Input from "../RegisterLogin/Input";
import styles from "../../styles/listingEdit.module.css";
import Dropdown from "../Homepage/Header/Dropdown";
import { BiCheck } from "react-icons/bi";

const Attributes = () => {
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
        <Field component={Input} label="Garages" type="text" name="garages" />
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
          label="Home Area"
          type="text"
          name="location"
          sup={2}
        />
      </div>
      <div>
        <Field
          component={Input}
          label="Lot Area"
          type="text"
          name="location"
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

export default reduxForm({ form: "Attributes" })(Attributes);
