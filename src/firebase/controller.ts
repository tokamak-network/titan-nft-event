import {
  getDatabase,
  ref,
  get,
  push,
  update,
  child,
  remove,
} from "firebase/database";
import { database } from "./index";
import { ShippingAddress } from "../recoil/type";
import { Round_T } from "../utils/checkSaleRound";

export async function createNewShippingAddress(params: {
  userAccountAddress: string;
  addressData: {};
  saleRound: Round_T | "afterRound";
  nfts: any[];
}) {
  try {
    const { userAccountAddress, addressData, saleRound, nfts } = params;
    const addressDirectory = `address/${userAccountAddress}`;
    const nftDirectory = `nfts/${saleRound}/${userAccountAddress}`;
    const result = await update(ref(database, addressDirectory), {
      ...addressData,
    });
    const result2 = await update(ref(database, nftDirectory), {
      nfts,
    });
    //@ts-ignore
    const hashKey = result._path.pieces_[2];
    //@ts-ignore
    const hashKey2 = result2._path.pieces_[2];
    return { hashKey: hashKey as string, hashKey2: hashKey2 as string };
  } catch (e) {
    console.log(e);
    return new Error("failed to save shipping address data");
  }
}

export async function getAddressData(
  userAccountAddress: string
): Promise<ShippingAddress | undefined | Error> {
  try {
    const directory = `address/${userAccountAddress}`;
    const result = await get(child(ref(getDatabase()), directory)).then(
      (snapshot) => {
        if (snapshot) {
          return snapshot.val();
        }
        return undefined;
      }
    );
    return result as ShippingAddress;
  } catch (e) {
    console.log(e);
    return new Error("failed to fetch shipping address data");
  }
}
