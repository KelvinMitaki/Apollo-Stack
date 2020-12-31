import { AppProps } from "next/app";
import "../styles/globals.css";
import "rc-slider/assets/index.css";
import moduleName, { ApolloProvider } from "@apollo/client";
import { wrapper } from "../redux/reducers";
import nProgress from "nprogress";
import Router from "next/router";
import { useApollo } from "../apollo";

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

export default wrapper.withRedux(MyApp);
