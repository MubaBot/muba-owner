import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import { Table } from "components/Table";

import MenuOptionItem from "./MenuOptionItem";

import { ShopApi } from "api";

export default class MenuOptionModal extends Component {
  state = {
    name: "",
    lists: []
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.menu !== 0 && this.props.menu !== nextProps.menu) this.updateOptionInfo(nextProps);
  };

  updateOptionInfo = newProps => {
    const props = newProps || this.props;
    ShopApi.getShopOptionInfo({ id: props.id, menu: props.menu }).then(result => {
      this.setState({ name: result.data.name, price: result.data.price, lists: result.data.list });
    });
  };

  render() {
    return (
      <Modal isOpen={this.props.modal} style={{ minWidth: 680, maxWidth: 680 }}>
        <ModalHeader>{this.state.name}</ModalHeader>
        <ModalBody>
          <Table>
            <colgroup>
              <col width="53px" />
              <col />
              <col />
              <col />
            </colgroup>
            <thead>
              <tr>
                <th className="alignCenter">사용</th>
                <th className="alignCenter">옵션</th>
                <th className="alignCenter">가격</th>
                <th />
              </tr>
            </thead>
            <tbody>
              <MenuOptionItem key={0} register={true} id={this.props.id} menu={this.props.menu} updateOptionInfo={this.updateOptionInfo} />
              {this.state.lists.map((x, i) => (
                <MenuOptionItem key={x._id} {...x} id={this.props.id} menu={this.props.menu} updateOptionInfo={this.updateOptionInfo} />
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
