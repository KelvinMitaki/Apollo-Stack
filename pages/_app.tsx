import { AppContext, AppProps } from "next/app";
import "../styles/globals.css";
import "rc-slider/assets/index.css";
import {
  ApolloProvider,
  useQuery,
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  HttpLink
} from "@apollo/client";
import App from "next/app";
import { wrapper } from "../redux/reducers";
import nProgress from "nprogress";
import Router from "next/router";
import { initializeApollo, useApollo } from "../apollo";
import { FETCH_CURRENT_USER } from "../graphql/queries/queries";
import withApollo, {
  ApolloAppContext,
  ApolloContext,
  ApolloPageContext
} from "next-with-apollo";
import { Agent } from "https";

(Router as any).onRouteChangeStart = () => nProgress.start();
(Router as any).onRouteChangeComplete = () => nProgress.done();
(Router as any).onRouteChangeError = () => nProgress.done();

interface Props {
  apollo: ApolloClient<NormalizedCacheObject>;
}

function MyApp({ Component, pageProps, apollo }: AppProps & Props) {
  return (
    <ApolloProvider client={apollo}>
      <Component {...pageProps} />;
    </ApolloProvider>
  );
}
MyApp.getInitialProps = async (appCtx: ApolloAppContext) => {
  const apolloClient = appCtx.ctx.apolloClient;
  const appProps = await App.getInitialProps(appCtx);
  await apolloClient.query({
    query: FETCH_CURRENT_USER,
    context: {
      headers: {
        cookie: appCtx.ctx.req?.headers.cookie
      }
    }
  });
  return {
    ...appProps
  };
};
export default withApollo(({ initialState, headers }) => {
  console.log(headers);
  return new ApolloClient({
    cache: new InMemoryCache().restore(initialState || {}),
    credentials: "include",
    headers: headers as Record<string, string>,
    connectToDevTools: process.env.NODE_ENV !== "production",
    link: new HttpLink({
      uri:
        process.env.NODE_ENV !== "production"
          ? "https://apollo-stack-server.herokuapp.com/graphql"
          : "https://apollo-stack-server.herokuapp.com/graphql",
      credentials: "include",
      ...(process.env.NODE_ENV === "production" && {
        fetchOptions: {
          agent: new Agent({ rejectUnauthorized: false })
        }
      }),
      fetchOptions: {
        agent: new Agent({ rejectUnauthorized: false })
      }
    })
  });
})(wrapper.withRedux(MyApp));
