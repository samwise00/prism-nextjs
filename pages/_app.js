import "../styles/globals.css";
import { MoralisProvider } from "react-moralis";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Head from "next/head";
import { NotificationProvider } from "web3uikit";

import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: process.env.THEGRAPH_URL,
});

export default function App({ Component, pageProps }) {
  return (
    <div className="bg-black overflow-hidden">
      <Head>
        <title>Prism NFTs</title>
        <meta name="description" content="NFT Marketplace"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MoralisProvider initializeOnMount={false}>
        <ApolloProvider client={client}>
          <NotificationProvider>
            <Navbar className="z-10" />
            <Component className="z-1" {...pageProps} />
            <Footer />
          </NotificationProvider>
        </ApolloProvider>
      </MoralisProvider>
    </div>
  );
}
