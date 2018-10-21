import React, { Component } from "react";
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Alert, NavLink } from "reactstrap";
import { login, checkLogin } from "api/axios/auth";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { visible: false, alert: "" };

    checkLogin().then(data => {
      if (data.isLogin === true) this.props.history.push("/dashboard");
    });
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });
  onDismiss = () => this.setState({ visible: false });

  onSubmit = e => {
    e.preventDefault();

    login({
      id: "O|L|" + this.state.id,
      password: this.state.password
    })
      .then(result => this.props.history.push("/dashboard"))
      .catch(e => this.setState({ visible: true, alert: "계정 정보를 확인해 주세요." }));
  };

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
                      {this.state.alert}
                    </Alert>
                    <Form onSubmit={this.onSubmit}>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input autoFocus required name="id" type="text" placeholder="Username" autoComplete="username" onChange={this.onChange} />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input required name="password" type="password" placeholder="Password" autoComplete="current-password" onChange={this.onChange} />
                      </InputGroup>
                      <Row>
                        <Col xs="4">
                          <Button color="primary" className="px-4">
                            Login
                          </Button>
                        </Col>
                        <Col xs="4">
                          <Button color="success" className="px-4">
                            <NavLink href="#/register">Register</NavLink>
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white bg-info py-5 d-md-down-none" style={{ width: 44 + "%" }}>
                  <CardBody className="d-flex align-items-center justify-content-center text-center">
                    <div>
                      <h2>SNS</h2>
                      <p>SNS계정을 이용하여 로그인합니다.</p>
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

export default Login;
