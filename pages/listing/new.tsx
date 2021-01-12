import { useMutation } from "@apollo/client";
import Router from "next/router";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { InjectedFormProps, reduxForm, reset } from "redux-form";
import validator from "validator";
import Layout from "../../components/Layout/Layout";
import Attributes from "../../components/listing/Attributes";
import Images from "../../components/listing/Images";
import Listing from "../../components/listing/Listing";
import Marketing from "../../components/listing/Marketing";
import { ADD_PROPERTY } from "../../graphql/mutations/mutations";
import withAgent from "../../HOCs/withAgent";
import styles from "../../styles/listingEdit.module.css";
import { parse } from "date-fns";

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
export const genImages = (): string[] => {
  let images: string[] = [];
  for (let i = 0; i < 6; i++) {
    const imgs = [
      "https://e-commerce-gig.s3.eu-west-2.amazonaws.com/5efd9987b53dfa39cc27bae9/image-1.jpeg",
      "https://e-commerce-gig.s3.eu-west-2.amazonaws.com/5efd9987b53dfa39cc27bae9/image-2.jpg",
      "https://e-commerce-gig.s3.eu-west-2.amazonaws.com/5efd9987b53dfa39cc27bae9/image-3.jpg"
    ];
    images.push(...imgs);
  }
  return images;
};
type Option = "sale" | "rent";
const listingId: React.FC<InjectedFormProps<PropertyFormValues>> = props => {
  const dispatch = useDispatch();
  const [garden, setGarden] = useState<boolean>(false);
  const [furnished, setFurnished] = useState<boolean>(false);
  const [pet, setPet] = useState<boolean>(false);
  const [repossessed, setRepossessed] = useState<boolean>(false);
  const [auction, setAuction] = useState<boolean>(false);
  const [active, setActive] = useState<HeaderType>("listing");
  const [selection, setSelection] = useState<string>("");
  const [option, setOption] = useState<Option>("sale");
  const [addProperty] = useMutation(ADD_PROPERTY, {
    onCompleted(data) {
      dispatch(reset("Property"));
      Router.push("/listings");
    },
    onError(err) {
      console.log(err.message);
      console.log(err.extraInfo);
      console.log(err.graphQLErrors);
      console.log(err.name);
    }
  });

  return (
    <Layout title="Edit Listing">
      <div className={styles.container}>
        <div className={styles.body}>
          <form
            onSubmit={props.handleSubmit(fv => {
              if (selection) {
                if (typeof fv.expiryDate === "object") {
                  // @ts-ignore
                  fv.expiryDate = new Date(fv.expiryDate).toString();
                }
                // @ts-ignore
                if (new Date(fv.expiryDate) == "Invalid Date") {
                  fv.expiryDate = new Date(
                    parse(fv.expiryDate, "EEE do MMMM, yyyy", new Date())
                  ).toString();
                }
                const formValues = {
                  ...fv,
                  bathrooms: parseInt(fv.bathrooms),
                  bedrooms: parseInt(fv.bedrooms),
                  price: parseInt(fv.price),
                  reference: parseInt(fv.reference),
                  ...(fv.serviceCharge && {
                    serviceCharge: parseInt(fv.serviceCharge)
                  }),
                  ...(fv.lotArea && { lotArea: parseInt(fv.lotArea) }),
                  ...(fv.parkingLots && {
                    parkingLots: parseInt(fv.parkingLots)
                  }),
                  ...(fv.plinthArea && { plinthArea: parseInt(fv.plinthArea) }),
                  category: selection,
                  type: option,
                  images: genImages(),
                  status: "active",
                  garden,
                  furnished,
                  pet,
                  repossessed,
                  auction
                };
                console.log(formValues);
                // addProperty({ variables: formValues });
              }
            })}
          >
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
                <button disabled={!props.valid || !selection} type="submit">
                  save
                </button>
              </div>
            </div>
            <div>
              <Listing
                {...props}
                active={active}
                selection={selection}
                setSelection={setSelection}
                option={option}
                setOption={setOption}
              />
              <Attributes
                {...props}
                active={active}
                garden={garden}
                setFurnished={setFurnished}
                furnished={furnished}
                setGarden={setGarden}
                setPet={setPet}
                pet={pet}
              />
              <Marketing
                {...props}
                active={active}
                setAuction={setAuction}
                setRepossessed={setRepossessed}
                auction={auction}
                repossessed={repossessed}
              />
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
    (formValues.bathrooms && !validator.isNumeric(formValues.bathrooms)) ||
    parseInt(formValues.bathrooms) > 2 ** 31
  ) {
    errors.bathrooms = "Enter a valid bathroom number";
  }
  if (
    !formValues.bedrooms ||
    (formValues.bedrooms && !validator.isNumeric(formValues.bedrooms)) ||
    parseInt(formValues.bedrooms) > 2 ** 31
  ) {
    errors.bedrooms = "Enter a valid bedroom number";
  }
  if (
    (formValues.parkingLots && !validator.isNumeric(formValues.parkingLots)) ||
    parseInt(formValues.parkingLots) > 2 ** 31
  ) {
    errors.bedrooms = "Enter a valid parking lot number";
  }
  if (
    (formValues.plinthArea && !validator.isNumeric(formValues.plinthArea)) ||
    parseInt(formValues.plinthArea) > 2 ** 31
  ) {
    errors.plinthArea = "Enter a valid plinth area number";
  }
  if (
    (formValues.lotArea && !validator.isNumeric(formValues.lotArea)) ||
    parseInt(formValues.lotArea) > 2 ** 31
  ) {
    errors.lotArea = "Enter a valid lot area number";
  }
  if (
    !formValues.reference ||
    (formValues.reference && !validator.isNumeric(formValues.reference)) ||
    parseInt(formValues.reference) > 2 ** 31
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
    (formValues.price && !validator.isNumeric(formValues.price)) ||
    parseInt(formValues.price) > 2 ** 31
  ) {
    errors.price = "Enter a valid price";
  }
  if (
    (formValues.serviceCharge &&
      !validator.isNumeric(formValues.serviceCharge)) ||
    parseInt(formValues.serviceCharge) > 2 ** 31
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
  if (!formValues.expiryDate) {
    errors.expiryDate = "Choose a valid date";
  }
  if (formValues.auctionVenue && formValues.auctionVenue.trim().length === 0) {
    errors.auctionVenue = "Enter a valid auction venue";
  }
  return errors;
};
export default withAgent(
  reduxForm<PropertyFormValues>({
    form: "Property",
    validate,
    destroyOnUnmount: false
  })(listingId)
);
