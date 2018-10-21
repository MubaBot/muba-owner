import * as AuthStorage from "./auth";
import * as ShopStorage from "./shop";

const StorageKeys = {
  authenticationKey: "authentication",
  ShopStorageKey: "shop"
};

const clearAllData = async () => {
  for (var i in StorageKeys) await localStorage.removeItem(StorageKeys[i]);
};

export { AuthStorage, ShopStorage, clearAllData };

export default StorageKeys;
