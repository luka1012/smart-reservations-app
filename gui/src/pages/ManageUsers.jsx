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
import NewUser from "../components/NewUser";
import UpdateUsers from "../components/UpdateUsers";
import { Icon } from "semantic-ui-react";

const Manage = (props) => {
  const [show, setShow] = useState(false);
  const [showPage, setShowPage] = useState("newUser");
  const [selected, setSelected] = useState("newUser");

  return (
    <HomeWrapper>
      <Navigation />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Headline style={{ width: "15vw", height: "2vh" }}>
          Manage Users
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
              <Icon name="user plus" color="blue" size="large" /> New user
            </WidgetItem>
            <WidgetItem
              className={selected === "updateUser" ? "user-item" : ""}
              onClick={() => {
                setShowPage("updateUsers");
                setSelected("updateUser");
              }}
            >
              <Icon name="users" color="blue" size="large" /> Update users
            </WidgetItem>
          </SideWidgetMenu>
          {showPage === "newUser" ? (
            <NewUser />
          ) : showPage === "updateUsers" ? (
            <UpdateUsers />
          ) : (
            <div>Invalid</div>
          )}
        </ComponentWidget>
      </div>
    </HomeWrapper>
  );
};

export default Manage;
