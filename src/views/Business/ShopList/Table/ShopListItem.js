import React, { Component } from "react";

export default class ShopListItem extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.SHOPNAME}</td>
        <td>{this.props.ADDRESS}</td>
        <td>{this.props.PHONE}</td>
        <td>{this.props.HOMEPAGE}</td>
        <td className="text-center">0</td>
        <td className="text-center" onClick={() => this.props.selectShop(this.props._id)}>
          <button disabled={this.props.selected}>선택</button>
        </td>
      </tr>
    );
  }
}
