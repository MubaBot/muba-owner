import React, { Component } from "react";

import Switch from "react-switch";
import accounting from "accounting-js";

import { ShopApi } from "api";

export default class MenuOptionItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.OPTIONNAME || "",
      price: props.PRICE || 0,
      use: props.shop_menu_options ? props.shop_menu_options.length !== 0 : false
    };
  }

  componentWillReceiveProps = nextProps => {
    this.setState({
      name: nextProps.OPTIONNAME || "",
      price: nextProps.PRICE || 0,
      use: nextProps.shop_menu_options ? nextProps.shop_menu_options.length !== 0 : false
    });
  };

  shouldComponentUpdate = (nextProps, nextState) => {
    if (nextState.name === this.state.name && nextState.price === this.state.price && nextState.use === this.state.use) return false;
    return true;
  };

  componentDidUpdate = () => (this.props.register ? null : this.onModify());

  handleChange = use => this.setState({ use });
  onChange = e => this.setState({ [e.target.name]: e.target.value });
  onChangePrice = e => {
    const num = e.target.value.replace(/,/gi, "");
    if (parseInt(num, 10) >= 0) {
      this.setState({ price: parseInt(num, 10) });
    } else {
      this.setState({ price: 0 });
    }
  };

  onRegister = e => {
    e.preventDefault();
    ShopApi.addShopOptions({ shop: this.props.id, name: this.state.name, menu: this.props.menu, price: this.state.price, use: this.state.use })
      .then(() => this.props.updateOptionInfo())
      .catch(err => console.log(err));
  };

  onModify = () => {
    ShopApi.modifyShopOptions({ shop: this.props.id, id: this.props._id, menu: this.props.menu, price: this.state.price, use: this.state.use })
      .then(() => this.props.updateOptionInfo())
      .catch(err => console.log(err));
  };

  onDelete = e => {
    e.preventDefault();
    ShopApi.deleteShopOptions({ shop: this.props.id, id: this.props._id })
      .then(() => this.props.updateOptionInfo())
      .catch(err => console.log(err));
  };

  render() {
    return (
      <tr>
        <td>
          <Switch
            className="switch"
            onChange={this.handleChange}
            checked={this.state.use}
            offColor="#dee2e6"
            onColor="#468ef7"
            onHandleColor="#FFF"
            handleDiameter={22}
            uncheckedIcon={false}
            checkedIcon={false}
            boxShadow="0px 0px 0px rgba(0, 0, 0, 0.6)"
            activeBoxShadow="0px 0px 0px 0px rgba(0, 0, 0, 0.2)"
            height={24}
            width={48}
          />
        </td>
        <td>
          <input type="text" name="name" value={this.state.name} placeholder="옵션" onChange={this.onChange} disabled={this.props.register ? false : true} />
        </td>
        <td>
          <div className="price">
            <input
              type="text"
              name="price"
              value={accounting.formatMoney(this.state.price, { symbol: "", format: "%v", precision: 0 })}
              placeholder="가격"
              onChange={this.onChangePrice}
            />
            <span>원</span>
          </div>
        </td>

        <td>
          <button className={this.props.register ? "add event" : "delete event"} onClick={this.props.register ? this.onRegister : this.onDelete}>
            {this.props.register ? "추가" : "삭제"}
          </button>
        </td>
      </tr>
    );
  }
}
