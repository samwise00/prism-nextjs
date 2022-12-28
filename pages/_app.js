import "../styles/globals.css";
import { MoralisProvider } from "react-moralis";
import Navbar from "../components/Navbar";
import Head from "next/head";
import { NotificationProvider } from "web3uikit";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";

import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "https://api.studio.thegraph.com/query/38206/prism/v0.0.3",
});

const activeChainId = ChainId.Goerli;

export default function App({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="NFT Marketplace"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThirdwebProvider desiredChainId={activeChainId}>
        <MoralisProvider initializeOnMount={false}>
          <ApolloProvider client={client}>
            <NotificationProvider>
              <Navbar className="z-10" />
              <Component className="z-1" {...pageProps} />
            </NotificationProvider>
          </ApolloProvider>
        </MoralisProvider>
      </ThirdwebProvider>
    </div>
  );
}
