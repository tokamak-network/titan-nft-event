import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://thegraph.titan-goerli.tokamak.network:/subgraphs/name/tokamak/titan-nft-subgraph",
  cache: new InMemoryCache(),
});

export { client };
