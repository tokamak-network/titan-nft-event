import { useAccount, useContractRead, useContractWrite } from "wagmi";
import NFTProxy from "../constants/abi/NFTProxy.json";
import ERC20 from "../constants/abi/ERC20.json";
import {
  NFTProxy_ADDRESS,
  TON_ADDRESS,
} from "../constants/contracts/addresses";
import { useErc20Allowance, useErc20Approve } from "./generated";
import { useCallback, useMemo } from "react";
import { useRecoilValue } from "recoil";
import { nftCartList } from "../recoil/atomState";

export function useNFTContract() {
  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: NFTProxy_ADDRESS,
    abi: NFTProxy.abi,
    functionName: "multiMint",
  });
  const { address } = useAccount();

  const { data: allowance, error } = useErc20Allowance({
    address: TON_ADDRESS,
    args: address && NFTProxy_ADDRESS ? [address, NFTProxy_ADDRESS] : undefined,
    watch: true,
  });
  const amount = BigInt(50000000000000000000000);
  const { write: approve } = useErc20Approve({
    address: TON_ADDRESS,
    args: NFTProxy_ADDRESS && amount ? [NFTProxy_ADDRESS, amount] : undefined,
  });

  const cartList = useRecoilValue(nftCartList);

  const isApproved = useMemo(() => {
    if (allowance !== undefined && cartList) {
      const allowanceInEtherValue = Number(allowance) / 10 ** 18;
      const cartValue = cartList.length * 30;
      return allowanceInEtherValue >= cartValue;
    }
    if (allowance !== undefined) {
      return true;
    }
  }, [allowance, cartList]);

  const callToMint = useCallback(() => {
    write?.();
  }, [cartList, write]);

  const callToApprove = useCallback(() => {
    approve?.();
  }, [approve]);

  return { callToMint, isLoading, isApproved, callToApprove };
}
