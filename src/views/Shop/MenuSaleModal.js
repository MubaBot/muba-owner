import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import { Table } from "components/Table";

import MenuSaleItem from "./MenuSaleItem";

import { ShopApi } from "api";

export default class MenuSaleModal extends Component {
  state = {
    name: "",
    price: 0,
    lists: []
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.menu !== 0 && this.props.menu !== nextProps.menu) this.updateSaleInfo(nextProps);
  };

  updateSaleInfo = newProps => {
    const props = newProps || this.props;
    ShopApi.getShopSaleInfo({ id: props.id, menu: props.menu }).then(result => {
      this.setState({ name: result.data.name, price: result.data.price, lists: result.data.list });
    });
  };

  render() {
    return (
      <Modal isOpen={this.props.modal} style={{ minWidth: 1050, maxWidth: 1050 }}>
        <ModalHeader>{this.state.name}</ModalHeader>
        <ModalBody>
          <Table>
            <colgroup>
              <col />
              <col />
              <col />
              <col width="200px" />
              <col />
              <col width="120px" />
              <col width="135px" />
              <col />
            </colgroup>
            <thead>
              <tr>
                <th className="text-center">날짜 제한</th>
                <th className="text-center">할인 기간</th>

                <th className="text-center">시간 제한</th>
                <th className="text-center">할인 시간</th>

                <th className="text-center">할인 제한</th>
                <th className="text-center">판매 개수</th>
                <th className="text-center">가격</th>

                <th />
              </tr>
            </thead>
            <tbody>
              <MenuSaleItem key={0} register={true} id={this.props.id} menu={this.props.menu} updateSaleInfo={this.updateSaleInfo} />
              {this.state.lists.map((x, i) => (
                <MenuSaleItem key={x._id} {...x} sale={x._id} id={this.props.id} menu={this.props.menu} updateSaleInfo={this.updateSaleInfo} />
              ))}
            </tbody>
          </Table>
        </ModalBody>
        <ModalFooter>
          <button color="secondary" onClick={this.props.toggle}>
            닫기
          </button>
        </ModalFooter>
      </Modal>
    );
  }
}
