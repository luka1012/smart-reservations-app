import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Icon, Divider, Header } from "semantic-ui-react";
import Logo from "../assets/images/logo.png";
import Navigation from "../components/Navigation";
import WelcomeImage from "../components/WelcomeImage";
import Details from "../components/Details";
import Reviews from "../components/Reviews";
import Bottom from "../components/Bottom";
import { HomeWrapper, AppImage } from "../util/RestaurantStyledComponents";
import { motion } from "framer-motion";

const Home = (props) => {
  const variants = {
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.35 },
    },
    hidden: { opacity: 0, scale: 1.05 },
  };

  const secondVariants = {
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.45 },
    },
    hidden: { opacity: 0 },
  };

  return (
    <AppImage>
      <HomeWrapper>
        <Navigation />
        <motion.div initial="hidden" animate="visible" variants={variants}>
          <WelcomeImage />
        </motion.div>
        <Divider horizontal style={{ margin: "2vh auto", width: "50vw" }}>
          <Header as="h4">
            <Icon name="info" color="blue" />
            Features
          </Header>
        </Divider>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={secondVariants}
        >
          <Details />
        </motion.div>
        <Divider horizontal style={{ margin: "2vh auto", width: "50vw" }}>
          <Header as="h4">
            <Icon name="tag" color="blue" />
            Reviews
          </Header>
        </Divider>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={secondVariants}
        >
          <Reviews />
        </motion.div>
        <Bottom />
      </HomeWrapper>
    </AppImage>
  );
};

export default Home;
