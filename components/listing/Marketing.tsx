import React, { useEffect, useRef, useState } from "react";
import { Field, InjectedFormProps } from "redux-form";
import Input from "../RegisterLogin/Input";
import styles from "../../styles/listingEdit.module.css";
import { BiCheck } from "react-icons/bi";
import TextArea from "../RegisterLogin/TextArea";
import Router from "next/router";
import { HeaderType, PropertyFormValues } from "../../pages/listing/new";
import DateInput from "./DateInput";

interface Props extends InjectedFormProps<PropertyFormValues> {
  active: HeaderType;
  setRepossessed: React.Dispatch<React.SetStateAction<boolean>>;
  setAuction: React.Dispatch<React.SetStateAction<boolean>>;
  repossessed: boolean;
  auction: boolean;
}

const Marketing: React.FC<Props> = props => {
  const { repossessed, auction, setAuction, setRepossessed } = props;
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
    <div
      className={`${styles.Marketing} ${
        props.active === "marketing" ? styles.active_header : ""
      }`}
    >
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
      <Field component={DateInput} name="expiryDate" label="Expiry Date" />
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
        <Field component={DateInput} label="Auction Date" name="auctionDate" />
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

export default Marketing;
