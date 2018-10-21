import { ShopApi } from "api";

import StorageKeys from "./index";

const setAuthentication = async authentication => {
  return localStorage.setItem(StorageKeys.authenticationKey, authentication);
};

const getAuthentication = async () => {
  return localStorage.getItem(StorageKeys.authenticationKey);
};

const removeAuthentication = async () => {
  localStorage.removeItem(StorageKeys.authenticationKey);
  return ShopApi.removeBusinessShop();
};

const isLogin = async () => {
  const auth = localStorage.getItem(StorageKeys.authenticationKey);
  return auth ? true : false;
};

export { setAuthentication, getAuthentication, removeAuthentication, isLogin };
