import { atom } from "recoil";
import { ShippingAddress } from "./type";

export const nftCartList = atom<number[] | null>({
  key: "nftCartListState",
  default: null,
});

export const nftSelect = atom<number>({
  key: "nftSelectState",
  default: 1,
});

export const shippingAddress = atom<ShippingAddress>({
  key: "shippingAddressState",
  default: {
    zipCode: undefined,
    baseAddress: undefined,
    defaultAddress: undefined,
    name: undefined,
    email: undefined,
    phoneNumber: undefined,
  },
});

export const openPostCode = atom<boolean>({
  key: "openPostCodeState",
  default: false,
});
