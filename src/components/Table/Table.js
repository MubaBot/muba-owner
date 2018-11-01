import React, { Component } from "react";

export default class Table extends Component {
  render() {
    return (
      <div className="muba-table">
        <table>{this.props.children}</table>
      </div>
    );
  }
}
