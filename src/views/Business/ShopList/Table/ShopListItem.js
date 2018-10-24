import React, { Component } from "react";

export default class ShopListItem extends Component {
  render() {
    const addr = JSON.parse(this.props.shop_address.ADDRESS);

    const address = [addr.state, addr.city, addr.address1, addr.options].join(" ");

    return (
      <tr>
        <td>{this.props.SHOPNAME || "-"}</td>
        <td>{address || "-"}</td>
        <td>{this.props.PHONE || "-"}</td>
        <td>{this.props.HOMEPAGE || "-"}</td>
        <td className="text-center">{this.props.shop_menus.length}</td>
        <td className="text-center">
          <button onClick={() => this.props.selectShop(this.props._id)} disabled={this.props.selected}>
            선택
          </button>
        </td>
      </tr>
    );
  }
}
