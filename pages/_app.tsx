import { AppProps } from "next/app";
import "../styles/globals.css";
import "rc-slider/assets/index.css";
import { wrapper } from "../redux/reducers";
import nProgress from "nprogress";
import Router from "next/router";

(Router as any).onRouteChangeStart = () => nProgress.start();
(Router as any).onRouteChangeComplete = () => nProgress.done();
(Router as any).onRouteChangeError = () => nProgress.done();

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default wrapper.withRedux(MyApp);
