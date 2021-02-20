import React, { useState } from "react";
import PropTypes from "prop-types";
import Navigation from "../components/Navigation";
import {
  HomeWrapper,
  ComponentWidget,
  SideWidgetMenu,
  WidgetItem,
  Headline,
} from "../util/RestaurantStyledComponents";
import NewRestaurant from "../components/NewRestaurant";
import UpdateRestaurants from "../components/UpdateRestaurants";
import RestaurantMenu from "../components/RestaurantMenu";
import { Icon } from "semantic-ui-react";

const Manage = (props) => {
  const [show, setShow] = useState(false);
  const [showPage, setShowPage] = useState("newUser");
  const [selected, setSelected] = useState("newUser");

  return (
    <HomeWrapper>
      <Navigation />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Headline style={{ width: "25vw", height: "2vh" }}>
          Manage Restaurants
        </Headline>
        <ComponentWidget style={{ flexDirection: "row", width: "60vw" }}>
          <SideWidgetMenu>
            <div style={{ marginTop: "5vh", backgroundColor: "#fcfcfc" }}></div>
            <WidgetItem
              className={selected === "newUser" ? "user-item" : ""}
              onClick={() => {
                setShowPage("newUser");
                setSelected("newUser");
              }}
            >
              <Icon name="plus" color="blue" size="large" /> New
            </WidgetItem>
            <WidgetItem
              className={selected === "updateUser" ? "user-item" : ""}
              onClick={() => {
                setShowPage("updateUsers");
                setSelected("updateUser");
              }}
            >
              <Icon name="sitemap" color="blue" size="large" /> Update
            </WidgetItem>
          </SideWidgetMenu>
          {showPage === "newUser" ? (
            <NewRestaurant />
          ) : showPage === "updateUsers" ? (
            <UpdateRestaurants />
          ) : showPage === "menus" ? (
            <RestaurantMenu />
          ) : (
            <div>Invalid</div>
          )}
        </ComponentWidget>
      </div>
    </HomeWrapper>
  );
};

export default Manage;
