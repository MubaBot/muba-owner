import React, { Component, Fragment } from "react";
import { Table } from "reactstrap";
import { isEqual } from "lodash";

import OrderListItem from "./OrderListItem";

import { OrderApi, ShopApi } from "api";

import Pagination from "components/Pagination";

export default class OrderList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: parseInt(this.props.match.params.page, 10) || 1,
      lists: [],
      count: 0,
      selectedShop: parseInt(ShopApi.getSelectedBusinessShop(), 10)
    };
  }

  onChangePage = page => {
    if (page < 1) page = 1;
    if (page > Math.ceil(this.state.count / this.state.display)) page = Math.ceil(this.state.count / this.state.display);

    this.setState({ update: true, page: page });
    if (this.state.page !== page) {
      this.updateOrderList(page);
      this.props.history.push("/order/list/" + page);
    }
  };

  updateOrderList = page => {
    const p = page || this.state.page;

    return OrderApi.getOrderListForOwner({ id: this.state.selectedShop, page: p })
      .then(result => {
        const update = !isEqual(this.state.lists, result.data.lists);

        this.setState({
          lists: update ? result.data.lists : this.state.lists,
          update: update,
          count: result.data.count,
          display: result.data.displayCount,
          now: 0
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentDidMount = () => this.updateOrderList();

  render() {
    return (
      <Fragment>
        <Table>
          <colgroup>
            <col />
            <col />
            <col />
            <col />
            <col />
            <col />
            <col width="132px" />
          </colgroup>
          <thead>
            <tr>
              <th>고객 이름</th>
              <th>주소</th>
              <th>번호</th>
              <th>메뉴</th>
              <th>요구사항</th>
              <th>가격</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {this.state.lists.map((x, i) => (
              <OrderListItem key={x._id} id={x._id} {...x} reloadList={this.updateOrderList} />
            ))}
          </tbody>
        </Table>
        <Pagination page={this.state.page} count={this.state.count} display={this.state.display} onChangePage={this.onChangePage} />
      </Fragment>
    );
  }
}
