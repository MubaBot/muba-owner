import React, { Component } from "react";
// import { Card, CardHeader, CardBody } from "reactstrap";

import ShopListTable from "./Table";

export default class ShopList extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <ShopListTable {...this.props} />
      </div>
    );
  }
}
