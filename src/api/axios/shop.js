import * as Axios from "./index";
import zpad from "zpad";

const searchShop = async ({ keyword, page }) => {
  return Axios.Get(["/api/shop/list", page, keyword].join("/"));
};

const getShopInfo = async ({ id }) => {
  return Axios.Get("/api/shop/" + id);
};

const getShopSaleInfo = async ({ id, menu }) => {
  return Axios.Get(["/api/shop", id, "menu", menu, "sale"].join("/"));
};

const getShopOptionInfo = async ({ id, menu }) => {
  return Axios.Get(["/api/shop", id, "menu", menu, "option"].join("/"));
};

const addMenu = async ({ shop, name, price, sold, rep }) => {
  return Axios.Post(["/api/shop", shop, "menu"].join("/"), { name, price, sold, rep });
};

const modifyMenu = async ({ shop, menu, name, price, sold, rep }) => {
  return Axios.Put(["/api/shop", shop, "menu", menu].join("/"), { name, price, sold, rep });
};

const deleteMenu = async ({ shop, menu }) => {
  return Axios.Delete(["/api/shop", shop, "menu", menu].join("/"));
};

const removeMenuSale = async ({ shop, menu, sale }) => {
  return Axios.Delete(["/api/shop", shop, "menu", menu, "sale", sale].join("/"));
};

const addMenuSale = async ({ shop, menu, useDate, startDate, endDate, useTime, startTime, endTime, useLimit, limit, price }) => {
  return Axios.Post(["/api/shop", shop, "menu", menu, "sale"].join("/"), {
    useDate,
    startDate: startDate.format("YYYYMMDD"),
    endDate: endDate.format("YYYYMMDD"),
    useTime,
    startTime: zpad(startTime.hour) + zpad(startTime.minute),
    endTime: zpad(endTime.hour) + zpad(endTime.minute),
    useLimit,
    limit,
    price
  });
};

const modifyMenuSale = async ({ shop, menu, sale, useDate, startDate, endDate, useTime, startTime, endTime, useLimit, limit, price }) => {
  return Axios.Put(["/api/shop", shop, "menu", menu, "sale", sale].join("/"), {
    useDate,
    startDate: startDate.format("YYYYMMDD"),
    endDate: endDate.format("YYYYMMDD"),
    useTime,
    startTime: zpad(startTime.hour) + zpad(startTime.minute),
    endTime: zpad(endTime.hour) + zpad(endTime.minute),
    price
  });
};

const addShopOptions = async ({ shop, menu, name, price, use }) => {
  return Axios.Post(["/api/shop", shop, "option"].join("/"), {
    menu,
    name,
    price,
    use
  });
};

const modifyShopOptions = async ({ shop, id, menu, price, use }) => {
  return Axios.Put(["/api/shop", shop, "option", id].join("/"), {
    menu,
    price,
    use
  });
};

const deleteShopOptions = async ({ shop, id }) => {
  return Axios.Delete(["/api/shop", shop, "option", id].join("/"));
};

const updateShopAddressLatLng = async ({ shop, address, lat, lng }) => {
  return Axios.Put(["/api/shop", shop, "latlng"].join("/"), {
    address,
    lat,
    lng
  });
};

const updateShopInfo = async ({ shop, name, detail, phone, homepage }) => {
  return Axios.Put(["/api/shop", shop].join("/"), {
    name,
    detail,
    phone,
    homepage
  });
};

export {
  searchShop,
  getShopInfo,
  getShopSaleInfo,
  getShopOptionInfo,
  addMenu,
  modifyMenu,
  deleteMenu,
  addMenuSale,
  removeMenuSale,
  modifyMenuSale,
  addShopOptions,
  modifyShopOptions,
  deleteShopOptions,
  updateShopAddressLatLng,
  updateShopInfo
};
