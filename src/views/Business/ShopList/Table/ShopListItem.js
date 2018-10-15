import React, { Component } from "react";
import { Button } from "reactstrap";

export default class ShopListItem extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.SHOPNAME}</td>
        <td>{this.props.ADDRESS}</td>
        <td>{this.props.PHONE}</td>
        <td>{this.props.HOMEPAGE}</td>
        <td>0</td>
        <td onClick={() => this.props.selectShop(this.props._id)}>
          <Button color="success" disabled={this.props.selected}>
            선택
          </Button>
        </td>
      </tr>
    );
  }
}
