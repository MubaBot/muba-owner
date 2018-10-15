import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ListGroup, InputGroup, InputGroupAddon, Input, Button } from "reactstrap";
import SearchShopItem from "./SearchShopItem";

import { searchShop } from "api/axios/shop";

export default class SearchModal extends Component {
  state = {
    lists: [],
    page: 1,
    keyword: ""
  };

  searchShops = () => {
    if (this.state.keyword === "") return alert("검색할 가게를 입력해주세요.");
    searchShop({ keyword: this.state.keyword, page: this.state.page }).then(res => this.setState({ lists: res.data.lists }));
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    return (
      <Modal isOpen={this.props.modal}>
        <ModalHeader toggle={this.props.toggle}>가게 선택</ModalHeader>
        <ModalBody>
          <InputGroup>
            <Input name="keyword" placeholder="Search" onChange={this.onChange} />
            <InputGroupAddon addonType="append">
              <Button color="primary" onClick={this.searchShops}>
                Search
              </Button>
            </InputGroupAddon>
          </InputGroup>

          <ListGroup flush>
            {this.state.lists.map((x, i) => (
              <SearchShopItem key={i} {...x} selectShop={this.props.selectShop} />
            ))}
          </ListGroup>
        </ModalBody>
      </Modal>
    );
  }
}
