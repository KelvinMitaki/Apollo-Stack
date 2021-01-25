import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject
} from "@apollo/client";
import { Agent } from "https";
import { useMemo } from "react";

let apolloClient: ApolloClient<NormalizedCacheObject>;

const createApolloClient = () =>
  new ApolloClient({
    ssrMode: typeof window === "undefined",
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            filterProperties: {
              merge(
                existing,
                incoming,
                {
                  args: {
                    // @ts-ignore
                    offset = 0,
                    ...props
                  }
                }
              ) {
                if (
                  props.values &&
                  typeof props.values === "object" &&
                  !Object.values(props.values).find(val => !undefined)
                ) {
                  const merged = existing ? existing.slice(0) : [];
                  for (let i = 0; i < incoming.length; ++i) {
                    merged[offset + i] = incoming[i];
                  }
                  return merged;
                }
                return incoming;
              },
              read(
                existing: any[],
                {
                  args: {
                    // @ts-ignore
                    offset = 0,
                    // @ts-ignore
                    limit = existing?.length
                  } = {},
                  ...options
                }
              ) {
                return existing && existing.slice(offset, offset + limit);
              }
            },
            fetchAgentProperties: {
              merge(
                existing,
                incoming,
                {
                  args: {
                    // @ts-ignore
                    offset = 0,
                    ...props
                  }
                }
              ) {
                if (
                  props.values &&
                  typeof props.values === "object" &&
                  !Object.values(props.values).find(val => !undefined)
                ) {
                  const merged = existing ? existing.slice(0) : [];
                  for (let i = 0; i < incoming.length; ++i) {
                    merged[offset + i] = incoming[i];
                  }
                  return merged;
                }
                return incoming;
              },
              read(
                existing: any[],
                {
                  args: {
                    // @ts-ignore
                    offset = 0,
                    // @ts-ignore
                    limit = existing?.length
                  } = {}
                }
              ) {
                return existing && existing.slice(offset, offset + limit);
              }
            },
            fetchExpiredListings: {
              merge(
                existing,
                incoming,
                {
                  args: {
                    // @ts-ignore
                    offset = 0,
                    ...props
                  }
                }
              ) {
                if (
                  props.values &&
                  typeof props.values === "object" &&
                  !Object.values(props.values).find(val => !undefined)
                ) {
                  const merged = existing ? existing.slice(0) : [];
                  for (let i = 0; i < incoming.length; ++i) {
                    merged[offset + i] = incoming[i];
                  }
                  return merged;
                }
                return incoming;
              },
              read(
                existing: any[],
                {
                  args: {
                    // @ts-ignore
                    offset = 0,
                    // @ts-ignore
                    limit = existing?.length
                  } = {}
                }
              ) {
                return existing && existing.slice(offset, offset + limit);
              }
            },
            propertyStatisticsMessages: {
              merge(
                existing,
                incoming,
                {
                  args: {
                    // @ts-ignore
                    offset = 0
                  }
                }
              ) {
                const merged = existing ? existing.slice(0) : [];
                for (let i = 0; i < incoming.length; ++i) {
                  merged[offset + i] = incoming[i];
                }
                return merged;
              },
              read(
                existing: any[],
                {
                  args: {
                    // @ts-ignore
                    offset = 0,
                    // @ts-ignore
                    limit = existing?.length
                  } = {}
                }
              ) {
                return existing && existing.slice(offset, offset + limit);
              }
            }
          }
        }
      }
    }),
    link: new HttpLink({
      uri:
        process.env.NODE_ENV !== "production"
          ? "http://localhost:4000/graphql"
          : "https://apollo-stack-server.herokuapp.com/graphql",
      credentials: "include",
      ...(process.env.NODE_ENV === "production" && {
        fetchOptions: {
          agent: new Agent({ rejectUnauthorized: false })
        }
      })
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
