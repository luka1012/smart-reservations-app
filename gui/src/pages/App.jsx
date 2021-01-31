import React from "react";
import PropTypes from "prop-types";
import { Router, Switch, Route, withRouter } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";
import history from "../history";
import Home from "./Home";
import Restaurants from "./Restaurants";
import { IntlProvider } from "react-intl";
import Menu from "../pages/Menu";
import Manage from "../pages/Manage";

const App = (props) => {
  return (
    <ToastProvider autoDismiss autoDismissTimeout={5000}>
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/restaurants" exact component={Restaurants} />
          <Route path="/restaurants/menu" exact component={Menu} />
          <Route path="/manage" exact component={Manage} />
        </Switch>
      </Router>
    </ToastProvider>
  );
};

export default App;
