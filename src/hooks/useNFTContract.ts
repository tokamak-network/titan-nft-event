import { useAccount, useContractRead, useContractWrite } from "wagmi";
import FirstEvent from "../constants/abi/FirstEvent.json";
import ERC20 from "../constants/abi/ERC20.json";
import {
  FIRST_EVENT_CONTRACT,
  TON_ADDRESS,
} from "../constants/contracts/addresses";
import { useErc20Allowance, useErc20Approve } from "./generated";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRecoilValue } from "recoil";
import { nftCartList } from "../recoil/atomState";

export function useNFTContract() {
  const cartList = useRecoilValue(nftCartList);

  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: FIRST_EVENT_CONTRACT,
    abi: FirstEvent.abi,
    functionName: "multiPurchase",
    args: [cartList],
  });

  const { data: startTime } = useContractRead({
    address: FIRST_EVENT_CONTRACT,
    abi: FirstEvent.abi,
    functionName: "startTime",
  });

  const { address } = useAccount();

  const {
    data: allowance,
    error,
    isLoading: approveIsLoading,
  } = useErc20Allowance({
    address: TON_ADDRESS,
    args:
      address && FIRST_EVENT_CONTRACT
        ? [address, FIRST_EVENT_CONTRACT]
        : undefined,
    watch: true,
  });

  const amount = BigInt(50000000000000000000000);
  const { write: approve } = useErc20Approve({
    address: TON_ADDRESS,
    args:
      FIRST_EVENT_CONTRACT && amount
        ? [FIRST_EVENT_CONTRACT, amount]
        : undefined,
  });

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

  const [saleIsStart, setSaleIsStart] = useState<boolean>(false);

  useEffect(() => {
    const compareTimestamp = () => {
      if (startTime) {
        if (Number(startTime === 0)) {
          return setSaleIsStart(false);
        }
        const nowTimestamp = Math.floor(new Date().getTime() / 1000);

        return setSaleIsStart(nowTimestamp >= Number(startTime));
      }
      return setSaleIsStart(false);
    };

    const intervalId = setInterval(compareTimestamp, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [startTime]);

  const callToMint = useCallback(() => {
    write?.();
  }, [write]);

  const callToApprove = useCallback(() => {
    approve?.();
  }, [approve]);

  return {
    callToMint,
    isLoading,
    isApproved,
    callToApprove,
    approveIsLoading,
    saleIsStart,
  };
}
