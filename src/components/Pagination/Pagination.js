import React, { Component } from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { isEqual } from "lodash";

const pageCount = 3;

export default class TablePagination extends Component {
  constructor(props) {
    super(props);

    this.state = {
      start: 1,
      end: 1,
      items: [],
      page: props.page,
      update: true,
      display: props.display
    };
  }

  componentWillReceiveProps = props => {
    const start = props.page - pageCount < 1 ? 1 : props.page - pageCount;
    const end = props.page + pageCount > Math.ceil(props.count / props.display) ? Math.ceil(props.count / props.display) : props.page + pageCount;
    const update = this.state.start !== start || this.state.end !== end || props.page !== this.state.page;

    this.setState({
      start: start,
      end: end,
      update: update,
      display: props.display,
      page: props.page
    });

    this.forceUpdate();
  };

  componentDidUpdate = () => {
    var items = [];
    for (let i = this.state.start; i <= this.state.end; i++) items.push(i);

    this.setState({
      items: items,
      update: !isEqual(items, this.state.items)
    });
  };

  shouldComponentUpdate = (props, state) => state.update;

  onClick = page => {
    this.setState({ update: true });

    this.props.onChangePage(page);
  };

  render() {
    return (
      <Pagination>
        <PaginationItem disabled={this.state.page === 1}>
          <PaginationLink previous onClick={() => this.onClick(this.state.page - 1)} />
        </PaginationItem>

        {this.state.items.map((x, i) => (
          <PaginationItem key={x} active={x === this.state.page}>
            <PaginationLink tag="button" onClick={() => this.onClick(x)}>
              {x}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem disabled={this.state.page === this.state.end}>
          <PaginationLink next onClick={() => this.onClick(this.state.page + 1)} />
        </PaginationItem>
      </Pagination>
    );
  }
}
