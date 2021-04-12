import NextNprogress from "nextjs-progressbar";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../apollo/client";
import { CartState } from "../context/cart";
import { AuthState } from "../context/auth";
import "../styles/index.scss";

export default function App({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <AuthState>
        <CartState>
          <NextNprogress
            color="#000"
            startPosition={0.3}
            stopDelayMs={200}
            height="2"
          />
          <Component {...pageProps} />
        </CartState>
      </AuthState>
    </ApolloProvider>
  );
}
