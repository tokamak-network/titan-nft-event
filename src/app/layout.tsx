"use client";

import { ApolloProvider } from "@apollo/client";
import { ChakraProvidersForNextJs } from "../provider/chakraProvider";
import { Providers } from "./providers";
import { client } from "../apollo/client";
import { RecoilRoot } from "recoil";

export const metadata = {
  title: "Titan-NFT",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
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
