import React, { Component } from "react";
import Switch from "react-switch";

import accounting from "accounting-js";
import SVG from "react-inlinesvg";
import TrashIcon from "assets/img/icons/icon-trash.svg";

import { ShopApi } from "api";

export default class MenuItem extends Component {
  constructor(props) {
    super(props);
    this.state = { name: props.MENUNAME || "", price: props.PRICE || 0, sold: props.SOLD || false, rep: props.REP || false };
  }

  componentWillReceiveProps = nextProps => this.setState({ name: nextProps.MENUNAME || "", price: nextProps.PRICE || 0 });

  handleChange = sold => this.setState({ sold });
  handleChangeRep = rep => this.setState({ rep });

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
    ShopApi.addMenu({ shop: this.props.shop, name: this.state.name, price: this.state.price, sold: this.state.sold, rep: this.state.rep })
      .then(res => {
        this.props.updateShopInfo();
        alert("등록하였습니다.");
      })
      .catch(err => {
        if (!err.response || !err.response.data || !err.response.data.success) return alert("죄송합니다. 잠시후 다시 시도해주세요.");
        switch (err.response.data.success) {
          case -1:
            return alert("메뉴가 이미 존재합니다.");
          case -2:
            return alert("메뉴 이름을 입력해주세요.");

          default:
            return alert("죄송합니다. 잠시후 다시 시도해주세요.");
        }
      });
  };

  onModify = e => {
    e.preventDefault();
    ShopApi.modifyMenu({
      shop: this.props.shop,
      menu: this.props.id,
      name: this.state.name,
      price: this.state.price,
      sold: this.state.sold,
      rep: this.state.rep
    })
      .then(res => {
        this.props.updateShopInfo();
        alert("수정하였습니다.");
      })
      .catch(err => console.log(err));
  };

  onDelete = () => {
    if (window.confirm("메뉴를 삭제하시겠습니까?"))
      ShopApi.deleteMenu({ shop: this.props.shop, menu: this.props.id })
        .then(res => {
          this.props.updateShopInfo();
          alert("삭제하였습니다.");
        })
        .catch(err => console.log(err));
  };

  handleFileUpload = e => {
    const file = e.target.files[0];
    this.uploadDocumentRequest(file, file.name);
  };

  uploadDocumentRequest = (file, name) => {
    const data = new FormData();
    data.append("photo", file);

    ShopApi.updateMenuPhoto({ shop: this.props.shop, menu: this.props.id, data: data })
      .then(() => this.props.updateShopInfo())
      .catch(() => alert("죄송합니다. 다시 시도해주세요."));
  };

  render() {
    return (
      <div>
        <div className="photo">
          <img width="100%" src={"https://api.mubabot.com/static/" + (this.props.URL ? "menu/" + this.props.URL : "public/img/noimage.png")} alt="Menu" />
        </div>

        {this.props.register ? null : (
          <div className="trash">
            <a onClick={this.onDelete}>
              <SVG src={TrashIcon} />
            </a>
          </div>
        )}

        <form>
          <div className="input">
            <input type="text" name="name" placeholder="메뉴 이름" value={this.state.name} onChange={this.onChange} />
            <div>
              <input
                type="text"
                name="price"
                placeholder="가격"
                value={accounting.formatMoney(this.state.price, { symbol: "", format: "%v", precision: 0 })}
                onChange={this.onChangePrice}
              />
              <span>원</span>
            </div>
          </div>
          <div className="switch">
            <span>품절</span>
            <Switch
              onChange={this.handleChange}
              checked={this.state.sold}
              offColor="#dee2e6"
              onColor="#468ef7"
              onHandleColor="#FFF"
              handleDiameter={22}
              uncheckedIcon={false}
              checkedIcon={false}
              boxShadow="0px 0px 0px rgba(0, 0, 0, 0.6)"
              activeBoxShadow="0px 0px 0px 0px rgba(0, 0, 0, 0.2)"
              height={24}
              width={60}
            />

            <span>대표 메뉴</span>
            <Switch
              onChange={this.handleChangeRep}
              checked={this.state.rep}
              offColor="#dee2e6"
              onColor="#468ef7"
              onHandleColor="#FFF"
              handleDiameter={22}
              uncheckedIcon={false}
              checkedIcon={false}
              boxShadow="0px 0px 0px rgba(0, 0, 0, 0.6)"
              activeBoxShadow="0px 0px 0px 0px rgba(0, 0, 0, 0.2)"
              height={24}
              width={60}
            />
          </div>

          <div className="img" hidden={this.props.register}>
            <span>사진 변경</span>
            <input type="file" name="file" accept="image/*" onChange={this.handleFileUpload} />
          </div>

          <div className="controller" hidden={this.props.register}>
            <a onClick={() => this.props.showOptionModal(this.props.id)}>옵션</a>
            <a onClick={() => this.props.showSaleModal(this.props.id)}>할인</a>
          </div>

          {this.props.register ? (
            <button className="register" onClick={this.onRegister}>
              추가
            </button>
          ) : null}
          {this.props.register ? null : (
            <button className="modify" onClick={this.onModify}>
              수정
            </button>
          )}
        </form>
      </div>
    );
  }
}
