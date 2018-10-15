import React, { Component } from "react";
import { Dropdown, DropdownMenu, DropdownItem, DropdownToggle } from "reactstrap";

export default class OrderMenuItem extends Component {
  constructor(props) {
    super(props);

    var count = 0;
    for (var i in props.MENUS) count += props.MENUS[i].COUNT;

    this.state = { dropdownOpen: false, count: count };
  }

  toggle = () => {
    this.setState({ dropdownOpen: !this.state.dropdownOpen, received: false });
  };

  DropdownItems = () => {
    if (this.props.MENUS.length)
      return this.props.MENUS.map((x, i) => {
        return x.COUNT ? (
          <DropdownItem key={i}>
            {x.shop_menu.MENUNAME} {x.order_menu_options.length ? "(" + this.getOptions(x) + ") " : ""}- ({this.getPrice(x)}
            원, {x.COUNT}
            개)
          </DropdownItem>
        ) : null;
      });
    return <DropdownItem disabled>목록이 없습니다.</DropdownItem>;
  };

  getPrice = menu => {
    var price = menu.PRICE;
    for (var i in menu.order_menu_options) {
      const option = menu.order_menu_options[i];
      price += option.shop_menu_option.shop_option.PRICE;
    }

    return price;
  };

  getOptions = menu => {
    var options = [];
    for (var i in menu.order_menu_options) {
      const option = menu.order_menu_options[i];
      options.push(option.shop_menu_option.shop_option.OPTIONNAME);
    }

    return options.join(", ");
  };

  render() {
    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={() => this.toggle()}>
        <DropdownToggle tag="span" onClick={() => this.toggle()} data-toggle="dropdown" aria-expanded={this.state.dropdownOpen}>
          {this.state.count || "0"}
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem header>주문 목록</DropdownItem>
          {this.DropdownItems()}
        </DropdownMenu>
      </Dropdown>
    );
  }
}
