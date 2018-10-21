import * as Axios from "./index";

const getOrderListForOwner = async ({ id, page }) => {
  return Axios.Get(["/api/shop", id, "order", page].join("/"));
};

const getOrderListForOwnerByAdmission = async ({ id, page }) => {
  return Axios.Get(["/api/shop", id, "order", "admission", page].join("/"));
};

const setOrderAllow = async ({ id }) => {
  return Axios.Put(["/api/order/owner", id, "allow"].join("/"));
};

const setOrderRefuse = async ({ id }) => {
  return Axios.Put(["/api/order/owner", id, "refuse"].join("/"));
};

export { getOrderListForOwner, getOrderListForOwnerByAdmission, setOrderAllow, setOrderRefuse };
