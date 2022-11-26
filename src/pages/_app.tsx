import { AppProps } from "next/app";
import Header from "../components/Header";
import "./styles-global.scss";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Header />
      <Component {...pageProps} />
    </div>
  );
}
