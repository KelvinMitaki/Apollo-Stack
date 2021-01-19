import React, { useEffect, useRef, useState } from "react";
import Router from "next/router";
import Search from "../../components/properties/Search";
import Property from "../../components/properties/Properties";
import styles from "../../styles/properties.module.css";
import Layout from "../../components/Layout/Layout";
import { NextPage } from "next";
import { initializeApollo } from "../../apollo";
import {
  FETCH_PROPERTIES_COUNT,
  FILTER_PROPERTIES,
  SEARCH_PROPERTIES
} from "../../graphql/queries/queries";
import { useLazyQuery, useQuery } from "@apollo/client";
import Loading from "../../components/loading/Loading";
import { ActionTypes } from "../../redux/types/types";
import { useSelector } from "react-redux";
import { Redux } from "../../interfaces/Redux";

export interface FetchType {
  type: ActionTypes.fetchType;
  payload: "header" | "sidebar";
}

const property: NextPage<{
  variables: { [key: string]: string | string[] | undefined };
}> = props => {
  const fetchType = useSelector((state: Redux) => state.styling.fetchType);
  const [limit, setLimit] = useState<number>(10);
  const [skip, setSkip] = useState<number>(0);
  const scrollDiv = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (scrollDiv.current) {
      scrollDiv.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [limit, skip]);
  const { data, fetchMore, loading } = useQuery(FILTER_PROPERTIES, {
    fetchPolicy: "cache-only",
    variables: { ...props.variables, limit, offset: skip },
    notifyOnNetworkStatusChange: true,
    onError(err) {
      console.log(err);
      console.log(err.graphQLErrors);
      console.log(err.message);
    }
  });
  const countData = useQuery(FETCH_PROPERTIES_COUNT, {
    fetchPolicy: "cache-only",
    variables: { filter: props.variables.filter }
  });
  let [searchProperty, args1] = useLazyQuery(SEARCH_PROPERTIES, {
    onError(err) {
      console.log("SEARCH_PROPERTIES", err);
    }
  });
  let [fetchPropertiesCount, args] = useLazyQuery(FETCH_PROPERTIES_COUNT, {
    onError(err) {
      console.log("FETCH_PROPERTIES_COUNT", err);
    }
  });
  return (
    <Layout title="Properties">
      <div className={styles.container}>
        {loading && <Loading />}
        <Search
          loading={args1.loading}
          args={args}
          fetchPropertiesCount={fetchPropertiesCount}
          searchProperty={searchProperty}
        />
        <Property
          properties={
            args1.data && fetchType === "sidebar"
              ? args1.data.searchProperties
              : data.filterProperties
          }
          count={
            args.data && fetchType === "sidebar"
              ? args.data.filterPropertiesCount.count
              : countData.data.filterPropertiesCount.count
          }
          fetchMore={
            args1.fetchMore && fetchType === "sidebar"
              ? args1.fetchMore
              : fetchMore
          }
          setLimit={setLimit}
          setSkip={setSkip}
          scrollDiv={scrollDiv}
        />
      </div>
    </Layout>
  );
};

property.getInitialProps = async ctx => {
  console.log(ctx.query);
  const apolloClient = initializeApollo();
  await apolloClient.query({
    query: FILTER_PROPERTIES,
    variables: { filter: ctx.query.property, offset: 0, limit: 10 },
    context: {
      headers: {
        cookie: ctx.req?.headers.cookie
      }
    },
    fetchPolicy: "network-only"
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
