import { AppContext, AppProps } from "next/app";
import "../styles/globals.css";
import "rc-slider/assets/index.css";
import { ApolloProvider, useQuery } from "@apollo/client";
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
  const { data } = useQuery(FETCH_CURRENT_USER, { client });
  console.log(data);
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} {...data} />;
    </ApolloProvider>
  );
}
MyApp.getInitialProps = async (appCtx: AppContext) => {
  const apolloClient = initializeApollo();
  const appProps = await App.getInitialProps(appCtx);
  await apolloClient.query({
    query: FETCH_CURRENT_USER,
    context: {
      headers: appCtx.ctx.req?.headers
    }
  });
  return {
    ...appProps,
    pageProps: {
      ...appProps.pageProps,
      initialApolloState: apolloClient.cache.extract()
    }
  };
};
export default wrapper.withRedux(MyApp);
