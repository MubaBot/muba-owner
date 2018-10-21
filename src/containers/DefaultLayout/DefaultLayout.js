import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";

import {
  AppAside,
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav
} from "@coreui/react";
// sidebar nav config
import navigation from "../../_nav";
// routes config
import routes from "../../routes";
import DefaultAside from "./DefaultAside";
import DefaultFooter from "./DefaultFooter";
import DefaultHeader from "./DefaultHeader";

import { checkLogin } from "api/axios/auth";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { ShopApi, AuthApi } from "api";
import Push from "push.js";

class DefaultLayout extends Component {
  constructor(props) {
    super(props);

    checkLogin().then(async data => {
      if (data.isLogin === false) this.props.history.push("/login");
      else {
        // await AuthApi.setAuthentication(data.token);

        var client = new W3CWebSocket("ws://192.168.0.8:3050/", "order");

        client.onerror = () => console.log("Connection Error");
        client.onclose = () => console.log("Push Socket Closed");

        client.onopen = async function() {
          if (client.readyState === client.OPEN) {
            client.send(JSON.stringify({ user: await AuthApi.getAuthentication(), shop: await ShopApi.getSelectedBusinessShop() }));
          }
        };

        // push event
        client.onmessage = function(e) {
          if (typeof e.data === "string") {
            const orders = JSON.parse(e.data);
            console.log(orders);
            Push.create(JSON.stringify(orders));
          }
        };
      }
    });
  }
  render() {
    return (
      <div className="app">
        <AppHeader fixed>
          <DefaultHeader {...this.props} />
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <AppSidebarNav navConfig={navigation} {...this.props} />
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            <AppBreadcrumb appRoutes={routes} />
            <Container fluid>
              <Switch>
                {routes.map((route, idx) => {
                  return route.component ? (
                    <Route key={idx} path={route.path} exact={route.exact} name={route.name} render={props => <route.component {...props} />} />
                  ) : null;
                })}
                <Redirect from="/" to="/dashboard" />
              </Switch>
            </Container>
          </main>
          <AppAside fixed hidden>
            <DefaultAside />
          </AppAside>
        </div>
        <AppFooter>
          <DefaultFooter />
        </AppFooter>
      </div>
    );
  }
}

export default DefaultLayout;
