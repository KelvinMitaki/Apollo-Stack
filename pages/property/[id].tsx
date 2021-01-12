import { useQuery } from "@apollo/client";
import { NextPage } from "next";
import React from "react";
import { initializeApollo } from "../../apollo";
import Layout from "../../components/Layout/Layout";
import Contact from "../../components/propertyDetails/Contact";
import Details from "../../components/propertyDetails/Details";
import { FETCH_PROPERTY_DETAILS } from "../../graphql/queries/queries";
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
  agent: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: number;
  };
  category: string;
  images: string[];
}

const propertyDetails: NextPage<{
  variables: { _id: string | string[] | undefined };
}> = props => {
  const { data } = useQuery(FETCH_PROPERTY_DETAILS, {
    fetchPolicy: "cache-only",
    variables: props.variables
  });

  return (
    <Layout title="Property Details">
      <div className={styles.container}>
        <Details {...data.fetchPropertyDetails} />
        <Contact {...data.fetchPropertyDetails} />
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
