import { AppContext, AppProps } from "next/app";
import "rc-slider/assets/index.css";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import App from "next/app";
import { wrapper } from "../redux/reducers";
import nProgress from "nprogress";
import Router from "next/router";
import { initializeApollo, useApollo } from "../apollo";
import { FETCH_CURRENT_USER } from "../graphql/queries/queries";

(Router as any).onRouteChangeStart = () => nProgress.start();
(Router as any).onRouteChangeComplete = () => nProgress.done();
(Router as any).onRouteChangeError = () => nProgress.done();

function MyApp({ Component, pageProps }: AppProps) {
  const client = useApollo(pageProps.initialApolloState);
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />;
    </ApolloProvider>
  );
}
MyApp.getInitialProps = async (appCtx: AppContext) => {
  const apolloClient = initializeApollo();
  const appProps = await App.getInitialProps(appCtx);
  await apolloClient.query({
    query: FETCH_CURRENT_USER,
    context: {
      headers: {
        cookie: appCtx.ctx.req?.headers.cookie
      }
    },
    fetchPolicy: "network-only"
  });

  // console.log(JSON.stringify(appProps.pageProps.initialApolloState, null, 2));

  // console.log(JSON.stringify(apolloClient.cache.extract().ROOT_QUERY, null, 2));
  return {
    ...appProps,
    pageProps: {
      ...appProps.pageProps,
      initialApolloState: {
        ...(appProps.pageProps.initialApolloState &&
          appProps.pageProps.initialApolloState),
        ...apolloClient.cache.extract(),
        ROOT_QUERY: {
          ...apolloClient.cache.extract().ROOT_QUERY,
          ...(appProps.pageProps.initialApolloState &&
            appProps.pageProps.initialApolloState.ROOT_QUERY)
        }
      }
    }
  };
};
export default wrapper.withRedux(MyApp);
