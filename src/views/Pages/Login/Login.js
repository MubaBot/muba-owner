import React, { Component } from "react";
import { Link } from "react-router-dom";

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
      .catch(e => alert("계정 정보를 확인해 주세요."));
  };

  render() {
    return (
      <div className="app flex-row align-items-center login">
        <div>
          <h3>로그인</h3>
          <form onSubmit={this.onSubmit}>
            <input autoFocus required name="id" type="text" placeholder="아이디 또는 이메일" onChange={this.onChange} />
            <input name="password" type="password" placeholder="비밀번호" onChange={this.onChange} />

            <button>로그인</button>
            <Link to="register">Register</Link>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
