import React, { Component } from "react";
import { AppHeaderDropdown } from "@coreui/react";
import { Route, matchPath } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, DropdownItem, DropdownMenu, DropdownToggle, Nav } from "reactstrap";
import PropTypes from "prop-types";
import classNames from "classnames";

import More from "assets/img/layouts/w-admin-select.svg";

import SVG from "react-inlinesvg";

import { AuthApi } from "api";
let routes;
var titleRouteName = "";

const getPaths = pathname => {
  const paths = ["/"];

  if (pathname === "/") return paths;

  pathname.split("/").reduce((prev, curr) => {
    const currPath = `${prev}/${curr}`;
    paths.push(currPath);
    return currPath;
  });
  return paths;
};

const findRouteName = url => {
  const aroute = routes.find(route => matchPath(url, { path: route.path, exact: route.exact }));
  return aroute && aroute.name ? aroute.name : null;
};

const BreadcrumbsItem = ({ match }) => {
  const routeName = findRouteName(match.url);
  if (routeName) {
    if (match.isExact) titleRouteName = routeName;
    return <BreadcrumbItem>{routeName}</BreadcrumbItem>;
  }
  return null;
};

BreadcrumbsItem.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string
  })
};

const Breadcrumbs = args => {
  const paths = getPaths(args.location.pathname);
  const items = paths.map((path, i) => <Route key={i.toString()} path={path} component={BreadcrumbsItem} />);
  return <Breadcrumb>{items}</Breadcrumb>;
};

const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  appRoutes: PropTypes.any,
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
};

const defaultProps = {
  tag: "div",
  className: "",
  appRoutes: [{ path: "/", exact: true, name: "Home", component: null }]
};

class AppBreadcrumb extends Component {
  constructor(props) {
    super(props);

    this.state = { routes: props.appRoutes, titleRouteName: "" };
    routes = this.state.routes;
  }

  componentWillReceiveProps = nextProps => setTimeout(() => this.forceUpdate(), 5);
  componentDidMount = () => this.forceUpdate();

  Logout = () => {
    AuthApi.removeAuthentication();
    this.props.history.push("/login");
  };

  Setting = () => {
    this.props.history.push("/setting");
  };

  render() {
    const { className, tag: Tag, ...attributes } = this.props;

    delete attributes.children;
    delete attributes.appRoutes;

    const classes = classNames(className, "breadcrumb-wrap");

    return (
      <React.Fragment>
        <Tag className={classes}>
          <Route path="/:path" component={Breadcrumbs} {...attributes} />

          <Nav className="ml-auto" navbar>
            <AppHeaderDropdown direction="down">
              <DropdownToggle nav>
                <img src={"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"} className="img-avatar" alt="admin@bootstrapmaster.com" />
                <span className={classNames("admin-name")}>{this.props.name}</span>
                <SVG src={More} />
              </DropdownToggle>
              <DropdownMenu right style={{ right: "auto" }}>
                <DropdownItem onClick={this.Setting}>설정</DropdownItem>
                <DropdownItem onClick={this.Logout}>로그아웃</DropdownItem>
              </DropdownMenu>
            </AppHeaderDropdown>
          </Nav>
        </Tag>
        <h1 className={classNames("route-name")}>{titleRouteName}</h1>
      </React.Fragment>
    );
  }
}

AppBreadcrumb.propTypes = propTypes;
AppBreadcrumb.defaultProps = defaultProps;

export default AppBreadcrumb;
