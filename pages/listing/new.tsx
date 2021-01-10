import React, { useState } from "react";
import ReactDatePicker from "react-datepicker";
import { InjectedFormProps, reduxForm } from "redux-form";
import validator from "validator";
import Layout from "../../components/Layout/Layout";
import Attributes from "../../components/listing/Attributes";
import Images from "../../components/listing/Images";
import Listing from "../../components/listing/Listing";
import Marketing from "../../components/listing/Marketing";
import styles from "../../styles/listingEdit.module.css";

export type HeaderType = "listing" | "attributes" | "marketing" | "images";

export interface PropertyFormValues {
  bedrooms: string;
  bathrooms: string;
  parkingLots: string;
  plinthArea: string;
  lotArea: string;
  listNo: string;
  reference: string;
  location: string;
  streetAddress: string;
  status: string;
  price: string;
  serviceCharge: string;
  heading: string;
  description: string;
  expiryDate: string;
  auctionDate: string;
  auctionVenue: string;
}

const listingId: React.FC<InjectedFormProps<PropertyFormValues>> = props => {
  const [active, setActive] = useState<HeaderType>("listing");
  const [invalid, setInvalid] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  return (
    <Layout title="Edit Listing">
      <div className={styles.container}>
        <div>
          <ReactDatePicker
            selected={startDate}
            onChange={date => setStartDate(date as Date)}
          />
        </div>
        <div className={styles.body}>
          <form onSubmit={props.handleSubmit(fv => console.log(fv))}>
            <div className={styles.header}>
              <div
                onClick={() => setActive("listing")}
                className={active === "listing" ? styles.active : ""}
              >
                <p>listing</p>
              </div>
              <div
                onClick={() => setActive("attributes")}
                className={active === "attributes" ? styles.active : ""}
              >
                <p>attributes</p>
              </div>
              <div
                onClick={() => setActive("marketing")}
                className={active === "marketing" ? styles.active : ""}
              >
                <p>marketing</p>
              </div>
              <div
                onClick={() => setActive("images")}
                className={active === "images" ? styles.active : ""}
              >
                <p>images</p>
              </div>
              <div className={styles.no_content}></div>
              <div className={styles.btn}>
                <button disabled={!props.valid} type="submit">
                  save
                </button>
              </div>
            </div>
            <div>
              <Listing {...props} setInvalid={setInvalid} active={active} />
              <Attributes {...props} setInvalid={setInvalid} active={active} />
              <Marketing {...props} setInvalid={setInvalid} active={active} />
              <Images active={active} />
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};
const validate = (formValues: PropertyFormValues) => {
  const errors = {} as PropertyFormValues;
  if (
    !formValues.bathrooms ||
    (formValues.bathrooms && !validator.isNumeric(formValues.bathrooms))
  ) {
    errors.bathrooms = "Enter a valid bathroom number";
  }
  if (
    !formValues.bedrooms ||
    (formValues.bedrooms && !validator.isNumeric(formValues.bedrooms))
  ) {
    errors.bedrooms = "Enter a valid bedroom number";
  }
  if (formValues.parkingLots && !validator.isNumeric(formValues.parkingLots)) {
    errors.bedrooms = "Enter a valid parking lot number";
  }
  if (formValues.plinthArea && !validator.isNumeric(formValues.plinthArea)) {
    errors.plinthArea = "Enter a valid plinth area number";
  }
  if (formValues.lotArea && !validator.isNumeric(formValues.lotArea)) {
    errors.lotArea = "Enter a valid lot area number";
  }
  if (
    !formValues.reference ||
    (formValues.reference && !validator.isNumeric(formValues.reference))
  ) {
    errors.reference = "Enter a valid reference number";
  }
  if (
    !formValues.location ||
    (formValues.location && formValues.location.trim().length === 0)
  ) {
    errors.location = "Enter a valid location";
  }
  if (
    !formValues.streetAddress ||
    (formValues.streetAddress && formValues.streetAddress.trim().length === 0)
  ) {
    errors.streetAddress = "Enter a valid street address";
  }
  if (
    !formValues.price ||
    (formValues.price && !validator.isNumeric(formValues.price))
  ) {
    errors.price = "Enter a valid price";
  }
  if (
    formValues.serviceCharge &&
    !validator.isNumeric(formValues.serviceCharge)
  ) {
    errors.serviceCharge = "Enter a valid service charge";
  }
  if (
    !formValues.heading ||
    (formValues.heading && formValues.heading.trim().length < 5)
  ) {
    errors.heading = "Heading must be five characters minimum";
  }
  if (
    !formValues.description ||
    (formValues.description && formValues.description.trim().length < 20)
  ) {
    errors.description = "Description must be twenty characters minimum";
  }
  if (
    !formValues.expiryDate ||
    (formValues.expiryDate && !validator.isDate(formValues.expiryDate))
  ) {
    errors.expiryDate = "Choose a valid date";
  }
  if (formValues.auctionVenue && formValues.auctionVenue.trim().length === 0) {
    errors.auctionVenue = "Enter a valid auction venue";
  }
  return errors;
};
export default reduxForm<PropertyFormValues>({
  form: "Property",
  validate,
  destroyOnUnmount: false,
  initialValues: {
    listNo: "36876238768786",
    status: "EXPIRED"
  }
})(listingId);
