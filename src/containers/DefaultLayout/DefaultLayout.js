import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";

import {
  AppAside,
  // AppBreadcrumb,
  // AppFooter,
  // AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader
  // AppSidebarMinimizer
  // AppSidebarNav
} from "@coreui/react";

import AppSidebarNav from "./AppComponents/SidebarNav";
import AppBreadcrumb from "./AppComponents/Breadcrumb";

// sidebar nav config
import navigation from "../../_nav";
// routes config
import routes from "../../routes";
import DefaultAside from "./DefaultAside";
// import DefaultFooter from "./DefaultFooter";
// import DefaultHeader from "./DefaultHeader";

import { w3cwebsocket as W3CWebSocket } from "websocket";
import { ShopApi, AuthApi } from "api";
import Push from "push.js";

class DefaultLayout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: ""
    };

    AuthApi.checkLogin().then(async data => {
      if (data.isLogin === false) this.props.history.push("/login");
      else {
        this.setState({ name: data.name });
        await AuthApi.setAuthentication(data.token);

        var client = new W3CWebSocket("wss://push.mubabot.com/", "order");

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

            let sum = 0;
            for (var i in orders.order_menus) sum += orders.order_menus[i].COUNT;

            Push.create("Muba 주문 알림", {
              body: [orders.ADDRESS, sum + "개 주문"].join("\n"),
              icon: "/icon.png",
              timeout: 4000,
              link: "https://owner.mubabot.com/#/order/list",
              onClick: function() {
                window.focus();
                window.location.reload();
                this.close();
              }
            });
          }
        };
      }
    });
  }
  render() {
    return (
      <div className="app">
        {/* <AppHeader fixed>
          <DefaultHeader {...this.props} />
        </AppHeader> */}
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <AppSidebarNav navConfig={navigation} {...this.props} />
            <AppSidebarFooter />
            {/* <AppSidebarMinimizer /> */}
          </AppSidebar>
          <main className="main">
            <AppBreadcrumb appRoutes={routes} history={this.props.history} name={this.state.name} />
            <Container fluid>
              <Switch>
                {routes.map((route, idx) => {
                  return route.component ? (
                    <Route key={idx} path={route.path} exact={route.exact} name={route.name} render={props => <route.component {...props} />} />
                  ) : null;
                })}
                <Redirect from="/" to="/business/list" />
              </Switch>
            </Container>
          </main>
          <AppAside fixed hidden>
            <DefaultAside />
          </AppAside>
        </div>
        {/* <AppFooter>
          <DefaultFooter />
        </AppFooter> */}
      </div>
    );
  }
}

export default DefaultLayout;
