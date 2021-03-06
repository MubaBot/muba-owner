import React, { Component } from "react";

import accounting from "accounting-js";
import moment from "moment";
import "moment/locale/ko";

import OrderMenuItem from "./OrderMenuItem";

import { OrderApi } from "api";

export default class OrderListItem extends Component {
  onAllow = () => OrderApi.setOrderAllow({ shop: this.props.shop._id, id: this.props._id }).then(() => this.props.reloadList());
  displayRefuse = refuse => {
    switch (refuse) {
      case 0:
        return this.props.order_refuse_message ? this.props.order_refuse_message.NAME : "거절함";
      case 2:
        return "취소됨";
      case null:
        return "취소";
      default:
        return "에러";
    }
  };

  componentDidMount = () => setInterval(() => this.forceUpdate(), 1000);

  render() {
    return (
      <tr>
        <td className="alignCenter">{this.props.no}</td>
        <td className="alignCenter">{this.props.user.USERNAME}</td>
        <td>{this.props.VISIT === true ? "방문 포장" : this.props.ADDRESS}</td>
        <td className="alignCenter">{this.props.PHONE}</td>
        <td>
          <OrderMenuItem MENUS={this.props.order_menus} />
        </td>
        <td>{this.props.REQUIRE}</td>
        <td className="alignRight">
          <b>{accounting.formatMoney(this.props.PRICE, { symbol: "원", format: "%v %s", precision: 0 })}</b>
        </td>
        <td>{moment(this.props.createdAt).fromNow()}</td>
        <td className="alignCenter">
          <div className="btn-group">
            {this.props.ADMISSION === null || this.props.ADMISSION === 1 ? (
              <button className={this.props.ADMISSION === null ? "normal" : "normal admission"} onClick={this.onAllow} disabled={this.props.ADMISSION === 1}>
                {this.props.ADMISSION === 1 ? "승인함" : "승인"}
              </button>
            ) : null}
            {this.props.ADMISSION === null || this.props.ADMISSION !== 1 ? (
              <button
                className={this.props.ADMISSION === null ? "cancel" : "cancel admission"}
                onClick={() => this.props.onRefuse(this.props._id)}
                disabled={this.props.ADMISSION !== null}
              >
                {this.displayRefuse(this.props.ADMISSION)}
              </button>
            ) : null}
          </div>
        </td>
      </tr>
    );
  }
}
