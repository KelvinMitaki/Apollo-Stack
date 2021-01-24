import { useQuery } from "@apollo/client";
import { NextPage } from "next";
import React, { useEffect } from "react";
import { initializeApollo } from "../../apollo";
import Layout from "../../components/Layout/Layout";
import Contact from "../../components/propertyDetails/Contact";
import Details from "../../components/propertyDetails/Details";
import {
  FETCH_CURRENT_USER,
  FETCH_PROPERTY_DETAILS
} from "../../graphql/queries/queries";
import styles from "../../styles/propertyDetails.module.css";

export interface PropertyDetails {
  _id: string;
  price: number;
  type: string;
  createdAt: string;
  bathrooms: number;
  bedrooms: number;
  parkingLots?: number;
  lotArea?: number;
  plinthArea?: number;
  heading: string;
  description: string;
  status: string;
  location: string;
  streetAddress: string;
  reference: number;
  agent: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: number;
    _id: string;
  };
  category: string;
  images: string[];
  visitor?: string;
}
export const toTitleCase = (str: string) => {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};
const propertyDetails: NextPage<{
  variables: { _id: string | string[] | undefined };
}> = props => {
  const { data } = useQuery(FETCH_PROPERTY_DETAILS, {
    fetchPolicy: "cache-only",
    variables: props.variables
  });
  const user = useQuery(FETCH_CURRENT_USER, { fetchPolicy: "cache-only" });
  useEffect(() => {
    if (data.fetchPropertyDetails && data.fetchPropertyDetails.visitor) {
      document.cookie = `client_visitor=${
        data.fetchPropertyDetails.visitor
      }; Path=/; Expires=${new Date(
        Date.now() + 1000 * 60 * 60 * 24 * 365 * 5000
      )};`;
    }
  }, []);

  return (
    <Layout
      title={`${toTitleCase(
        data.fetchPropertyDetails.streetAddress
      )}, ${toTitleCase(data.fetchPropertyDetails.location)}`}
    >
      <div className={styles.container}>
        <Details {...data.fetchPropertyDetails} />
        <Contact
          {...data.fetchPropertyDetails}
          initialValues={
            user.data.currentUser
              ? {
                  ...user.data.currentUser,
                  ...(user.data.currentUser.phoneNumber && {
                    phoneNumber: user.data.currentUser.phoneNumber.toString()
                  }),
                  message: `Please contact me regarding web reference ${data.fetchPropertyDetails.reference}`,
                  fullName: `${user.data.currentUser.firstName} ${user.data.currentUser.lastName}`
                }
              : {
                  message: `Please contact me regarding web reference ${data.fetchPropertyDetails.reference}`
                }
          }
        />
      </div>
    </Layout>
  );
};

propertyDetails.getInitialProps = async ctx => {
  const apolloClient = initializeApollo();
  try {
    const res = await apolloClient.query({
      query: FETCH_PROPERTY_DETAILS,
      context: {
        headers: {
          cookie: ctx.req?.headers.cookie
        }
      },
      variables: { _id: ctx.query.id }
    });
    if (!res.data.fetchPropertyDetails && ctx.res) {
      ctx.res.writeHead(301, { Location: "/" });
      ctx.res.end();
    }
    return {
      initialApolloState: apolloClient.cache.extract(),
      variables: { _id: ctx.query.id }
    };
  } catch (error) {
    if (ctx.res) {
      ctx.res.writeHead(301, { Location: "/" });
      ctx.res.end();
    }
    return {
      variables: { _id: ctx.query.id }
    };
  }
};

export default propertyDetails;
