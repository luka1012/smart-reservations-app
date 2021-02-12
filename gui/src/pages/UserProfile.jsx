import React, { useState, useEffect } from "react";
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
import { useSelector } from "react-redux";

const MenuTemplate = (props) => {
  return (
    <div style={{ margin: "0 2vw" }}>
      <HeadlineWrapper
        style={{ color: "black", fontSize: "20px", margin: "2vh 1vw" }}
      >
        {props.meal.name}
      </HeadlineWrapper>
      <Item.Group divided>
        <Item>
          <Item.Image src={props.meal.predjelo1.image} />

          <Item.Content>
            <Item.Header as="a">{props.meal.predjelo1.name}</Item.Header>
            <Item.Meta>
              <span className="cinema">{props.meal.predjelo1.taste}</span>
            </Item.Meta>
            <Item.Description></Item.Description>
            <Item.Extra>
              <Button primary>See details</Button>
            </Item.Extra>
          </Item.Content>
        </Item>

        <Item>
          <Item.Image src={props.meal.predjelo2.image} />
          <Item.Content>
            <Item.Header as="a">{props.meal.predjelo2.name}</Item.Header>
            <Item.Meta>
              <span className="cinema">{props.meal.predjelo2.taste}</span>
            </Item.Meta>
            <Item.Description></Item.Description>
            <Item.Extra>
              <Button color="orange">See details</Button>
            </Item.Extra>
          </Item.Content>
        </Item>

        <Item>
          <Item.Image src={props.meal.predjelo3.image} />

          <Item.Content>
            <Item.Header as="a">{props.meal.predjelo3.name}</Item.Header>
            <Item.Meta>
              <span className="cinema">{props.meal.predjelo3.taste}</span>
            </Item.Meta>
            <Item.Description></Item.Description>
            <Item.Extra>
              <Button color="red">See details</Button>
            </Item.Extra>
          </Item.Content>
        </Item>
      </Item.Group>
    </div>
  );
};

const Menu = (props) => {
  const [showModal, setShowModal] = useState(false);

  const user = useSelector((state) => state.auth.user);

  return (
    <AppImage
      style={{
        backgroundImage: "none",
      }}
    >
      <HomeWrapper style={{ height: "100vh" }}>
        <Navigation />
        <Headline>My profile</Headline>
        {user !== undefined && (
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ padding: "50px", margin: "0 30px" }}>
              <Image
                src={user.profile}
                size="mini"
                avatar
                style={{ width: "80px", height: "80px", margin: "15px 20px" }}
              />
              <div>
                <StyledProfileLabel>
                  <Icon name="user" />
                  Username
                </StyledProfileLabel>
                <StyledProfileLabel
                  style={{ fontWeight: "100", fontSize: "14px" }}
                >
                  {user.username}
                </StyledProfileLabel>
              </div>
              <div>
                <StyledProfileLabel>
                  <Icon name="user" />
                  Firstname
                </StyledProfileLabel>
                <StyledProfileLabel
                  style={{ fontWeight: "100", fontSize: "14px" }}
                >
                  {user.firstname}
                </StyledProfileLabel>
              </div>
              <div>
                <StyledProfileLabel>
                  <Icon name="user" />
                  Lastname
                </StyledProfileLabel>
                <StyledProfileLabel
                  style={{ fontWeight: "100", fontSize: "14px" }}
                >
                  {user.lastname}
                </StyledProfileLabel>
              </div>
              <div>
                <StyledProfileLabel>
                  <Icon name="at" />
                  Email
                </StyledProfileLabel>
                <StyledProfileLabel
                  style={{ fontWeight: "100", fontSize: "14px" }}
                >
                  {user.email}
                </StyledProfileLabel>
              </div>
            </div>
            <Message
              color="blue"
              style={{
                width: "25vw",
                height: "15vh",
                marginLeft: "10vw",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Message.Header>Info</Message.Header>
              <p
                style={{
                  fontSize: "15px",
                  marginTop: "10px",
                  color: "#253858",
                }}
              >
                This page shows your profile info. You can if you want change
                that in Update profile section
              </p>
              <Button
                style={{ margin: "0 auto" }}
                color="blue"
                onClick={() => history.push("/updateProfile")}
              >
                Update
              </Button>
            </Message>
          </div>
        )}
        <div
          style={{
            boxShadow: "0px 7px 13px 5px rgba(0, 0, 0, 0.17)",
            marginTop: "10vh",
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
