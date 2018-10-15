import React, { Component } from "react";
import { Card, CardHeader, CardBody } from "reactstrap";

import { ShopApi } from "api";
import { getShopInfo } from "api/axios/shop";

import Setting from "./Setting";
import Menu from "./Menu";

export default class Shop extends Component {
  constructor(props) {
    super(props);

    const shop = ShopApi.getSelectedBusinessShop();
    if (shop === null) {
      alert("사업장을 선택해주세요.");
      this.props.history.push("/business/list");
    }

    this.state = {
      shop: shop ? shop : false,
      HOMEPAGE: "",
      PHONE: "",
      SHOPNAME: "",
      shop_address: {
        ADDRESS: {
          state: "",
          city: "",
          address1: "",
          address2: "",
          options: ""
        },
        ADDRLAT: 37.50374576425619,
        ADDRLNG: 127.04485358330714,
        ADMIN: false
      },
      shop_menus: []
    };
  }

  updateShopInfo = () =>
    getShopInfo({ id: this.state.shop })
      .then(info => {
        this.setState({ ...info.data.shop });
      })
      .catch(err => {
        if (err.response.status === 403) {
          alert("사업장을 선택해주세요.");
          return this.props.history.push("/business/list");
        }
        alert("error");
      });

  componentDidMount = () => (this.state.shop ? this.updateShopInfo() : null);

  render() {
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            <i className="fa fa-align-justify" /> {this.state.SHOPNAME}
          </CardHeader>
          <CardBody>
            <Setting {...this.state} />
          </CardBody>
        </Card>
        <Menu shop={this.state.shop} shop_menus={this.state.shop_menus} updateShopInfo={this.updateShopInfo} />
      </div>
    );
  }
}
