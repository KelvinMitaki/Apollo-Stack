import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject
} from "@apollo/client";
import { useMemo } from "react";

let apolloClient: ApolloClient<NormalizedCacheObject>;

const createApolloClient = () =>
  new ApolloClient({
    ssrMode: typeof window === "undefined",
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri:
        process.env.NODE_ENV !== "production"
          ? "http://localhost:4000/graphql"
          : "https://apollo-stack-server.herokuapp.com/graphql",
      credentials: "include"
    }),
    connectToDevTools: process.env.NODE_ENV !== "production"
  });

export const initializeApollo = (
  initialState: NormalizedCacheObject | null = null
) => {
  const _apolloClient = apolloClient ?? createApolloClient();
  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }
  if (typeof window === "undefined") {
    return _apolloClient;
  }
  apolloClient = apolloClient ?? _apolloClient;
  return apolloClient;
};

export const useApollo = (initialState: NormalizedCacheObject) => {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
};
