import { ApolloClient, InMemoryCache } from "@apollo/client";

const subgraphURL = {
  titan:
    "https://thegraph.titan.tokamak.network/subgraphs/name/tokamak/titan-nft-subgraph",
  titalGoerli:
    "https://thegraph.titan-goerli.tokamak.network:/subgraphs/name/tokamak/titan-nft-subgraph",
};

const client = new ApolloClient({
  uri:
    process.env.NEXT_PUBLIC_MODE === "PRODUCTION"
      ? subgraphURL.titan
      : subgraphURL.titalGoerli,
  cache: new InMemoryCache(),
});

export { client };
