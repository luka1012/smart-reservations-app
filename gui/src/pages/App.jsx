import React from "react";
import PropTypes from "prop-types";
import { Router, Switch, Route } from "react-router-dom";
import history from "../history";
import Home from "./Home";
import Restaurants from "./Restaurants";
import { IntlProvider } from "react-intl";
import Menu from "../pages/Menu";

const App = (props) => {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/restaurants" exact component={Restaurants} />
        <Route path="/restaurants/menu" exact component={Menu} />
      </Switch>
    </Router>
  );
};

export default App;
