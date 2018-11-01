import React, { Component } from "react";

import OrderListTable from "./Table";

export default class OrderList extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <OrderListTable {...this.props} />
      </div>
    );
  }
}
