import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from "reactstrap";

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
      <Modal isOpen={this.props.modal} toggle={this.props.toggle} style={{ minWidth: 600, maxWidth: 900 }}>
        <ModalHeader toggle={this.props.toggle}>{this.state.name}</ModalHeader>
        <ModalBody>
          <Table>
            <colgroup>
              <col width="82px" />
              <col />
              <col />
              <col width="132px" />
            </colgroup>
            <thead>
              <tr>
                <th className="text-center">사용</th>
                <th className="text-center">이름</th>
                <th className="text-center">가격</th>
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
          <Button color="secondary" onClick={this.props.toggle}>
            확인
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
