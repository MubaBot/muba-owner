import React, { Component } from "react";

import OrderMenuItem from "./OrderMenuItem";

export default class OrderListItem extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.user.USERNAME}</td>
        <td>{this.props.ADDRESS}</td>
        <td>{this.props.PHONE}</td>
        <td>
          <OrderMenuItem MENUS={this.props.order_menus} />
        </td>
        <td>{this.props.REQUIRE}</td>
        <td>{this.props.PRICE}</td>
      </tr>
    );
  }
}
