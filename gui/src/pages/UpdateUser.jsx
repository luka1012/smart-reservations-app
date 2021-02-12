import React, { useState } from "react";
import PropTypes from "prop-types";
import Navigation from "../components/Navigation";
import {
  HomeWrapper,
  RestaurantWrapper,
  ReviewNameWrapper,
  AppImage,
  HeadlineWrapper,
  StyledText,
  Headline,
  StyledProfileLabel,
} from "../util/RestaurantStyledComponents";
import {
  Divider,
  Header,
  Icon,
  Image,
  Label,
  Button,
  Card,
  Placeholder,
  Item,
  Message,
} from "semantic-ui-react";
import Modal from "../components/Modal";
import Logo from "../assets/images/logo.png";
import history from "../history";
import UpdateUserProfile from "../components/UpdateProfilePage";

const Menu = (props) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <AppImage
      style={{
        backgroundImage: "none",
      }}
    >
      <HomeWrapper style={{ height: "100vh" }}>
        <Navigation />
        <UpdateUserProfile />
        <div
          style={{
            boxShadow: "0px 7px 13px 5px rgba(0, 0, 0, 0.17)",
            marginTop: "21vh",
            height: "5vh",
            width: "70vw",
            display: "flex",
          }}
        >
          <div style={{ margin: "auto auto" }}>
            <Image avatar src={Logo} /> Smart Reservation App ltd.
          </div>
        </div>
      </HomeWrapper>
    </AppImage>
  );
};

export default Menu;
