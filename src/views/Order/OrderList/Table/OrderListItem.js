import React, { Component } from "react";

import accounting from "accounting-js";

import OrderMenuItem from "./OrderMenuItem";

import { OrderApi } from "api";

export default class OrderListItem extends Component {
  onAllow = () => OrderApi.setOrderAllow({ shop: this.props.shop._id, id: this.props._id }).then(() => this.props.reloadList());
  onRefuse = () => OrderApi.setOrderRefuse({ shop: this.props.shop._id, id: this.props._id }).then(() => this.props.reloadList());

  render() {
    return (
      <tr>
        <td className="alignCenter">{this.props.no}</td>
        <td className="alignCenter">{this.props.user.USERNAME}</td>
        <td>{this.props.ADDRESS}</td>
        <td className="alignCenter">{this.props.PHONE}</td>
        <td>
          <OrderMenuItem MENUS={this.props.order_menus} />
        </td>
        <td>{this.props.REQUIRE}</td>
        <td className="alignRight">
          <b>{accounting.formatMoney(this.props.PRICE, { symbol: "원", format: "%v %s", precision: 0 })}</b>
        </td>
        <td className="alignCenter">
          <div className="btn-group">
            {this.props.ADMISSION === null || this.props.ADMISSION === 1 ? (
              <button className={this.props.ADMISSION === null ? "normal" : "normal admission"} onClick={this.onAllow} disabled={this.props.ADMISSION === 1}>
                {this.props.ADMISSION === 1 ? "승인함" : "승인"}
              </button>
            ) : null}
            {this.props.ADMISSION === null || this.props.ADMISSION === 0 ? (
              <button className={this.props.ADMISSION === null ? "cancel" : "cancel admission"} onClick={this.onRefuse} disabled={this.props.ADMISSION === 0}>
                {this.props.ADMISSION === 0 ? "거절함" : "거절"}
              </button>
            ) : null}
          </div>
        </td>
      </tr>
    );
  }
}
