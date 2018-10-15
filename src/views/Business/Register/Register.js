import React, { Component } from "react";
import { Row, Col, Card, CardHeader, CardBody, Button, Form, FormGroup, Label, Input } from "reactstrap";

import { requestRegister, uploadPhoto } from "api/axios/business";
import SearchModal from "./SearchModal";

export default class Register extends Component {
  state = {
    file: "",
    ext: "",
    shop: "",
    shop_id: 0,
    name: "",
    number: "",
    modal: false
  };

  handleFileUpload = e => {
    const file = e.target.files[0];
    this.uploadDocumentRequest(file, file.name);
  };

  uploadDocumentRequest = (file, name) => {
    const data = new FormData();
    data.append("photo", file);

    uploadPhoto(data).then(res => this.setState({ file: res.data.name, ext: res.data.ext }));
  };

  toggle = () => this.setState({ modal: !this.state.modal });
  onChange = e => this.setState({ [e.target.name]: e.target.value });

  selectShop = (id, name) => {
    this.setState({ shop_id: id, shop: name });
    this.toggle();
  };

  onSubmit = e => {
    e.preventDefault();

    requestRegister({
      file: this.state.file,
      ext: this.state.ext,
      shop: this.state.shop,
      shop_id: this.state.shop_id,
      name: this.state.name,
      number: this.state.number
    })
      .then(() => {
        alert("신청하였습니다.");
        window.location.reload();
      })
      .catch(err => {});
  };

  render() {
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            <i className="fa fa-align-justify" /> 사업장 등록
          </CardHeader>
          <CardBody>
            <Row>
              <Col xs="12" sm="6" lg="3">
                <Button onClick={this.toggle}>가게 선택</Button>
                <Label>{this.state.shop}</Label>
              </Col>
            </Row>
            <Form onSubmit={this.onSubmit}>
              <Row>
                <Col xs="12" sm="6" lg="3">
                  <FormGroup>
                    <Label for="name">사장님 이름</Label>
                    <Input type="text" name="name" id="name" placeholder="Name" onChange={this.onChange} />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xs="12" sm="6" lg="3">
                  <FormGroup>
                    <Label for="number">사업자 등록 번호</Label>
                    <Input type="text" name="number" id="number" placeholder="ID" onChange={this.onChange} />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="file">사업자등록증 첨부</Label>
                    <Input type="file" name="file" accept="image/*" onChange={this.handleFileUpload} />
                  </FormGroup>
                </Col>
              </Row>
              <Button color="success">Submit</Button>
            </Form>
          </CardBody>
          <SearchModal modal={this.state.modal} toggle={this.toggle} selectShop={this.selectShop} />
        </Card>
      </div>
    );
  }
}
