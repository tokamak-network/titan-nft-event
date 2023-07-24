import { atom } from "recoil";

export const nftCartList = atom<number[] | null>({
  key: "nftCartListState", // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
});

export const nftSelect = atom<number | null>({
  key: "nftSelectState", // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
});
