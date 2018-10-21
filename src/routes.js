import React from "react";
import Loadable from "react-loadable";

import DefaultLayout from "./containers/DefaultLayout";

function Loading() {
  return <div>Loading...</div>;
}

const Dashboard = Loadable({
  loader: () => import("./views/Dashboard"),
  loading: Loading
});

const BusinessShopList = Loadable({
  loader: () => import("./views/Business/ShopList"),
  loading: Loading
});

const BusinessRegister = Loadable({
  loader: () => import("./views/Business/Register"),
  loading: Loading
});

const OrderList = Loadable({
  loader: () => import("./views/Order/OrderList"),
  loading: Loading
});

const OrderAdmissionList = Loadable({
  loader: () => import("./views/Order/OrderAdmissionList"),
  loading: Loading
});

const Shop = Loadable({
  loader: () => import("./views/Shop"),
  loading: Loading
});

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: "/", exact: true, name: "Home", component: DefaultLayout },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },

  { path: "/business/list", name: "Dashboard", component: BusinessShopList },
  { path: "/business/register", name: "BusinessRegister", component: BusinessRegister },

  { path: "/order/list/:page?", name: "Dashboard", component: OrderList },
  { path: "/order/admission/:page?", name: "Dashboard", component: OrderAdmissionList },
  { path: "/order/delivery", name: "Dashboard", component: Dashboard },

  { path: "/shop", name: "Shop", component: Shop },

  { path: "/payment", name: "Dashboard", component: Dashboard }
];

export default routes;