import React, { useEffect, useRef, useState } from "react";
import { Field, reduxForm } from "redux-form";
import styles from "../../styles/listingEdit.module.css";
import Dropdown from "../Homepage/Header/Dropdown";
import Input from "../RegisterLogin/Input";
const Listing = () => {
  const [name, setName] = useState<string>("");
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
    <div className={styles.Listing}>
      <div>
        <div>
          <Field component={Input} label="List No" type="text" name="listNo" />
        </div>
        <div>
          <Field
            component={Input}
            label="Reference"
            type="text"
            name="reference"
          />
        </div>
        <div>
          <Dropdown
            selections={[
              "1+ Bedroom",
              "2+ Bedrooms",
              "3+ Bedrooms",
              "4+ Bedrooms",
              "5+ Bedrooms"
            ]}
            determinant="bedrooms"
            name={name}
            searchDiv={searchDiv}
            title="No of Bedrooms"
            setName={setName}
            className="d_search"
          />
        </div>
        <div>
          <Field
            component={Input}
            label="Location"
            type="text"
            name="location"
          />
        </div>
        <div>
          <Field
            component={Input}
            label="Street Address"
            type="text"
            name="address"
          />
        </div>
      </div>
    </div>
  );
};

export default reduxForm({ form: "Listing" })(Listing);
