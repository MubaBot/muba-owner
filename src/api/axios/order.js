import * as Axios from "./index";

const getOrderListForOwner = async ({ page }) => {
  return Axios.Get("/api/order/owner/" + page);
};

const getOrderListForOwnerByAdmission = async ({ page }) => {
  return Axios.Get("/api/order/owner/admission/" + page);
};

const setOrderAllow = async ({ id }) => {
  return Axios.Put(["/api/order/owner", id, "allow"].join("/"));
};

const setOrderRefuse = async ({ id }) => {
  return Axios.Put(["/api/order/owner", id, "refuse"].join("/"));
};

export { getOrderListForOwner, getOrderListForOwnerByAdmission, setOrderAllow, setOrderRefuse };
