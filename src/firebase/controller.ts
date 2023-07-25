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

export async function createNewShippingAddress(params: {
  userAccountAddress: string;
  addressData: {};
}) {
  try {
    const { userAccountAddress, addressData } = params;
    const directory = `address/${userAccountAddress}`;
    const result = await update(ref(database, directory), {
      ...addressData,
    });
    //@ts-ignore
    const hashKey = result._path.pieces_[2];
    return { hashKey: hashKey as string };
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
