import React, { Component } from "react";
import { Row, Col, InputGroup, InputGroupAddon, InputGroupText, Input, Button } from "reactstrap";

export default class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = { map: null, marker: null, name: "" };
  }

  componentDidMount() {
    var container = document.getElementById("map");
    var options = {
      center: new window.daum.maps.LatLng(this.props.shop_address.ADDRLAT, this.props.shop_address.ADDRLNG),
      level: 3
    };

    var map = new window.daum.maps.Map(container, options);

    var marker = new window.daum.maps.Marker({
      position: map.getCenter()
    });
    marker.setMap(map);

    map.relayout();

    this.setState({ map: map, marker: marker });
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  componentWillReceiveProps = nextProps => {
    const moveLatLon = new window.daum.maps.LatLng(nextProps.shop_address.ADDRLAT, nextProps.shop_address.ADDRLNG);
    this.state.marker.setPosition(moveLatLon);
    this.state.map.panTo(moveLatLon);

    this.state.map.relayout();
  };

  render() {
    const addr = typeof this.props.shop_address.ADDRESS === "string" ? JSON.parse(this.props.shop_address.ADDRESS) : this.props.shop_address.ADDRESS;
    console.log(addr);

    const address = [addr.state, addr.city, addr.address1, addr.options].join(" ");
    return (
      <Row>
        <Col xs="8">
          {/* <p>{JSON.stringify(this.props)}</p> */}
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>이름</InputGroupText>
            </InputGroupAddon>
            <Input type="text" name="name" placeholder="이름" value={this.props.SHOPNAME} onChange={this.onChange} />
          </InputGroup>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>주소</InputGroupText>
            </InputGroupAddon>
            <Input type="text" name="name" placeholder="이름" value={address} onChange={this.onChange} />
          </InputGroup>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>전화번호</InputGroupText>
            </InputGroupAddon>
            <Input type="text" name="name" placeholder="이름" value={this.props.PHONE} onChange={this.onChange} />
          </InputGroup>
          {/* <p>{JSON.stringify(this.props.shop_address)}</p> */}
          {/* <p>{JSON.stringify(this.props.PHONE)}</p> */}
          <Button>적용</Button>
        </Col>
        <Col xs="4">
          <div id="map" style={{ height: 300 }} />
        </Col>
      </Row>
    );
  }
}
