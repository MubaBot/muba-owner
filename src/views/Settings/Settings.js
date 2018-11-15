import React, { Component } from "react";

import { AuthApi } from "api";

export default class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      EMAIL: "",
      PHONE: "",
      USERNAME: "",
      password: "",
      oldPassword: "",
      rePassword: ""
    };
  }

  updateUserInfo = () =>
    AuthApi.getOwnerInfo()
      .then(info => this.setState(info))
      .catch(() => this.props.history.push("/login"));
      
  componentDidMount = () => this.updateUserInfo();

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();

    if (this.state.USERNAME === "") return alert("이름을 입력해주세요.");
    if (this.state.EMAIL === "") return alert("이메일을 입력해주세요.");
    if (this.state.PHONE === "") return alert("전화번호를 입력해주세요.");
    if (this.state.oldPassword !== "" && this.state.password === "") return alert("새로운 비밀번호를 입력해주세요.");
    if (this.state.password !== this.state.rePassword) return alert("비밀번호가 일치하지 않습니다.");

    AuthApi.updateUserInfo({
      name: this.state.USERNAME,
      email: this.state.EMAIL,
      phone: this.state.PHONE,
      password: this.state.oldPassword,
      newpassword: this.state.password
    })
      .then(() => {
        alert("변경되었습니다.");
        window.location.reload();
      })
      .catch(err => {
        if (!err.response || !err.response.data || !err.response.data.success) return alert("죄송합니다. 잠시후 다시 시도해주세요.");
        switch (err.response.data.success) {
          case -1:
            return alert("새로운 비밀번호를 입력해주세요.");
          case -2:
            return alert("이전 비밀번호가 일치하지 않습니다.");

          default:
            return alert("죄송합니다. 잠시후 다시 시도해주세요.");
        }
      });
  };

  render() {
    return (
      <div className="animated fadeIn">
        <div className="registerService">
          <form onSubmit={this.onSubmit}>
            <div>
              <div className="formGroup">
                <p>이름</p>
                <input type="text" name="USERNAME" placeholder="이름" value={this.state.USERNAME} onChange={this.onChange} />
              </div>

              <div className="formGroup">
                <p>이메일</p>
                <input type="text" name="EMAIL" placeholder="이메일" value={this.state.EMAIL} onChange={this.onChange} />
              </div>

              <div className="formGroup">
                <p>전화번호</p>
                <input type="text" name="PHONE" placeholder="전화번호" value={this.state.PHONE} onChange={this.onChange} />
              </div>
            </div>
            <div>
              <div className="formGroup">
                <p>이전 비밀번호</p>
                <input type="password" name="oldPassword" placeholder="변경시 입력" value={this.state.oldPassword} onChange={this.onChange} />
              </div>

              <div className="formGroup">
                <p>비밀번호</p>
                <input type="password" name="password" placeholder="변경시 입력" value={this.state.password} onChange={this.onChange} />
              </div>

              <div className="formGroup">
                <p>비밀번호 확인</p>
                <input type="password" name="rePassword" placeholder="변경시 입력" value={this.state.rePassword} onChange={this.onChange} />
              </div>
            </div>
            <button onClick={this.onSubmit}>수정하기</button>
          </form>
        </div>
      </div>
    );
  }
}
