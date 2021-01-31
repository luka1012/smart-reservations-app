import React from "react";
import PropTypes from "prop-types";
import {
  Navigation as Nav,
  NavigationItemWrapper,
} from "../RestaurantStyledComponents";
import { Icon, Image } from "semantic-ui-react";
import history from "../history";
import Logo from "../assets/images/logo.png";

const Navigation = (props) => {
  return (
    <Nav>
      <NavigationItemWrapper style={{ cursor: "default" }}>
        <Image src={Logo} avatar />
        Smart Reservation App
      </NavigationItemWrapper>
      <NavigationItemWrapper onClick={() => history.push("/")}>
        <Icon name="home" /> Home
      </NavigationItemWrapper>
      <NavigationItemWrapper onClick={() => history.push("/restaurants")}>
        <Icon name="tablet alternate" color="white" />
        Restaurants
      </NavigationItemWrapper>
      <NavigationItemWrapper onClick={() => history.push("/info")}>
        <Icon name="info" />
        Info
      </NavigationItemWrapper>
    </Nav>
  );
};

export default Navigation;
