import * as ShopAxios from "api/axios/shop";
import * as ShopStorage from "api/storage/shop";

import * as OrderAxios from "api/axios/order";

const ShopApi = { ...ShopAxios, ...ShopStorage };
const OrderApi = { ...OrderAxios };

export { ShopApi, OrderApi };
