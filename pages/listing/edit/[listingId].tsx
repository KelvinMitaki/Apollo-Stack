import { useMutation, useQuery } from "@apollo/client";
import { NextPage } from "next";
import Router from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { initialize, InjectedFormProps, reduxForm } from "redux-form";
import validator from "validator";
import { initializeApollo } from "../../../apollo";
import Layout from "../../../components/Layout/Layout";
import Attributes from "../../../components/listing/Attributes";
import Images from "../../../components/listing/Images";
import Listing from "../../../components/listing/Listing";
import Marketing from "../../../components/listing/Marketing";
import { FETCH_AGENT_PROPERTY } from "../../../graphql/queries/queries";
import { EDIT_PROPERTY } from "../../../graphql/mutations/mutations";
import withAgent from "../../../HOCs/withAgent";
import styles from "../../../styles/listingEdit.module.css";
import { genImages, PropertyFormValues } from "../new";
import { parse } from "date-fns";
import Loading from "../../../components/loading/Loading";

type HeaderType = "listing" | "attributes" | "marketing" | "images";
type Option = "sale" | "rent";

// @ts-ignore
const listingEdit: React.FC<InjectedFormProps<PropertyFormValues>> &
  NextPage = props => {
  const [disabled, setDisabled] = useState<boolean>(false);
  const [garden, setGarden] = useState<boolean>(false);
  const [furnished, setFurnished] = useState<boolean>(false);
  const [pet, setPet] = useState<boolean>(false);
  const [repossessed, setRepossessed] = useState<boolean>(false);
  const [auction, setAuction] = useState<boolean>(false);
  const [active, setActive] = useState<HeaderType>("listing");
  const [selection, setSelection] = useState<string>("");
  const [option, setOption] = useState<Option>("sale");
  const dispatch = useDispatch();
  const { data } = useQuery(FETCH_AGENT_PROPERTY, {
    fetchPolicy: "cache-only",
    variables: {
      propertyId: Router.query.listingId
    }
  });
  const [editProperty, { loading }] = useMutation(EDIT_PROPERTY, {
    onError(err) {
      console.log(err);
      console.log(err.graphQLErrors);
      console.log(err.message);
      console.log(err.name);
    },
    onCompleted(data) {
      Router.push("/listings");
    }
  });
  useEffect(() => {
    const transformedData = {} as { [key: string]: string | Date | boolean };
    for (const property in data.fetchAgentProperty) {
      if (
        !isNaN(data.fetchAgentProperty[property]) &&
        data.fetchAgentProperty[property] !== null &&
        typeof data.fetchAgentProperty[property] !== "boolean"
      ) {
        transformedData[property] = data.fetchAgentProperty[
          property
        ].toString();
      } else {
        if (property === "_id") {
          transformedData["listNo"] = data.fetchAgentProperty[property];
        } else {
          transformedData[property] = data.fetchAgentProperty[property];
        }
      }
    }
    dispatch(initialize("PropertyEdit", transformedData));
    setFurnished(transformedData.furnished as boolean);
    setGarden(transformedData.garden as boolean);
    setAuction(transformedData.auction as boolean);
    setPet(transformedData.pet as boolean);
    setRepossessed(transformedData.repossessed as boolean);
    setSelection(transformedData.category as string);
    () => {
      setDisabled(false);
    };
  }, []);
  return (
    <Layout title="Edit Listing">
      <div className={styles.container}>
        <div className={styles.body}>
          {loading && <Loading />}
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
                  _id: fv.listNo,
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
                // @ts-ignore
                delete formValues.listNo;
                setDisabled(true);
                editProperty({ variables: formValues });
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
                <button disabled={!props.valid || !selection || disabled}>
                  save
                </button>
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
              <Images active={active} images={data.fetchAgentProperty.images} />
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

listingEdit.getInitialProps = async ctx => {
  try {
    const apolloClient = initializeApollo();
    await apolloClient.query({
      query: FETCH_AGENT_PROPERTY,
      variables: { propertyId: ctx.query.listingId },
      context: {
        headers: {
          cookie: ctx.req?.headers.cookie
        }
      }
    });
    return {
      initialApolloState: apolloClient.cache.extract()
    };
  } catch (error) {
    console.log(error);
    if (ctx.res) {
      ctx.res.writeHead(301, { Location: "/" });
      ctx.res.end();
    }
  }
};

export default withAgent(
  reduxForm<PropertyFormValues>({
    form: "PropertyEdit",
    validate,
    destroyOnUnmount: false,
    enableReinitialize: false
  })(listingEdit)
);
