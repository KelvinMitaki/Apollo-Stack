import React, { useEffect, useRef, useState } from "react";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import Dropdown from "../Homepage/Header/Dropdown";
import Input from "../RegisterLogin/Input";
import styles from "../../styles/listingEdit.module.css";
import { BiCheck } from "react-icons/bi";
import TextArea from "../RegisterLogin/TextArea";
import Router from "next/router";
import validator from "validator";

interface FormValues {
  status: string;
  price: string;
  serviceCharge: string;
  heading: string;
  description: string;
  expiryDate: string;
  auctionDate: string;
  auctionVenue: string;
}

const Marketing: React.FC<InjectedFormProps<FormValues>> = () => {
  const [repossessed, setRepossessed] = useState<boolean>(false);
  const [auction, setAuction] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const searchDiv = useRef<HTMLDivElement>(null);
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    if (Router.pathname.includes("edit")) {
      setEdit(true);
    } else {
      setEdit(false);
    }
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
    <div className={styles.Marketing}>
      {edit && (
        <div>
          <Field
            component={Input}
            label="Status"
            type="text"
            name="status"
            disabled
          />
        </div>
      )}
      <div>
        <Field
          component={Input}
          label="Price in Ksh"
          type="text"
          name="price"
        />
      </div>
      <div>
        <Field
          component={Input}
          label="Service Charge in Ksh"
          type="text"
          name="serviceCharge"
        />
      </div>
      <div>
        <Field
          component={Input}
          label="Marketing Heading"
          type="text"
          name="heading"
        />
      </div>{" "}
      <div>
        <Field
          component={TextArea}
          label="Marketing Description"
          name="description"
        />
      </div>
      <div>
        <Field
          component={Input}
          label="Expiry Date"
          type="text"
          name="expiryDate"
        />
      </div>
      <div
        className={`${styles.inp} ${repossessed ? styles.clicked : ""}`}
        onClick={() => setRepossessed(rep => !rep)}
      >
        <div className={styles.BiCheck}>
          <BiCheck />
        </div>
        <p>repossessed</p>
      </div>
      <div
        className={`${styles.inp} ${auction ? styles.clicked : ""}`}
        onClick={() => setAuction(au => !au)}
      >
        <div className={styles.BiCheck}>
          <BiCheck />
        </div>
        <p>on auction</p>
      </div>
      <div>
        <Field
          component={Input}
          label="Auction Date"
          type="text"
          name="auctionDate"
        />
      </div>
      <div>
        <Field
          component={Input}
          label="Auction Venue"
          type="text"
          name="auctionVenue"
        />
      </div>
    </div>
  );
};

const validate = (formvalues: FormValues) => {
  const errors = {} as FormValues;
  if (
    !formvalues.price ||
    (formvalues.price && !validator.isNumeric(formvalues.price))
  ) {
    errors.price = "Enter a valid price";
  }
  if (
    formvalues.serviceCharge &&
    !validator.isNumeric(formvalues.serviceCharge)
  ) {
    errors.serviceCharge = "Enter a valid service charge";
  }
  if (
    !formvalues.heading ||
    (formvalues.heading && formvalues.heading.trim().length < 5)
  ) {
    errors.heading = "Heading must be five characters minimum";
  }
  if (
    !formvalues.description ||
    (formvalues.description && formvalues.description.trim().length < 20)
  ) {
    errors.description = "Description must be twenty characters minimum";
  }
  if (formvalues.auctionVenue && formvalues.auctionVenue.trim().length === 0) {
    errors.auctionVenue = "Enter a valid auction venue";
  }
  return errors;
};

export default reduxForm<FormValues>({
  form: "Marketing",
  initialValues: {
    status: "EXPIRED"
  },
  validate
})(Marketing);
