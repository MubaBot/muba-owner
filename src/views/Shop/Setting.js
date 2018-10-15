import React, { Component } from "react";
import { Row, Col } from "reactstrap";

export default class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = { map: null, marker: null };
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

  componentWillReceiveProps = nextProps => {
    const moveLatLon = new window.daum.maps.LatLng(nextProps.shop_address.ADDRLAT, nextProps.shop_address.ADDRLNG);
    this.state.marker.setPosition(moveLatLon);
    this.state.map.panTo(moveLatLon);

    this.state.map.relayout();
  };

  render() {
    return (
      <Row>
        <Col xs="8">
          <p>{JSON.stringify(this.props)}</p>
          <p>{JSON.stringify(this.props.shop_address)}</p>
          <p>{JSON.stringify(this.props.PHONE)}</p>
        </Col>
        <Col xs="4">
          <div id="map" style={{ height: 500 }} />
        </Col>
      </Row>
    );
  }
}
