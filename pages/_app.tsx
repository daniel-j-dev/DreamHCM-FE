import "../styles/normalize.css";
import "../styles/globals.css";
import "../styles/calendar.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
