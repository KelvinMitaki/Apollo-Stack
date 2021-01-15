import React from "react";
import Router from "next/router";
import Search from "../../components/properties/Search";
import Property from "../../components/properties/Properties";
import styles from "../../styles/properties.module.css";
import Layout from "../../components/Layout/Layout";
import { NextPage } from "next";
import { initializeApollo } from "../../apollo";
import { FILTER_PROPERTIES } from "../../graphql/queries/queries";
import { useQuery } from "@apollo/client";
import Loading from "../../components/loading/Loading";

const property: NextPage<{
  variables: { [key: string]: string | string[] | undefined };
}> = props => {
  const { data, fetchMore, loading } = useQuery(FILTER_PROPERTIES, {
    fetchPolicy: "cache-only",
    variables: props.variables,
    notifyOnNetworkStatusChange: true,
    onError(err) {
      console.log(err);
      console.log(err.graphQLErrors);
      console.log(err.message);
    }
  });
  return (
    <Layout title="Properties">
      <div className={styles.container}>
        {loading && <Loading />}
        <Search />
        <Property
          properties={data.filterProperties[0].properties}
          count={data.filterProperties[0].count}
          fetchMore={fetchMore}
        />
      </div>
    </Layout>
  );
};

property.getInitialProps = async ctx => {
  const apolloClient = initializeApollo();
  await apolloClient.query({
    query: FILTER_PROPERTIES,
    variables: { filter: ctx.query.property, offset: 0, limit: 10 },
    context: {
      headers: {
        cookie: ctx.req?.headers.cookie
      }
    }
  });
  return {
    initialApolloState: apolloClient.cache.extract(),
    variables: { filter: ctx.query.property }
  };
};

export default property;
