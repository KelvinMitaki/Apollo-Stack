import React, { useState } from "react";
import Router from "next/router";
import Search from "../../components/properties/Search";
import Property from "../../components/properties/Properties";
import styles from "../../styles/properties.module.css";
import Layout from "../../components/Layout/Layout";
import { NextPage } from "next";
import { initializeApollo } from "../../apollo";
import {
  FETCH_PROPERTIES_COUNT,
  FILTER_PROPERTIES
} from "../../graphql/queries/queries";
import { useQuery } from "@apollo/client";
import Loading from "../../components/loading/Loading";

const property: NextPage<{
  variables: { [key: string]: string | string[] | undefined };
}> = props => {
  const [limit, setLimit] = useState<number>(10);
  const [skip, setSkip] = useState<number>(0);
  const { data, fetchMore, loading } = useQuery(FILTER_PROPERTIES, {
    fetchPolicy: "cache-only",
    variables: { ...props.variables, limit, skip },
    notifyOnNetworkStatusChange: true,
    onError(err) {
      console.log(err);
      console.log(err.graphQLErrors);
      console.log(err.message);
    }
  });
  const count = useQuery(FETCH_PROPERTIES_COUNT, {
    fetchPolicy: "cache-only",
    variables: { filter: props.variables.filter }
  });
  console.log({ skip });
  console.log(data);
  return (
    <Layout title="Properties">
      <div className={styles.container}>
        {loading && <Loading />}
        <Search />
        <Property
          properties={data.filterProperties}
          count={count.data.filterPropertiesCount.count}
          fetchMore={fetchMore}
          setLimit={setLimit}
          setSkip={setSkip}
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
  await apolloClient.query({
    query: FETCH_PROPERTIES_COUNT,
    variables: { filter: ctx.query.property },
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
