import React, { Component } from "react";

import MenuItem from "./MenuItem";
import MenuSaleModal from "./MenuSaleModal";
import MenuOptionModal from "./MenuOptionModal";

export default class Menu extends Component {
  state = {
    saleModal: false,
    optionModal: false,
    sale: 0,
    option: 0
  };

  showSaleModal = id => {
    this.saleToggle();
    this.setState({ sale: id });
  };

  showOptionModal = id => {
    this.optionToggle();
    this.setState({ option: id });
  };

  saleToggle = () => this.setState({ saleModal: !this.state.saleModal });
  optionToggle = () => this.setState({ optionModal: !this.state.optionModal });

  render() {
    return (
      <div className="menus">
        <h3>메뉴 관리</h3>
        <div className="items">
          <MenuItem shop={this.props.shop} register={true} updateShopInfo={this.props.updateShopInfo} />
          {this.props.shop_menus.map((x, i) => (
            <MenuItem
              shop={this.props.shop}
              key={x._id}
              id={x._id}
              {...x}
              updateShopInfo={this.props.updateShopInfo}
              showSaleModal={this.showSaleModal}
              showOptionModal={this.showOptionModal}
            />
          ))}
        </div>

        <MenuOptionModal modal={this.state.optionModal} id={this.props.shop} menu={this.state.option} toggle={this.optionToggle} />
        <MenuSaleModal modal={this.state.saleModal} id={this.props.shop} menu={this.state.sale} toggle={this.saleToggle} />
      </div>
    );
  }
}
