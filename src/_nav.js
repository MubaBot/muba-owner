import Store from "assets/img/router/store.svg";
import StoreInsert from "assets/img/router/store-insert.svg";
import List from "assets/img/router/list.svg";
import StoreAdmin from "assets/img/router/store-admin.svg";
import MubaInsert from "assets/img/router/muba-insert.svg";

export default {
  items: [
    {
      name: "Main",
      type: "main"
    },
    {
      name: "사업장 목록",
      url: "/business/list",
      icon: Store
    },
    {
      name: "사업장 등록",
      url: "/business/register",
      icon: StoreInsert
    },
    {
      name: "주문 목록",
      url: "/order/list",
      icon: List
    },
    // {
    //   name: "주문 관리",
    //   icon: "icon-speedometer",
    //   children: [
    //     {
    //       name: "주문 승인",
    //       url: "/order/admission",
    //       icon: "icon-speedometer"
    //     },
    //     {
    //       name: "배송 관리",
    //       url: "/order/delivery",
    //       icon: "icon-speedometer"
    //     }
    //   ]
    // },
    {
      name: "상점 관리",
      url: "/shop",
      icon: StoreAdmin
    },
    {
      name: "무바 신청",
      url: "/payment",
      icon: MubaInsert
    }
  ]
};
