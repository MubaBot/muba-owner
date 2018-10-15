import * as Axios from "./index";

const getBusinessShopsList = async ({ ...params }) => {
  return Axios.Get("/api/business");
};

const requestRegister = async ({ file, ext, shop, shop_id, name, number }) => {
  return Axios.Post("/api/business", { file, ext, shop, shop_id, name, number });
};

const uploadPhoto = async data => {
  return Axios.Post("/api/business/photo", data);
};

export { getBusinessShopsList, requestRegister, uploadPhoto };
