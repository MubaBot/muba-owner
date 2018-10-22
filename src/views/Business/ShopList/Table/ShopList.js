import React, { Component, Fragment } from "react";
// import { Table } from "reactstrap";
import { isEqual } from "lodash";

import { Table } from "components/Table";

import ShopListItem from "./ShopListItem";

import { getBusinessShopsList } from "api/axios/business";
import { setBusinessShop, getSelectedBusinessShop } from "api/storage/shop";

export default class RequestList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: parseInt(this.props.match.params.page, 10) || 1,
      lists: [],
      selectedShop: parseInt(getSelectedBusinessShop(), 10)
    };
  }

  updateShopList = async page => {
    const p = page || this.state.page;

    return getBusinessShopsList({ page: p })
      .then(result => {
        const update = !isEqual(this.state.lists, result.data.lists);

        this.setState({
          lists: update ? result.data.lists : this.state.lists
        });
      })
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
      <Fragment>
        <Table>
          <colgroup>
            <col />
            <col />
            <col />
            <col />
            <col />
            <col width="113px" />
          </colgroup>
          <thead>
            <tr>
              <th>가게 이름</th>
              <th>주소</th>
              <th>번호</th>
              <th>홈페이지</th>
              <th className="text-center">메뉴</th>
              <th className="text-center">관리</th>
            </tr>
          </thead>
          <tbody>
            {this.state.lists.map((x, i) => (
              <ShopListItem
                key={x._id}
                id={x._id}
                {...x}
                selected={this.state.selectedShop === x._id}
                reloadList={this.updateShopList}
                selectShop={this.selectShop}
              />
            ))}
          </tbody>
        </Table>
      </Fragment>
    );
  }
}
