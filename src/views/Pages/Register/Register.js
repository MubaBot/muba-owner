import React, { Component } from "react";
import { Link } from "react-router-dom";

import { register } from "api/axios/auth";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = { visible: false };
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });
  onDismiss = () => this.setState({ visible: false });

  onSubmit = e => {
    e.preventDefault();
    register(this.state)
      .then(result => this.props.history.push("/login"))
      .catch(e => {
        const code = e.response.data.success;

        switch (code) {
          case -1:
            return alert("아이디를 입력해 주세요.");
          case -2:
            return alert("이름을 입력해 주세요.");
          case -3:
            return alert("이메일을 입력해 주세요.");
          case -4:
            return alert("비밀번호를 입력해 주세요.");
          case -5:
            return alert("비밀번호가 일치하지 않습니다.");
          case -6:
            return alert("이미 존재하는 계정입니다.");
          default:
            return alert("죄송합니다. 잠시 후 다시 시도해 주세요.");
        }
      });
  };

  render() {
    return (
      <div className="app flex-row align-items-center login">
        <div>
          <h3>회원가입</h3>
          <form onSubmit={this.onSubmit}>
            <input autoFocus required name="id" type="text" placeholder="아이디" autoComplete="id" onChange={this.onChange} />
            <input required name="username" type="text" placeholder="이름" autoComplete="username" onChange={this.onChange} />
            <input required name="email" type="email" placeholder="이메일" autoComplete="email" onChange={this.onChange} />
            <input required name="phone" type="phone" placeholder="전화번호" autoComplete="phone" onChange={this.onChange} />
            <input required name="password" type="password" placeholder="비밀번호" autoComplete="new-password" onChange={this.onChange} />
            <input required name="repassword" type="password" placeholder="비밀번호 확인" autoComplete="new-password" onChange={this.onChange} />

            <button>회원가입</button>
            <Link to="login">로그인</Link>
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
