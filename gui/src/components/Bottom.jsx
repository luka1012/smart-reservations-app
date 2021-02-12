import React from "react";
import PropTypes from "prop-types";
import {DetailsWrapper, BottomContentItem} from "../util/RestaurantStyledComponents"
import Logo from "../assets/images/logo.png";
import {Icon, Image} from "semantic-ui-react"

const Bottom = (props) => {
  return (
    <DetailsWrapper
      style={{
        backgroundColor: "#002a6e",
        width: "70vw",
        marginBottom: "0",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "10vh 5vw",
        }}
      >
        <Image src={Logo} />
        <div>
          <div style={{ fontFamily: "'Arvo', serif", color: "white" }}>
            <Icon name="copyright outline" color="white" inverted />
            Smart Restaurant App ltd.
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "10vh 5vw",
        }}
      >
        <BottomContentItem>Headline 1</BottomContentItem>
        <BottomContentItem>Content 1</BottomContentItem>
        <BottomContentItem>Content 2</BottomContentItem>
        <BottomContentItem>Content 3</BottomContentItem>
        <BottomContentItem>Content 4</BottomContentItem>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "10vh 5vw",
        }}
      >
        <BottomContentItem>Headline 1</BottomContentItem>
        <BottomContentItem>Content 1</BottomContentItem>
        <BottomContentItem>Content 2</BottomContentItem>
        <BottomContentItem>Content 3</BottomContentItem>
        <BottomContentItem>Content 4</BottomContentItem>
      </div>
    </DetailsWrapper>
  );
};

export default Bottom;
