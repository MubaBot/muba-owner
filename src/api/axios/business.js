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

const registerShop = async ({ name, address, detail, lat, lng, phone, homepage }) => {
  return Axios.Post("/api/business/shop", { name, address, detail, lat, lng, phone, homepage });
};

export { getBusinessShopsList, requestRegister, uploadPhoto, registerShop };
