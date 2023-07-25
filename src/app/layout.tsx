"use client";

import { ApolloProvider } from "@apollo/client";
import { ChakraProvidersForNextJs } from "../provider/chakraProvider";
import { Providers } from "./providers";
import { client } from "../apollo/client";
import { RecoilRoot } from "recoil";
import Head from "next/head";

const HeadMeta = () => {
  return (
    <div>
      <Head>
        <title>Titan NFT Event</title>
        <meta property="og:type" content="website" />
        {/* <meta property="og:url" content="https://bridge.tokamak.network" /> */}
        <meta property="title" content="Titan NFT Event" />
        <meta property="og:title" content="Titan NFT Event" />
        {/* <meta
        property="description"
        content="Functional upgrade to TONStarter ecosystem"
      />
      <meta
        property="og:description"
        content="Functional upgrade to TONStarter ecosystem"
      /> */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  );
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <HeadMeta />
        <RecoilRoot>
          <ApolloProvider client={client}>
            <ChakraProvidersForNextJs>
              <Providers>{children}</Providers>
            </ChakraProvidersForNextJs>
          </ApolloProvider>
        </RecoilRoot>
      </body>
    </html>
  );
}
