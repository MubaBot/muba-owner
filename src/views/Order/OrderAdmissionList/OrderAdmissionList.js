import React, { Component } from "react";
import { Card, CardHeader, CardBody } from "reactstrap";

import OrderListTable from "./Table";

export default class OrderAdmissionList extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            <i className="fa fa-align-justify" /> Shops
          </CardHeader>
          <CardBody>
            <OrderListTable {...this.props} />
          </CardBody>
        </Card>
      </div>
    );
  }
}
