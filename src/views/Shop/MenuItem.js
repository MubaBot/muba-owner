import React, { Component } from "react";
import { Col, Card, CardImg, CardTitle, InputGroup, InputGroupAddon, InputGroupText, Input, ButtonGroup, Button } from "reactstrap";

import Switch from "react-switch";

import { ShopApi } from "api";

export default class MenuItem extends Component {
  constructor(props) {
    super(props);
    this.state = { name: props.MENUNAME || "", price: props.PRICE || 0, sold: props.SOLD || false };
  }

  componentWillReceiveProps = nextProps => this.setState({ name: nextProps.MENUNAME || "", price: nextProps.PRICE || 0 });

  handleChange = sold => this.setState({ sold });
  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onRegister = () => {
    ShopApi.addMenu({ shop: this.props.shop, name: this.state.name, price: this.state.price, sold: this.state.sold })
      .then(res => {
        this.props.updateShopInfo();
        alert("등록하였습니다.");
      })
      .catch(err => console.log(err));
  };

  onModify = () => {
    ShopApi.modifyMenu({ shop: this.props.shop, menu: this.props.id, name: this.state.name, price: this.state.price, sold: this.state.sold })
      .then(res => {
        this.props.updateShopInfo();
        alert("수정하였습니다.");
      })
      .catch(err => console.log(err));
  };

  onDelete = () => {
    ShopApi.deleteMenu({ shop: this.props.shop, menu: this.props.id })
      .then(res => {
        this.props.updateShopInfo();
        alert("삭제하였습니다.");
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Col sm="3">
        <CardImg top width="100%" src={this.props.URL || "https://placeholdit.imgix.net/~text?txtsize=33&txt=No%20Image&w=318&h=180"} alt="Card image cap" />

        <Card body>
          <CardTitle>{this.props.register ? "등록하기" : this.props.MENUNAME}</CardTitle>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>이름</InputGroupText>
            </InputGroupAddon>
            <Input type="text" name="name" placeholder="이름" value={this.state.name} onChange={this.onChange} />
          </InputGroup>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>가격</InputGroupText>
            </InputGroupAddon>
            <Input type="number" name="price" style={{ textAlign: "right" }} placeholder="가격" value={this.state.price} onChange={this.onChange} />
            <InputGroupAddon addonType="append">
              <InputGroupText>원</InputGroupText>
            </InputGroupAddon>
          </InputGroup>
          <InputGroup>
            <label>
              <span>품절</span>
              <Switch
                onChange={this.handleChange}
                checked={this.state.sold}
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
            </label>
          </InputGroup>
          <InputGroup>
            <label>
              <span>사진</span>
              <Input type="file" name="file" id="exampleFile" />
            </label>
          </InputGroup>

          <ButtonGroup>
            {this.props.register ? null : (
              <Button color="secondary" onClick={() => this.props.showOptionModal(this.props.id)}>
                옵션
              </Button>
            )}
            {this.props.register ? null : (
              <Button color="secondary" onClick={() => this.props.showSaleModal(this.props.id)}>
                세일
              </Button>
            )}
            <Button color="success" onClick={this.props.register ? this.onRegister : this.onModify}>
              {this.props.register ? "추가" : "수정"}
            </Button>
            {this.props.register ? null : (
              <Button color="danger" onClick={this.onDelete}>
                삭제
              </Button>
            )}
          </ButtonGroup>
        </Card>
      </Col>
    );
  }
}
