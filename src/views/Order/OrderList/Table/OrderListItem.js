import React, { Component } from "react";
import { ButtonGroup, Button } from "reactstrap";

import OrderMenuItem from "./OrderMenuItem";

import { OrderApi } from "api";

export default class OrderListItem extends Component {
  onAllow = () => OrderApi.setOrderAllow({ id: this.props._id }).then(() => this.props.reloadList());
  onRefuse = () => OrderApi.setOrderRefuse({ id: this.props._id }).then(() => this.props.reloadList());

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
        <td>
          <ButtonGroup>
            {this.props.ADMISSION === null || this.props.ADMISSION === true ? (
              <Button color="success" onClick={this.onAllow} disabled={this.props.ADMISSION === true}>
                {this.props.ADMISSION === true ? "승인함" : "승인"}
              </Button>
            ) : null}
            {this.props.ADMISSION === null || this.props.ADMISSION === false ? (
              <Button color="danger" onClick={this.onRefuse} disabled={this.props.ADMISSION === false}>
                {this.props.ADMISSION === false ? "거절함" : "거절"}
              </Button>
            ) : null}
          </ButtonGroup>
        </td>
      </tr>
    );
  }
}
