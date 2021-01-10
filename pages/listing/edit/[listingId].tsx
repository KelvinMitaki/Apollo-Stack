import React, { useState } from "react";
import { InjectedFormProps, reduxForm } from "redux-form";
import validator from "validator";
import Layout from "../../../components/Layout/Layout";
import Attributes from "../../../components/listing/Attributes";
import Images from "../../../components/listing/Images";
import Listing from "../../../components/listing/Listing";
import Marketing from "../../../components/listing/Marketing";
import withAgent from "../../../HOCs/withAgent";
import styles from "../../../styles/listingEdit.module.css";
import { PropertyFormValues } from "../new";

type HeaderType = "listing" | "attributes" | "marketing" | "images";
type Option = "sale" | "rent";

const listingEdit: React.FC<InjectedFormProps<PropertyFormValues>> = props => {
  const [active, setActive] = useState<HeaderType>("listing");
  const [selection, setSelection] = useState<string>("");
  const [option, setOption] = useState<Option>("sale");
  return (
    <Layout title="Edit Listing">
      <div className={styles.container}>
        <div className={styles.body}>
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
              <button>save</button>
            </div>
          </div>
          <div className={styles.opts}>
            <Listing
              {...props}
              active={active}
              selection={selection}
              setSelection={setSelection}
              option={option}
              setOption={setOption}
            />
            <Attributes {...props} active={active} />
            <Marketing {...props} active={active} />
            <Images active={active} />
          </div>
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
export default withAgent(
  reduxForm<PropertyFormValues>({
    form: "PropertyEdit",
    initialValues: {
      listNo: "36876238768786",
      status: "EXPIRED"
    },
    validate,
    destroyOnUnmount: false
  })(listingEdit)
);
