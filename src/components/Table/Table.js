import React, { Component } from "react";

export default class Table extends Component {
  render() {
    return <table className="muba-table">{this.props.children}</table>;
  }
}
