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
  Select,
  Input,
} from "semantic-ui-react";
import BookingModal from "../components/BookingModal";
import Logo from "../assets/images/logo.png";
import { motion } from "framer-motion";
import history from "../history";
import ImageModal from "../components/ImageModal";
import Axios from "axios";
import { Slide } from "react-slideshow-image";
import { useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";

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
  const [current, setCurrent] = useState(0);
  const [dataToRender, setDataToRender] = useState([]);
  const [restaurantName, setRestaurantName] = useState();
  const [addressName, setAddressName] = useState();
  const [available, setAvailableTables] = useState();
  const [open, setOpenClosed] = useState();
  const [showRestaurant, setShowRestaurant] = useState({});

  const token = useSelector((state) => state.auth.token);

  const user = useSelector((state) => state.auth.user);

  const { addToast } = useToasts();

  const slideRef = useRef();

  const handleBack = () => {
    slideRef.current.goBack();
  };

  const handleNext = () => {
    slideRef.current.goNext();
  };

  const openClosed = [
    {
      key: "open",
      value: "Open",
      text: "Open",
    },
    {
      key: "closed",
      value: "Closed",
      text: "Closed",
    },
  ];

  const availablePlaces = [
    {
      key: "1",
      value: "1",
      text: "1",
    },
    {
      key: "2",
      value: "2",
      text: "2",
    },
    {
      key: "3",
      value: "3",
      text: "3",
    },
    {
      key: "4",
      value: "4",
      text: "4",
    },
    {
      key: "5",
      value: "5",
      text: "5",
    },
  ];

  useEffect(() => {
    Axios.get(
      `${window.ENVIRONMENT.AGILE_ADMINISTRATOR}/v1/restaurants/getRestaurants`,
      {
        params: {
          manager: `${user.firstname} ${user.lastname}`,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((result) => {
      console.log(result.data);

      setDataToRender(result.data);
    });
  }, []);

  return (
    <AppImage
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1600331350693-a56b297f6f19?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80')",
        height: dataToRender.length < 3 && "100vh",
      }}
    >
      <HomeWrapper
        style={{
          height: dataToRender.length < 3 && "100vh",
        }}
      >
        <Navigation />
        <div style={{ display: "flex", flexDirection: "column" }}>
          {dataToRender.map((restaurant) => (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={secondVariants}
            >
              <RestaurantWrapper style={{ height: "20vh" }}>
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
                      <Input
                        iconPosition="left"
                        value={restaurant.name}
                        onChange={(e) => setRestaurantName(e.target.value)}
                        icon="info circle"
                      />
                    </ReviewNameWrapper>{" "}
                    <ReviewNameWrapper>
                      <Input
                        iconPosition="left"
                        value={restaurant.address}
                        onChange={(e) => setAddressName(e.target.value)}
                        icon="address book"
                      />
                    </ReviewNameWrapper>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <Button
                      color="orange"
                      style={{ margin: "1.4vh 0", width: "7vw" }}
                      basic
                      onClick={() => {
                        setShowRestaurant(restaurant);
                        setShowModal(true);
                      }}
                    >
                      <Icon name="book" />
                      Bookings
                    </Button>
                    <Button
                      color="blue"
                      basic
                      onClick={() =>
                        history.push(`/updateMenu/${restaurant.name}`)
                      }
                    >
                      <Icon name="zoom" /> Menus
                    </Button>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <ReviewNameWrapper>
                      <Select
                        options={availablePlaces}
                        icon={
                          <Icon
                            name="map"
                            color="green"
                            style={{ marginLeft: 5 }}
                          />
                        }
                        placeholder="Available tables"
                        iconPosition="left"
                        onChange={(e, { value }) => setAvailableTables(value)}
                      />
                    </ReviewNameWrapper>
                    <ReviewNameWrapper>
                      <Select
                        options={openClosed}
                        placeholder="Open/Closed"
                        onChange={(e, { value }) => setOpenClosed(value)}
                      />
                    </ReviewNameWrapper>
                    <ReviewNameWrapper>
                      <Button
                        color="green"
                        onClick={() => {
                          Axios.post(
                            `${window.ENVIRONMENT.AGILE_ADMINISTRATOR}/v1/restaurants/updateRestaurant`,
                            {
                              ...restaurant,
                              openClosed: `${open}`,
                              availableTables: `${available}`,
                            },
                            {
                              headers: {
                                Authorization: `Bearer ${token}`,
                              },
                            }
                          )
                            .then((result) => {
                              console.log(result.data);

                              addToast("Restaurant updated!", {
                                appearance: "success",
                              });
                            })
                            .catch((e) => {
                              addToast("Error while updating restaurant!", {
                                appearance: "error",
                              });
                            });
                        }}
                      >
                        <Icon name="upload" /> Update
                      </Button>
                    </ReviewNameWrapper>
                  </div>
                </div>
              </RestaurantWrapper>
            </motion.div>
          ))}
        </div>
        <div
          style={{
            boxShadow: "0px 7px 13px 5px rgba(0, 0, 0, 0.17)",
            marginTop:
              dataToRender.length === 0
                ? "90vh"
                : dataToRender.length === 1
                ? "62vh"
                : dataToRender.length === 2
                ? "34vh"
                : dataToRender.length === 3
                ? "12vh"
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
        <BookingModal
          show={showModal}
          setShow={setShowModal}
          restaurant={showRestaurant}
        />
      )}
    </AppImage>
  );
};

export default Restaurants;
