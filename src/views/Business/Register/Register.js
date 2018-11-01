import React, { Component } from "react";

import { requestRegister, uploadPhoto } from "api/axios/business";
import SearchModal from "./SearchModal";
import RegisterModal from "./RegisterModal";

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

  toggle = e => {
    if (e) e.preventDefault();
    this.setState({ modal: !this.state.modal });
  };

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

  register = () => {
    this.toggle();
  };

  render() {
    return (
      <div className="animated fadeIn">
        <div className="registerShop">
          <form onSubmit={this.onSubmit}>
            <div className="formGroup">
              <p>상점 찾기</p>
              <div>
                <a onClick={this.toggle}>{this.state.shop || "상점 찾기"}</a>
                <button onClick={this.toggle}>검색</button>
              </div>
            </div>

            <div className="formGroup">
              <p>사장님 이름</p>
              <input type="text" name="name" id="name" placeholder="사장님 이름" onChange={this.onChange} />
            </div>
            <div className="formGroup">
              <p>사업자등록번호</p>
              <input type="text" name="number" id="number" placeholder="사업자등록번호" onChange={this.onChange} />
            </div>

            <div className="formGroup">
              <p>사업자등록증</p>
              <div className="img">
                <span>파일 선택</span>
                <input type="file" name="file" accept="image/*" onChange={this.handleFileUpload} />
              </div>
              <p className="files">{this.state.file ? "파일 업로드됨" : "선택된 파일 없음"}</p>
            </div>

            <button>신청하기</button>
          </form>

          <SearchModal modal={this.state.modal} toggle={this.toggle} selectShop={this.selectShop} register={this.register} />
          <RegisterModal />
        </div>
      </div>
    );
  }
}
