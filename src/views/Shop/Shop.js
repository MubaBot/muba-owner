import React, { Component } from "react";

import { ShopApi } from "api";
import { getShopInfo } from "api/axios/shop";

import Setting from "./Setting";
import Menu from "./Menu";

export default class Shop extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shop: false,
      HOMEPAGE: "",
      PHONE: "",
      SHOPNAME: "",
      shop_address: {
        ADDRESS: "",
        ADDRLAT: 37.50374576425619,
        ADDRLNG: 127.04485358330714,
        ADMIN: false
      },
      OPEN: false,
      DELIVERY: false,
      shop_menus: []
    };
  }

  updateShopInfo = id =>
    getShopInfo({ id: id || this.state.shop })
      .then(info => {
        if (info.data.shop.OWNERID !== this.props.user.id) {
          alert("사업장을 선택해주세요.");
          return this.props.history.push("/business/list");
        }

        this.setState({ ...info.data.shop });
      })
      .catch(err => {
        if (err.response.status === 403) {
          alert("사업장을 선택해주세요.");
          return this.props.history.push("/business/list");
        }

        if (err.response.status === 404) {
          alert("사업장을 선택해주세요.");
          return this.props.history.push("/business/list");
        }
      });

  componentDidMount = () => {
    const shop = ShopApi.getSelectedBusinessShop();
    if (shop === null) {
      alert("사업장을 선택해주세요.");
      this.props.history.push("/business/list");
    }
    this.updateShopInfo(shop);
    this.setState({ shop: shop });
  };

  render() {
    return (
      <div className="animated fadeIn shop">
        <Setting {...this.state} updateShopInfo={this.updateShopInfo} />
        <Menu shop={this.state.shop} shop_menus={this.state.shop_menus} updateShopInfo={this.updateShopInfo} />
      </div>
    );
  }
}
