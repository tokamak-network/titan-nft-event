import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { getAddressData } from "../firebase/controller";
import { ShippingAddress } from "../recoil/type";

export function useShippingAddress() {
  const { address } = useAccount();
  const [addressData, setAddressData] = useState<ShippingAddress | undefined>(
    undefined
  );

  useEffect(() => {
    const fetchAddressData = async (account: string) => {
      const result = await getAddressData(account);
      if (typeof result === "object" && !(result instanceof Error))
        return setAddressData(result);
    };
    if (address) {
      fetchAddressData(address);
    }
  }, [address]);

  return { addressData };
}
