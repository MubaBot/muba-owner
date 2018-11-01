import React, { Component } from "react";

export default class ShopListItem extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.no || 0}</td>
        <td>{this.props.SHOPNAME || "-"}</td>
        <td>{[this.props.shop_address.ADDRESS, this.props.shop_address.ADDRESSDETAIL].join(" ") || "-"}</td>
        <td>{this.props.PHONE || "-"}</td>
        <td>{this.props.HOMEPAGE || "-"}</td>
        <td className="text-center">{this.props.shop_menus.length}개</td>
        <td className="text-center">
          <button onClick={() => this.props.selectShop(this.props._id)} disabled={this.props.selected}>
            {this.props.selected ? "관리중" : "선택"}
          </button>
        </td>
      </tr>
    );
  }
}
