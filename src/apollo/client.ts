import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://thegraph.titan-goerli.tokamak.network:/subgraphs/name/usgeeus/titan-nft-subgraph/graphql",
  cache: new InMemoryCache(),
});

export { client };
