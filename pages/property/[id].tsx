import { useQuery } from "@apollo/client";
import { NextPage } from "next";
import React from "react";
import { initializeApollo } from "../../apollo";
import Layout from "../../components/Layout/Layout";
import Contact from "../../components/propertyDetails/Contact";
import Details from "../../components/propertyDetails/Details";
import { FETCH_PROPERTY_DETAILS } from "../../graphql/queries/queries";
import styles from "../../styles/propertyDetails.module.css";

const propertyDetails: NextPage<{
  variables: { _id: string | string[] | undefined };
}> = props => {
  const { data } = useQuery(FETCH_PROPERTY_DETAILS, {
    fetchPolicy: "cache-only",
    variables: props.variables
  });
  // console.log(data);
  return (
    <Layout title="Property Details">
      <div className={styles.container}>
        <Details />
        <Contact />
      </div>
    </Layout>
  );
};

propertyDetails.getInitialProps = async ctx => {
  const apolloClient = initializeApollo();
  try {
    const data = await apolloClient.query({
      query: FETCH_PROPERTY_DETAILS,
      context: {
        headers: {
          cookie: ctx.req?.headers.cookie
        }
      },
      variables: { _id: ctx.query.id }
    });
    if (!data.data.fetchPropertyDetails && ctx.res) {
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
