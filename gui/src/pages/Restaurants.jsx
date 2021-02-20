import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import Navigation from "../components/Navigation";
import {
  HomeWrapper,
  RestaurantWrapper,
  ReviewNameWrapper,
  AppImage,
  ImageIndicator,
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
} from "semantic-ui-react";
import Modal from "../components/Modal";
import Logo from "../assets/images/logo.png";
import { motion } from "framer-motion";
import history from "../history";
import ImageModal from "../components/ImageModal";
import Axios from "axios";
import { Slide } from "react-slideshow-image";
import { useSelector } from "react-redux";
import Spinner from "react-bootstrap/Spinner";

const properties = {
  duration: 5000,
  autoplay: false,
  transitionDuration: 500,
  arrows: false,
  infinite: true,
  easing: "ease",
  indicators: (i) => (
    <ImageIndicator style={{ padding: "5px" }} className="indicator">
      {i + 1}
    </ImageIndicator>
  ),
};

const secondVariants = {
  visible: {
    opacity: 1,
    scale: 1,
    transformX: -50,
    transition: { duration: 0.45 },
  },
  hidden: { opacity: 0, scale: 0.85, transformX: 50 },
};

const Restaurants = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [showImageModal, setShowImage] = useState(false);
  const [showRestaurant, setShowRestaurant] = useState({});
  const [current, setCurrent] = useState(0);
  const [dataToRender, setDataToRender] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = useSelector((state) => state.auth.token);

  const slideRef = useRef();

  const handleBack = () => {
    slideRef.current.goBack();
  };

  const handleNext = () => {
    slideRef.current.goNext();
  };

  useEffect(() => {
    setLoading(true);
    Axios.get(
      `${window.ENVIRONMENT.AGILE_ADMINISTRATOR}/v1/restaurants/getAllRestaurants`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((result) => {
      console.log(result.data);

      setLoading(false);

      setDataToRender(result.data);
    });
  }, []);

  return (
    <AppImage
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1600331350693-a56b297f6f19?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80')",
        height:
          dataToRender.length === 0 || (dataToRender.length === 1 && "100vh"),
      }}
    >
      <HomeWrapper
        style={{
          height:
            dataToRender.length === 0 || (dataToRender.length === 1 && "100vh"),
        }}
      >
        <Navigation />
        {loading ? (
          <div style={{ margin: "50vh auto" }}>
            <Spinner animation="border" size="lg" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column" }}>
            {dataToRender.map((restaurant) => (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={secondVariants}
              >
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
                    <Image size="small" src={`${restaurant.images[0]}`} />
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <ReviewNameWrapper>
                        <Icon name="info circle" size="large" />{" "}
                        {restaurant.name}
                      </ReviewNameWrapper>{" "}
                      <ReviewNameWrapper>
                        <Icon name="address book" size="large" />{" "}
                        {restaurant.address}
                      </ReviewNameWrapper>
                      <ReviewNameWrapper>
                        <Label
                          color={
                            restaurant.openClosed === "Closed" ? "red" : "green"
                          }
                          size="large"
                          basic
                        >
                          {restaurant.openClosed}
                        </Label>
                      </ReviewNameWrapper>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <Button
                        color="orange"
                        style={{ margin: "2vh 0" }}
                        basic
                        onClick={() => {
                          setShowModal(true);
                          setShowRestaurant(restaurant);
                        }}
                      >
                        <Icon name="book" />
                        Book
                      </Button>
                      <Button
                        color="blue"
                        basic
                        onClick={() => history.push("/restaurants/menu")}
                      >
                        <Icon name="zoom" /> See menu
                      </Button>
                    </div>
                    <div>
                      <div style={{ margin: "5vh 4vw" }}>
                        <div style={{ fontFamily: "'Arvo', serif" }}>
                          <Icon name="map" color="green" />
                          {restaurant.availableTables}
                          {"  "}tables
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
                  <Divider
                    horizontal
                    style={{ margin: "0 auto", width: "50vw" }}
                  >
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
                    {restaurant.images.map((image) => (
                      <ImageIndicator
                        style={{
                          width: "10vw",
                          height: "15vh",
                          margin: "1.5vh auto",
                          paddingTop: "5px",
                        }}
                      >
                        <Image
                          style={{
                            width: "10vw",
                            height: "15vh",
                            margin: "1.5vh auto",
                            paddingTop: "5px",
                          }}
                          onClick={() => {
                            setShowImage(true);
                            setShowRestaurant(restaurant);
                          }}
                          src={`${image}`}
                        />
                      </ImageIndicator>
                    ))}
                  </div>
                </RestaurantWrapper>
                {showImageModal && (
                  <ImageModal
                    show={showImageModal}
                    setShow={setShowImage}
                    body={
                      <div className="App">
                        <div className="slide-container">
                          <Slide ref={slideRef} {...properties}>
                            {showRestaurant.images.map((each, index) => (
                              <div key={index} className="each-slide">
                                <Image
                                  className="lazy"
                                  src={each}
                                  size="massive"
                                />
                              </div>
                            ))}
                          </Slide>
                        </div>

                        <div className="slide-container buttons">
                          <Button
                            onClick={handleBack}
                            color="orange"
                            basic
                            type="button"
                          >
                            Go Back
                          </Button>
                          <Button
                            onClick={handleNext}
                            color="green"
                            basic
                            type="button"
                          >
                            Go Next
                          </Button>
                        </div>
                      </div>
                    }
                  />
                )}
              </motion.div>
            ))}
          </div>
        )}
        <div
          style={{
            boxShadow: "0px 7px 13px 5px rgba(0, 0, 0, 0.17)",
            marginTop:
              dataToRender.length === 0
                ? "90vh"
                : dataToRender.length === 1
                ? "42vh"
                : "0",
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
      {showModal && (
        <Modal
          show={showModal}
          setShow={setShowModal}
          restaurant={showRestaurant}
        />
      )}
    </AppImage>
  );
};

export default Restaurants;
