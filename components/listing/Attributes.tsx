import React, { useEffect, useRef, useState } from "react";
import { Field, reduxForm } from "redux-form";
import Input from "../RegisterLogin/Input";
import styles from "../../styles/listingEdit.module.css";
import Dropdown from "../Homepage/Header/Dropdown";
import { BiCheck } from "react-icons/bi";

const Attributes = () => {
  const [name, setName] = useState<string>("");
  const [clicked, setClicked] = useState<boolean>(false);
  const searchDiv = useRef<HTMLDivElement>(null);
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleClickOutside = (e: Event) => {
    // @ts-ignore
    if (searchDiv.current && !searchDiv.current.contains(e.target)) {
      setName("");
    }
  };
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
          label="Home Area(in m)"
          type="text"
          name="location"
          sup={2}
        />
      </div>
      <div>
        <Field
          component={Input}
          label="Lot Area(in m)"
          type="text"
          name="location"
          sup={2}
        />
      </div>{" "}
      <div style={{ cursor: "pointer" }}>
        <Dropdown
          selections={["yes ", "no"]}
          determinant="petFriendly"
          name={name}
          searchDiv={searchDiv}
          title="Pet Friendly"
          setName={setName}
          className="d_search"
        />
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
