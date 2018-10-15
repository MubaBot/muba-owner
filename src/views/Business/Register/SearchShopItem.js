import React, { Component } from "react";
import { ListGroupItem } from "reactstrap";

export default class SearchShopItem extends Component {
  render() {
    return (
      <ListGroupItem onClick={() => this.props.selectShop(this.props._id, this.props.SHOPNAME)}>
        {this.props.SHOPNAME} - {this.props.shop_address.ADDRESS}
      </ListGroupItem>
    );
  }
}
