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

const setOrderRefuse = async ({ shop, id }) => {
  return Axios.Put(["/api/shop", shop, "order", id, "refuse"].join("/"));
};

export { getOrderListForOwner, getOrderListForOwnerByAdmission, setOrderAllow, setOrderRefuse };
