import React from "react";
import PropTypes from "prop-types";
import { Router, Switch, Route, withRouter } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";
import history from "../history";
import Home from "./Home";
import Restaurants from "./Restaurants";
import { IntlProvider } from "react-intl";
import Menu from "../pages/Menu";
import ManageUsers from "../pages/ManageUsers";
import ManageRestaurants from "../pages/ManageRestaurants";
import UserProfile from "../pages/UserProfile";
import UpdateUserProfile from "../pages/UpdateUser";
import MyRestaurants from "../pages/MyRestaurants"

const App = (props) => {
  return (
    <ToastProvider autoDismiss autoDismissTimeout={5000}>
      <IntlProvider>
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/restaurants" exact component={Restaurants} />
            <Route path="/restaurants/menu" exact component={Menu} />
            <Route path="/manageUsers" exact component={ManageUsers} />
            <Route
              path="/manageRestaurants"
              exact
              component={ManageRestaurants}
            />
            <Route path="/myProfile" exact component={UserProfile} />
            <Route path="/updateProfile" exact component={UpdateUserProfile} />
            <Route path="/myRestaurants" exact component={MyRestaurants} />
          </Switch>
        </Router>
      </IntlProvider>
    </ToastProvider>
  );
};

export default App;
