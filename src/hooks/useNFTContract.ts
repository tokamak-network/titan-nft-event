import { useAccount, useContractWrite } from "wagmi";
import NFTProxy from "../constants/abi/NFTProxy.json";
import {
  NFTProxy_ADDRESS,
  TON_ADDRESS,
} from "../constants/contracts/addresses";
import { useErc20Allowance } from "./generated";

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

  console.log("allowance");
  console.log(allowance);
  console.log(error);

  return { write, isLoading };
}
