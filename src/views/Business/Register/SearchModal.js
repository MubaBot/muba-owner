import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import SVG from "react-inlinesvg";
import SearchIcon from "assets/img/icons/icon-search.svg";

import SearchShopItem from "./SearchShopItem";

import { searchShop } from "api/axios/shop";

export default class SearchModal extends Component {
  state = {
    lists: [],
    page: 1,
    keyword: "",
    more: false,
    searchKeyword: "",
    init: true
  };

  searchShops = () => {
    if (this.state.keyword === "") return alert("검색할 가게를 입력해주세요.");
    searchShop({ keyword: this.state.keyword, page: 1 }).then(res =>
      this.setState({ lists: res.data.lists, page: 2, more: res.data.lists.length !== 0, searchKeyword: this.state.keyword, init: false })
    );
  };

  moreShops = () => {
    if (this.state.keyword === "") return alert("검색할 가게를 입력해주세요.");
    searchShop({ keyword: this.state.keyword, page: this.state.page }).then(res =>
      this.setState({ lists: this.state.lists.concat(res.data.lists), more: res.data.lists.length !== 0, page: this.state.page + 1 })
    );
  };

  onSearch = e => (e.keyCode === 13 ? this.searchShops() : null);
  onChange = e => this.setState({ [e.target.name]: e.target.value, init: true });

  render() {
    return (
      <Modal className="business" isOpen={this.props.modal}>
        <ModalHeader toggle={this.props.toggle}>상점 찾기</ModalHeader>
        <ModalBody>
          <div>
            <input name="keyword" placeholder="상점 이름 검색" onChange={this.onChange} onKeyDown={this.onSearch} />
            <button onClick={this.searchShops}>
              <SVG src={SearchIcon} />
            </button>
          </div>

          <ol>
            {this.state.lists.map((x, i) => (
              <SearchShopItem key={i} {...x} selectShop={this.props.selectShop} />
            ))}

            {this.state.more ? (
              <li style={{ alignItems: "center", justifyContent: "center", padding: 0 }}>
                <button style={{ border: "none", padding: 0 }} onClick={this.moreShops}>
                  더 보기
                </button>
              </li>
            ) : !this.state.init && this.state.lists.length === 0 ? (
              <li style={{ alignItems: "center", justifyContent: "center" }}>찾으시는 상점이 없습니다.</li>
            ) : null}
          </ol>
        </ModalBody>
        <ModalFooter>
          <button onClick={this.props.register}>새 가게 등록</button>
        </ModalFooter>
      </Modal>
    );
  }
}
