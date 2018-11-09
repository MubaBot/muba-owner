import * as Axios from "./index";

const getOrderListForOwner = async ({ id, page }) => {
  return Axios.Get(["/api/shop", id, "order", page].join("/"));
};

const getOrderListForOwnerByAdmission = async ({ id, page }) => {
  return Axios.Get(["/api/shop", id, "order", "admission", page].join("/"));
};

const setOrderAllow = async ({ shop, id }) => {
  return Axios.Put(["/api/shop", shop, "order", id, "allow"].join("/"));
};

const setOrderRefuse = async ({ shop, id, admission }) => {
  return Axios.Put(["/api/shop", shop, "order", id, "refuse", admission].join("/"));
};

const addRefuseMessage = async ({ shop, name, message }) => {
  return Axios.Post(["/api/shop", shop, "order", "refuse"].join("/"), { name, message });
};

const getRefuseMessages = async ({ shop }) => {
  return Axios.Get(["/api/shop", shop, "order", "refuse"].join("/"));
};

const modifyOrderRefuseMessage = async ({ shop, id, name, message }) => {
  return Axios.Put(["/api/shop", shop, "order", "refuse", id].join("/"), { name, message });
};

export { getOrderListForOwner, getOrderListForOwnerByAdmission, setOrderAllow, setOrderRefuse, addRefuseMessage, getRefuseMessages, modifyOrderRefuseMessage };
