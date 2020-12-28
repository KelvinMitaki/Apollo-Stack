import { AppProps } from "next/app";
import "../styles/globals.css";
import "rc-slider/assets/index.css";
import { wrapper } from "../redux/reducers";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default wrapper.withRedux(MyApp);
