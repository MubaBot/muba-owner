import React, { Component } from "react";
import { Card, CardHeader, CardBody } from "reactstrap";

import ShopListTable from "./Table";

export default class ShopList extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            <i className="fa fa-align-justify" /> Shops
          </CardHeader>
          <CardBody>
            <ShopListTable {...this.props} />
          </CardBody>
        </Card>
      </div>
    );
  }
}
