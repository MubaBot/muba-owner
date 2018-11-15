import React, { Component } from "react";

export default class SearchShopItem extends Component {
  render() {
    return (
      <li>
        <div>
          <h5>{this.props.SHOPNAME}</h5>
          <p>{[this.props.ADDRESS, this.props.ADDRESSDETAIL].join(" ")}</p>
        </div>
        <button onClick={() => this.props.selectShop(this.props._id, this.props.SHOPNAME)}>선택하기</button>
      </li>
    );
  }
}
