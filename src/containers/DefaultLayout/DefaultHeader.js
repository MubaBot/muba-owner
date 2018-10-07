import React, { Component } from "react";
import { DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink } from "reactstrap";
import PropTypes from "prop-types";

import { AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from "@coreui/react";
import { setAuth } from "api/axios";

const propTypes = {
  children: PropTypes.node
};

const defaultProps = {};

class DefaultHeader extends Component {
  Logout = () => {
    setAuth("null");
    this.props.history.push("/login");
  };

  render() {
    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand full={{ src: "", width: 89, height: 25, alt: "Muba Owner" }} minimized={{ src: "", width: 30, height: 30, alt: "Muba Logo" }} />
        <AppSidebarToggler className="d-md-down-none" display="lg" />

        <Nav className="d-md-down-none" navbar>
          <NavItem className="px-3">
            <NavLink href="/">Dashboard</NavLink>
          </NavItem>
        </Nav>
        <Nav className="ml-auto" navbar>
          <AppHeaderDropdown direction="down">
            <DropdownToggle nav>
              <img src={"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"} className="img-avatar" alt="admin@bootstrapmaster.com" />
            </DropdownToggle>
            <DropdownMenu right style={{ right: "auto" }}>
              <DropdownItem header tag="div" className="text-center">
                <strong>Account</strong>
              </DropdownItem>
              <DropdownItem onClick={this.Logout}>
                <i className="fa fa-lock" /> Logout
              </DropdownItem>
            </DropdownMenu>
          </AppHeaderDropdown>
        </Nav>
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
