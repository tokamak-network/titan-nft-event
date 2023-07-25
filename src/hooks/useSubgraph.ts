import { gql, useQuery } from "@apollo/client";
import { MINT_FIRST_EVENT_ADDRESS } from "../constants/contracts/addresses";
import { useAccount } from "wagmi";

const GET_MY_NFTS = gql`
  query nfts($address: String!) {
    nfts(where: {owner: $address}) {
      id
    }
  }
`;

const GET_NOT_MY_NFTS = gql`
  query nfts($address: String!) {
    nfts(where: {owner_not: $address}) {
      id
    }
  }
`;

export function useGetNFT() {
  const { data: onSaledNFTs } = useQuery(GET_MY_NFTS, {
    variables: {
      address: MINT_FIRST_EVENT_ADDRESS,
    },
  });

  const { data: notOnSaledNFTs } = useQuery(GET_NOT_MY_NFTS, {
    variables: {
      address: MINT_FIRST_EVENT_ADDRESS,
    },
  });

  const { address } = useAccount();

  const { data: myNFTs } = useQuery(GET_MY_NFTS, {
    variables: {
      address: address,
    },
  });

  return { onSaledNFTs, notOnSaledNFTs, myNFTs };
}
