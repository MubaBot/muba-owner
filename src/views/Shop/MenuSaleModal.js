import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from "reactstrap";

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
      <Modal isOpen={this.props.modal} toggle={this.props.toggle} style={{ minWidth: 900, maxWidth: 1200 }}>
        <ModalHeader toggle={this.props.toggle}>
          {this.state.name} - {this.state.price}원
        </ModalHeader>
        <ModalBody>
          <Table>
            <colgroup>
              <col />
              <col width="226x" />
              <col />
              <col />
              <col />
              <col />
              <col />
            </colgroup>
            <thead>
              <tr>
                <th className="text-center">날짜 제한 사용</th>
                <th className="text-center">제한 날짜</th>

                <th className="text-center">시간 제한 사용</th>
                <th className="text-center">시작 시간</th>
                <th className="text-center">종료 시간</th>

                <th className="text-center">판매 개수 제한</th>
                <th className="text-center">할인 제한 개수</th>
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
          <Button color="secondary" onClick={this.props.toggle}>
            확인
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
