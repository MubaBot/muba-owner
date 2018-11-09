import React, { Component } from "react";

import { OrderApi } from "api";

import { debounce } from "lodash";

export default class MenuOptionItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.NAME || "",
      message: props.MESSAGE || ""
    };

    this.onModify = debounce(this.onModify, 1000);
  }

  componentWillReceiveProps = nextProps => {
    this.setState({
      name: nextProps.NAME || "",
      message: nextProps.MESSAGE || ""
    });
  };

  shouldComponentUpdate = (nextProps, nextState) => {
    if (nextState.name === this.state.name && nextState.message === this.state.message) return false;
    return true;
  };

  componentDidUpdate = () => (this.props.register ? null : this.onModify());

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    if (this.props._id) this.onModify();
  };

  onRegister = e => {
    e.preventDefault();

    if (this.state.name === "") return alert("표시 단어를 입력해주세요.");
    if (this.state.message === "") return alert("메시지를 입력해주세요.");

    OrderApi.addRefuseMessage({ shop: this.props.shop, name: this.state.name, message: this.state.message })
      .then(() => this.props.updateRefuseMessage())
      .catch(err => {
        if (!err || !err.response || !err.response.data) alert("죄송합니다. 잠시 후 다시 시도해주세요.");
        switch (err.response.data.success) {
          case -2:
            return alert("표시 단어를 입력해주세요.");
          case -3:
            return alert("메시지를 입력해주세요.");
          case -4:
            return alert("중복되지 않는 단어를 사용해주세요.");
          case -1:
          default:
            alert("죄송합니다. 잠시 후 다시 시도해주세요.");
        }
      });
  };

  selectMessage = e => {
    e.preventDefault();

    OrderApi.setOrderRefuse({ shop: this.props.shop, id: this.props.id, admission: this.props._id })
      .then(() => this.props.updateOrderList())
      .catch(err => console.log(err));
  };

  onModify = () => {
    OrderApi.modifyOrderRefuseMessage({ shop: this.props.shop, id: this.props._id, name: this.state.name, message: this.state.message })
      .then(() => this.props.updateRefuseMessage())
      .catch(err => console.log(err));
  };

  render() {
    return (
      <tr>
        <td>
          <input type="text" name="name" value={this.state.name} placeholder="매진" onChange={this.onChange} />
        </td>
        <td>
          <input type="text" name="message" value={this.state.message} placeholder="메뉴가 매진되어 주문이 거절되었습니다." onChange={this.onChange} />
        </td>

        <td>
          <button className={this.props.register ? "add event" : "event"} onClick={this.props.register ? this.onRegister : this.selectMessage}>
            {this.props.register ? "추가하기" : "거절하기"}
          </button>
        </td>
      </tr>
    );
  }
}
