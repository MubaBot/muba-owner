import React, { Component } from "react";
import { Table } from "components/Table";
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
      <Table>
        <colgroup>
          <col />
          <col />
          <col />
          <col />
          <col />
          <col />
          <col />
          <col />
        </colgroup>
        <thead>
          <tr>
            <th className="alignCenter">No.</th>
            <th className="alignCenter">고객명</th>
            <th>주소</th>
            <th className="alignCenter">전화번호</th>
            <th>메뉴</th>
            <th>요구사항</th>
            <th className="alignRight">가격</th>
            <th className="alignCenter">승인/거절</th>
          </tr>
        </thead>
        <tbody>
          {this.state.lists.map((x, i) => (
            <OrderListItem key={x._id} no={i + 1 + (this.state.page - 1) * this.state.count} id={x._id} {...x} reloadList={this.updateOrderList} />
          ))}

          {this.state.lists.length === 0 ? (
            <tr>
              <td className="alignCenter" colSpan="8">
                주문 기록이 없습니다.
              </td>
            </tr>
          ) : null}
        </tbody>
        <Pagination page={this.state.page} count={this.state.count} display={this.state.display} onChangePage={this.onChangePage} />
      </Table>
    );
  }
}
