import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

export default class RegisterModal extends Component {
  render() {
    return (
      <Modal isOpen={this.props.modal}>
        <ModalHeader toggle={this.props.toggle}>상점 찾기</ModalHeader>
        <ModalBody />
        <ModalFooter>
          <button onClick={this.props.register}>새 가게 등록</button>
        </ModalFooter>
      </Modal>
    );
  }
}
