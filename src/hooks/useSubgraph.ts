import { gql, useQuery } from "@apollo/client";
import { FIRST_EVENT_CONTRACT } from "../constants/contracts/addresses";
import { useAccount } from "wagmi";
import { useCallback } from "react";

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
      address: FIRST_EVENT_CONTRACT,
    },
  });

  const { data: notOnSaledNFTs } = useQuery(GET_NOT_MY_NFTS, {
    variables: {
      address: FIRST_EVENT_CONTRACT,
    },
  });

  const { address } = useAccount();

  const { data: myNFTs } = useQuery(GET_MY_NFTS, {
    variables: {
      address: address,
    },
  });

  const isSold = useCallback(
    (tokenId: number) => {
      if (notOnSaledNFTs?.nfts) {
        const isAlreadySold = notOnSaledNFTs.nfts.map(
          (e: { id: string }) => Number(e.id) === tokenId
        );
        return isAlreadySold.includes(true);
      }
    },
    [notOnSaledNFTs]
  );

  return { onSaledNFTs, notOnSaledNFTs, myNFTs, isSold };
}
