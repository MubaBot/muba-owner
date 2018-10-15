import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";

import React, { Component } from "react";
import { ButtonGroup, Button, Input } from "reactstrap";

import Switch from "react-switch";

import "moment/locale/ko";

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

  handleChange = use => this.setState({ use });
  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onRegister = () => {
    ShopApi.addShopOptions({ shop: this.props.id, name: this.state.name, menu: this.props.menu, price: this.state.price, use: this.state.use })
      .then(() => this.props.updateOptionInfo())
      .catch(err => console.log(err));
  };

  onModify = () => {
    ShopApi.modifyShopOptions({ shop: this.props.id, id: this.props._id, menu: this.props.menu, price: this.state.price, use: this.state.use })
      .then(() => this.props.updateOptionInfo())
      .catch(err => console.log(err));
  };

  onDelete = () => {
    ShopApi.deleteShopOptions({ shop: this.props.id, id: this.props._id })
      .then(() => this.props.updateOptionInfo())
      .catch(err => console.log(err));
  };

  render() {
    return (
      <tr>
        <td>
          <Switch
            onChange={this.handleChange}
            checked={this.state.use}
            onColor="#86d3ff"
            onHandleColor="#2693e6"
            handleDiameter={30}
            uncheckedIcon={false}
            checkedIcon={false}
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
            height={20}
            width={48}
          />
        </td>
        <td>
          <Input type="text" name="name" value={this.state.name} onChange={this.onChange} disabled={this.props.register ? false : true} />
        </td>
        <td>
          <Input type="number" name="price" value={this.state.price} onChange={this.onChange} />
        </td>

        <td>
          <ButtonGroup>
            <Button color="success" onClick={this.props.register ? this.onRegister : this.onModify}>
              {this.props.register ? "추가" : "적용"}
            </Button>
            {this.props.register ? null : (
              <Button color="danger" onClick={this.onDelete}>
                삭제
              </Button>
            )}
          </ButtonGroup>
        </td>
      </tr>
    );
  }
}
