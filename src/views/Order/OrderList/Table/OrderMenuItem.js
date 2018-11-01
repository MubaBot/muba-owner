import React, { Component } from "react";

import accounting from "accounting-js";

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
          <li key={i}>
            {x.shop_menu.MENUNAME} {x.order_menu_options.length ? "/ " + this.getOptions(x) + " " : ""}
            <span>{accounting.formatMoney(this.getPrice(x), { symbol: "원", format: "%v%s", precision: 0 })}</span> ({x.COUNT}
            개)
          </li>
        ) : null;
      });
    return <li>목록이 없습니다.</li>;
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
    return <ol>{this.DropdownItems()}</ol>;
  }
}
