import React, { useState } from "react";
import PropTypes from "prop-types";
import Navigation from "../components/Navigation";
import {
  HomeWrapper,
  RestaurantWrapper,
  ReviewNameWrapper,
  AppImage,
} from "../RestaurantStyledComponents";
import {
  Divider,
  Header,
  Icon,
  Image,
  Label,
  Button,
  Card,
  Placeholder,
} from "semantic-ui-react";
import Modal from "../components/Modal";
import Logo from "../assets/images/logo.png";

const images = [
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  "https://images.unsplash.com/photo-1552566626-52f8b828add9?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80",
  "https://images.unsplash.com/photo-1571705042748-55feda1cfadc?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80",
];

const restaurants = [
  {
    image:
      "https://images.unsplash.com/photo-1599451877948-273609d3c7e2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    name: "Restaurant 1",
    address: "Address 1",
    current: 5,
  },
  {
    image:
      "https://images.unsplash.com/photo-1599451877948-273609d3c7e2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    name: "Restaurant 2",
    address: "Address 2",
    current: 5,
  },
  {
    image:
      "https://images.unsplash.com/photo-1599451877948-273609d3c7e2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    name: "Restaurant 3",
    address: "Address 3",
    current: 5,
  },
  {
    image:
      "https://images.unsplash.com/photo-1599451877948-273609d3c7e2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    name: "Restaurant4",
    address: "Address4",
    current: 5,
  },
  {
    image:
      "https://images.unsplash.com/photo-1599451877948-273609d3c7e2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    name: "Restaurant 5",
    address: "Address 5",
    current: 5,
  },
];

const Restaurants = (props) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <AppImage
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1600331350693-a56b297f6f19?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80')",
      }}
    >
      <HomeWrapper>
        <Navigation />
        <div style={{ display: "flex", flexDirection: "column" }}>
          {restaurants.map((restaurant) => (
            <RestaurantWrapper>
              <div
                style={{
                  height: "15vh",
                  width: "47vw",
                  margin: "2vh auto",
                  display: "flex",
                  flexDirection: "row",
                  padding: 5,
                }}
              >
                <Image size="small" src={`${restaurant.image}`} />
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <ReviewNameWrapper>
                    <Icon name="info circle" size="large" /> {restaurant.name}
                  </ReviewNameWrapper>{" "}
                  <ReviewNameWrapper>
                    <Icon name="address book" size="large" />{" "}
                    {restaurant.address}
                  </ReviewNameWrapper>
                  <ReviewNameWrapper>
                    <Label color="green" size="large" basic>
                      Open
                    </Label>
                  </ReviewNameWrapper>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Button
                    color="orange"
                    style={{ margin: "2vh 0" }}
                    basic
                    onClick={() => setShowModal(true)}
                  >
                    <Icon name="book" />
                    Book
                  </Button>
                  <Button color="blue" basic>
                    <Icon name="zoom" /> See menu
                  </Button>
                </div>
                <div>
                  <div style={{ margin: "5vh 2vw" }}>
                    <div style={{ fontFamily: "'Arvo', serif" }}>
                      <Icon name="map" color="green" /> {restaurant.current}{" "}
                      currently open
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Icon
                    name="facebook square"
                    color="facebook"
                    size="big"
                    style={{ margin: "1vh 1vw" }}
                  />
                  <Icon
                    name="twitter"
                    color="blue"
                    size="big"
                    style={{ margin: "1vh 1vw" }}
                  />
                  <Icon
                    name="instagram"
                    color="red"
                    size="big"
                    style={{ margin: "1vh 1vw" }}
                  />
                </div>
              </div>
              <Divider horizontal style={{ margin: "0 auto", width: "50vw" }}>
                <Header as="h4">
                  <Icon name="image" color="blue" />
                  Images
                </Header>
              </Divider>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  margin: "0 auto",
                }}
              >
                {images.map((image) => (
                  <Image
                    style={{
                      width: "10vw",
                      height: "15vh",
                      margin: "1.5vh auto",
                      paddingTop: "5px",
                    }}
                    src={`${image}`}
                  />
                ))}
              </div>
            </RestaurantWrapper>
          ))}
        </div>
        <div
          style={{
            boxShadow: "0px 7px 13px 5px rgba(0, 0, 0, 0.17)",
            marginTop: "5vh",
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
      {showModal && <Modal show={showModal} setShow={setShowModal} />}
    </AppImage>
  );
};

export default Restaurants;
