import * as AuthAxios from "api/axios/auth";
import * as AuthStorage from "api/storage/auth";

import * as ShopAxios from "api/axios/shop";
import * as ShopStorage from "api/storage/shop";

import * as OrderAxios from "api/axios/order";

import * as BusinessAxios from "api/axios/business";

const AuthApi = { ...AuthAxios, ...AuthStorage };
const ShopApi = { ...ShopAxios, ...ShopStorage };
const OrderApi = { ...OrderAxios };
const BusinessApi = { ...BusinessAxios };

export { AuthApi, ShopApi, OrderApi, BusinessApi };
