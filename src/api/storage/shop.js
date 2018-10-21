import StorageKeys from "./index";

const setBusinessShop = async id => {
  return localStorage.setItem(StorageKeys.ShopStorageKey, id);
};

const getSelectedBusinessShop = () => {
  return localStorage.getItem(StorageKeys.ShopStorageKey);
};

const removeBusinessShop = async () => {
  return localStorage.removeItem(StorageKeys.ShopStorageKey);
};

export { setBusinessShop, getSelectedBusinessShop, removeBusinessShop };
