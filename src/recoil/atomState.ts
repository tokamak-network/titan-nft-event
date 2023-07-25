import { atom } from "recoil";
import { ShippingAddress } from "./type";

export const nftCartList = atom<number[] | null>({
  key: "nftCartListState",
  default: null,
});

export const nftSelect = atom<number | null>({
  key: "nftSelectState",
  default: null,
});

export const shippingAddress = atom<ShippingAddress>({
  key: "shippingAddressState",
  default: {
    zipCode: undefined,
    baseAddress: undefined,
    defaultAddress: undefined,
    name: undefined,
    phoneNumber: undefined,
  },
});
