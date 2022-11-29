import "./styles-global.scss";
import { AppProps } from "next/app";
import Header from "../components/Header";
import { SessionProvider } from "next-auth/react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const initialOptions = {
  "client-id":
    "AUs3dVXsDKAmfsdAB51I8JNmxO8SeEHEz6BxWh23AMp5iK6YY8fHOxBNwOyRx8NKxBSYSDK3vF9VZUiv",
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
