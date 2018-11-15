import React, { Component } from "react";
import accounting from "accounting-js";

import { ShopApi } from "api";

export default class Payment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shop: -1,
      SHOPNAME: "",
      name: "",
      day: 0,
      price: 0,
      bank: "",
      account: "",
      pricePerDay: 0
    };
  }

  updateShopInfo = id =>
    ShopApi.getShopInfo({ id: id })
      .then(info => {
        if (info.data.shop.OWNERID !== this.props.user.id) {
          alert("사업장을 선택해주세요.");
          return this.props.history.push("/business/list");
        }

        this.setState({ ...info.data.shop });
      })
      .catch(err => {
        if (err.response.status === 403) {
          alert("사업장을 선택해주세요.");
          return this.props.history.push("/business/list");
        }

        if (err.response.status === 404) {
          alert("사업장을 선택해주세요.");
          return this.props.history.push("/business/list");
        }
      });

  getServicePrice = () => {
    ShopApi.getServicePrice()
      .then(price => this.setState({ pricePerDay: price }))
      .catch(err => {
        alert("죄송합니다. 잠시후 다시 시도해주세요.");
        return this.props.history.push("/business/list");
      });
  };

  componentDidMount = () => {
    const shop = ShopApi.getSelectedBusinessShop();
    if (shop === null) {
      alert("사업장을 선택해주세요.");
      this.props.history.push("/business/list");
    }
    this.updateShopInfo(shop);
    this.getServicePrice();
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });
  onChangeDay = e => {
    var d = parseInt(e.target.value, 10);

    if (parseInt(d, 10) >= 0) {
      this.setState({ day: String(d), price: d * this.state.pricePerDay });
    } else {
      this.setState({ day: 0, price: 0 });
    }
  };

  onSubmit = e => {
    e.preventDefault();

    if (this.state.name === "") return alert("입금자명을 입력해주세요.");
    if (this.state.bank === "" || this.state.account === "") return alert("환불계좌를 입력해주세요.");
    if (!(parseInt(this.state.day, 10) > 0)) return alert("신청 기간을 선택해주세요");

    ShopApi.requestService({ shop: this.state._id, name: this.state.name, day: this.state.day, bank: this.state.bank, account: this.state.account })
      .then(() => {
        alert("신청되었습니다");
        window.location.reload();
      })
      .catch(() => alert("죄송합니다. 잠시후 다시 시도해주세요."));
  };

  render() {
    return (
      <div className="animated fadeIn">
        <div className="registerService">
          <form onSubmit={this.onSubmit}>
            <div className="formGroup">
              <p>상점</p>
              <input type="text" name="name" placeholder="선택 안됨" value={this.state.SHOPNAME} disabled />
            </div>

            <div className="formGroup">
              <p>입금자명</p>
              <input type="text" name="name" placeholder="입금자명" value={this.state.name} onChange={this.onChange} />
            </div>

            <div className="formGroup account">
              <p>환불계좌</p>
              <div>
                <input type="text" name="bank" placeholder="은행명" value={this.state.bank} onChange={this.onChange} />
                <input type="text" name="account" placeholder="123-4567-6789-01" value={this.state.account} onChange={this.onChange} />
              </div>
            </div>

            <div className="formGroup input">
              <p>신청일</p>
              <div>
                <input type="number" name="day" placeholder="신청 일 수" value={this.state.day} onChange={this.onChangeDay} />
                <span>일</span>
              </div>
            </div>

            <div className="formGroup input">
              <p>입금 금액</p>
              <div>
                <input
                  type="text"
                  name="price"
                  placeholder="가격"
                  value={accounting.formatMoney(this.state.price, { symbol: "", format: "%v", precision: 0 })}
                  disabled
                />
                <span>원</span>
              </div>
            </div>

            <div className="formGroup">
              <p>
                * 입금 계좌번호 : <b>은행명 123-4567-8901-23 (무바봇)</b>
              </p>
              <p>
                * <b>입금 후</b> 신청해주시길 바랍니다.
              </p>
              <p>
                * 기존 기간이 남아있을 경우 <b>연장</b>되어 신청됩니다.
              </p>
            </div>

            <button onClick={this.onSubmit}>신청하기</button>
          </form>
        </div>
      </div>
    );
  }
}
