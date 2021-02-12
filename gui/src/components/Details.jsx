import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  DetailsWrapper,
  DetailsItem,
  DetailsItemWrapper,
  DetailsTextWrapper,
  DetailsImageWrapper,
} from "../util/RestaurantStyledComponents";
import { Icon, Image } from "semantic-ui-react";

let index = 0;

const Details = (props) => {
  const [showDetail, setDetailShow] = useState("location");

  const pages = ["location", "time", "bed", "mobile"];

  // setInterval(() => {
  //   setDetailShow(pages[index]);
  //
  //   if (index > pages.length) {
  //     index = 0;
  //   } else {
  //     index++;
  //   }
  // }, 5000);

  return (
    <DetailsWrapper>
      <DetailsItemWrapper>
        <DetailsItem onClick={() => setDetailShow("location")}>
          <Icon
            name="location arrow"
            size="large"
            style={{ margin: "1.2vh 0.7vw" }}
          />
        </DetailsItem>
        <DetailsItem onClick={() => setDetailShow("time")}>
          <Icon name="clock" size="large" style={{ margin: "1.2vh 0.7vw" }} />
        </DetailsItem>
        <DetailsItem onClick={() => setDetailShow("bed")}>
          <Icon name="bed" size="large" style={{ margin: "1.2vh 0.7vw" }} />
        </DetailsItem>
        <DetailsItem onClick={() => setDetailShow("mobile")}>
          <Icon
            name="mobile alternate"
            size="large"
            style={{ margin: "1.2vh 0.7vw" }}
          />
        </DetailsItem>
      </DetailsItemWrapper>
      {showDetail === "location" ? (
        <>
          <DetailsTextWrapper>
            Explore hundreds of exciting new places available only on our app!
          </DetailsTextWrapper>
          <DetailsImageWrapper>
            <Image src="https://images.unsplash.com/photo-1498654896293-37aacf113fd9?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" />
          </DetailsImageWrapper>
        </>
      ) : showDetail === "time" ? (
        <>
          <DetailsTextWrapper>Always available 24/7</DetailsTextWrapper>
          <DetailsImageWrapper>
            <Image
              style={{ height: "40vh", width: "40vw" }}
              src="https://images.unsplash.com/photo-1587476353394-d031d13188ff?ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8MjQlMkY3fGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
            />
          </DetailsImageWrapper>
        </>
      ) : showDetail === "bed" ? (
        <>
          <DetailsTextWrapper>
            Explore new restaurants directly from your home
          </DetailsTextWrapper>
          <DetailsImageWrapper>
            <Image src="https://images.unsplash.com/photo-1540991825428-5b54b09f7338?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1497&q=80" />
          </DetailsImageWrapper>
        </>
      ) : showDetail === "mobile" ? (
        <>
          <DetailsTextWrapper>
            Our app is compatible with every mobile phone screen!
          </DetailsTextWrapper>
          <DetailsImageWrapper>
            <Image
              style={{ height: "40vh", width: "40vw" }}
              src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
            />
          </DetailsImageWrapper>
        </>
      ) : (
        <div></div>
      )}
    </DetailsWrapper>
  );
};

export default Details;
