import { AppProps } from "next/app";
import "../styles/globals.css";
import "rc-slider/assets/index.css";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
