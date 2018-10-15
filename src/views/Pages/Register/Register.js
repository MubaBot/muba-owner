import React, { Component } from "react";
import { Button, CardGroup, Card, CardBody, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Alert } from "reactstrap";
import { register } from "api/axios/auth";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = { visible: false, alert: "" };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onDismiss = () => {
    this.setState({ visible: false });
  };

  onSubmit = e => {
    e.preventDefault();
    register(this.state)
      .then(result => {
        this.props.history.push("/login");
      })
      .catch(e => {
        const code = e.response.data.success;
        switch (code) {
          case -1:
            return this.setState({ visible: true, alert: "아이디를 입력해 주세요." });
          case -2:
            return this.setState({ visible: true, alert: "이름을 입력해 주세요." });
          case -3:
            return this.setState({ visible: true, alert: "이메일을 입력해 주세요." });
          case -4:
            return this.setState({ visible: true, alert: "비밀번호를 입력해 주세요." });
          case -5:
            return this.setState({ visible: true, alert: "비밀번호가 일치하지 않습니다." });
          case -6:
            return this.setState({ visible: true, alert: "이미 존재하는 계정입니다." });
          default:
            return this.setState({ visible: true, alert: "죄송합니다. 잠시 후 다시 시도해 주세요." });
        }
      });
  };

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="10">
              <CardGroup>
                <Card className="p-4">
                  <CardBody className="p-4">
                    <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
                      {this.state.alert}
                    </Alert>
                    <Form onSubmit={this.onSubmit}>
                      <h1>Register</h1>
                      <p className="text-muted">Create your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input autoFocus required name="id" type="text" placeholder="ID" autoComplete="id" onChange={this.onChange} />
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input required name="username" type="text" placeholder="Username" autoComplete="username" onChange={this.onChange} />
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>@</InputGroupText>
                        </InputGroupAddon>
                        <Input required name="email" type="email" placeholder="Email" autoComplete="email" onChange={this.onChange} />
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>@</InputGroupText>
                        </InputGroupAddon>
                        <Input name="phone" type="phone" placeholder="phone" autoComplete="phone" onChange={this.onChange} />
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input required name="password" type="password" placeholder="Password" autoComplete="new-password" onChange={this.onChange} />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input required name="repassword" type="password" placeholder="Repeat password" autoComplete="new-password" onChange={this.onChange} />
                      </InputGroup>
                      <Button type="submit" color="success" block>
                        Create Account
                      </Button>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white bg-info py-5 d-md-down-none" style={{ width: 44 + "%" }}>
                  <CardBody className="d-flex align-items-center justify-content-center text-center">
                    <div>
                      <h2>SNS</h2>
                      <p>SNS계정을 이용하여 가입합니다.</p>
                      <Button color="danger" className="mt-3" active>
                        Google
                      </Button>{" "}
                      <Button color="primary" className="mt-3" active>
                        Facebook
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Register;
