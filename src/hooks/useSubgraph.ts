import { gql, useQuery } from "@apollo/client";
import { FIRST_EVENT_CONTRACT } from "../constants/contracts/addresses";
import { useAccount } from "wagmi";
import { useCallback } from "react";

const GET_MY_NFTS = gql`
  query Nfts($address: String!) {
    nfts(where: {owner: $address}) {
      tokenID
      timeHistory
    }
  }
`;

const GET_NOT_MY_NFTS = gql`
  query Nfts($address: String!) {
    nfts(where: {owner_not: $address}) {
      tokenID
      timeHistory
    }
  }
`;

export function useGetNFT() {
  const { data: onSaledNFTs } = useQuery(GET_MY_NFTS, {
    variables: {
      address: FIRST_EVENT_CONTRACT,
    },
    pollInterval: 5000,
  });

  const { data: notOnSaledNFTs, error } = useQuery(GET_NOT_MY_NFTS, {
    variables: {
      address: FIRST_EVENT_CONTRACT,
    },
    pollInterval: 5000,
  });

  const { address } = useAccount();

  const { data: myNFTs } = useQuery(GET_MY_NFTS, {
    variables: {
      address,
    },
    pollInterval: 5000,
  });

  const isSold = useCallback(
    (paramTokenID: number) => {
      if (notOnSaledNFTs?.nfts) {
        const isAlreadySold = notOnSaledNFTs.nfts.map(
          (e: { tokenID: string }) => Number(e.tokenID) === paramTokenID
        );
        return isAlreadySold.includes(true);
      }
    },
    [notOnSaledNFTs]
  );

  return { onSaledNFTs, notOnSaledNFTs, myNFTs, isSold };
}
