import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import { Table } from "components/Table";

import OrderRefuseModalItem from "./OrderRefuseModalItem";

import { OrderApi } from "api";

export default class OrderRefuseModal extends Component {
  state = {
    lists: []
  };

  componentDidMount = () => this.updateRefuseMessage();

  updateRefuseMessage = () => {
    OrderApi.getRefuseMessages({ shop: this.props.shop }).then(result => {
      this.setState({ lists: result.data.lists });
    });
  };

  render() {
    return (
      <Modal isOpen={this.props.modal} style={{ minWidth: 680, maxWidth: 680 }}>
        <ModalHeader>주문 취소</ModalHeader>
        <ModalBody>
          <Table>
            <colgroup>
              <col width="125px" />
              <col />
              <col width="107px" />
            </colgroup>
            <thead>
              <tr>
                <th className="alignCenter">표시 단어</th>
                <th className="alignCenter">메시지</th>
                <th />
              </tr>
            </thead>
            <tbody>
              <OrderRefuseModalItem key={0} register={true} shop={this.props.shop} id={this.props.id} updateRefuseMessage={this.updateRefuseMessage} />
              {this.state.lists.map((x, i) => (
                <OrderRefuseModalItem
                  key={x._id}
                  {...x}
                  shop={this.props.shop}
                  id={this.props.refuse}
                  updateRefuseMessage={this.updateRefuseMessage}
                  updateOrderList={this.props.updateOrderList}
                />
              ))}
            </tbody>
          </Table>
        </ModalBody>
        <ModalFooter>
          <button onClick={this.props.toggle}>확인</button>
        </ModalFooter>
      </Modal>
    );
  }
}
