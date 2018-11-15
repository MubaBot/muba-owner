import React, { Component } from "react";

import { Table } from "components/Table";

import ShopListItem from "./ShopListItem";

import { getBusinessShopsList } from "api/axios/business";
import { setBusinessShop, getSelectedBusinessShop } from "api/storage/shop";

export default class RequestList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lists: [],
      selectedShop: parseInt(getSelectedBusinessShop(), 10)
    };
  }

  updateShopList = async () => {
    return getBusinessShopsList()
      .then(result => this.setState({ lists: result.data.lists }))
      .catch(err => console.log(err));
  };

  componentDidMount = () => this.updateShopList();

  selectShop = id => {
    setBusinessShop(id);
    // this.setState({ selectedShop: id });
    window.location.reload();
  };

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
          <col width="113px" />
        </colgroup>
        <thead>
          <tr>
            <th>No.</th>
            <th>가게 이름</th>
            <th>주소</th>
            <th>전화번호</th>
            <th>홈페이지</th>
            <th className="text-center">메뉴</th>
            <th className="text-center">무바 만료</th>
            <th className="text-center">관리</th>
          </tr>
        </thead>
        <tbody>
          {this.state.lists.map((x, i) => (
            <ShopListItem
              key={x._id}
              no={i + 1}
              id={x._id}
              {...x}
              selected={this.state.selectedShop === x._id}
              reloadList={this.updateShopList}
              selectShop={this.selectShop}
            />
          ))}

          {this.state.lists.length === 0 ? (
            <tr>
              <td className="alignCenter" colSpan="10">
                등록된 사업장이 없습니다.
              </td>
            </tr>
          ) : null}
        </tbody>
      </Table>
    );
  }
}
