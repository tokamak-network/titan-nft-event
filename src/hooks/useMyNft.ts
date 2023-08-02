import { useMemo } from "react";
import { useGetNFT } from "./useSubgraph";
import { checkSaleRound } from "../utils/checkSaleRound";
import { Round_T } from "../utils/checkSaleRound";

export function useMyNft() {
  const { myNFTs } = useGetNFT();

  const myNftList: {
    [key in Round_T | "afterRound"]: any[];
  } = useMemo(() => {
    const firstRoundList = myNFTs?.nfts.filter(
      (nft: { tokenID: string; timeHistory: number[] }) => {
        const soldTime = nft.timeHistory[1];
        const saleRound = checkSaleRound(soldTime);
        return saleRound === "1st";
      }
    );

    const secondRoundList = myNFTs?.nfts.filter(
      (nft: { tokenID: string; timeHistory: number[] }) => {
        const soldTime = nft.timeHistory[1];
        const saleRound = checkSaleRound(soldTime);
        return saleRound === "2nd";
      }
    );

    const thirdRoundList = myNFTs?.nfts.filter(
      (nft: { tokenID: string; timeHistory: number[] }) => {
        const soldTime = nft.timeHistory[1];
        const saleRound = checkSaleRound(soldTime);
        return saleRound === "3rd";
      }
    );

    return {
      "1st": firstRoundList,
      "2nd": secondRoundList,
      "3rd": thirdRoundList,
      afterRound: [],
    };
  }, [myNFTs]);

  return { myNftList };
}
