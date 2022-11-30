import "./styles-global.scss";
import { AppProps } from "next/app";
import Header from "../components/Header";
import { SessionProvider } from "next-auth/react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const initialOptions = {
  "client-id":
    "AR9QraFbPSWadRAT1GTi2UJYpbubsYmxME6ne4RUhUpAinWBdhJ4V5aU5Fgd5pW7P-Jv7EU3Mqospjxs",
  currency: "BRL",
  intent: "capture",
};

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <PayPalScriptProvider options={initialOptions}>
        <Header />
        <Component {...pageProps} />
      </PayPalScriptProvider>
    </SessionProvider>
  );
}
