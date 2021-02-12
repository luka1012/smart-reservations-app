import React, {useState} from "react";
import PropTypes from "prop-types";
import { Button } from "semantic-ui-react";
import { ImageWrapper, HeadlineWrapper } from "../util/RestaurantStyledComponents";
import history from "../history";
import { Wave } from 'react-animated-text';

const WelcomeImage = (props) => {


  const [animate, setAnimate] = useState(false)

  setTimeout(() => {
    setAnimate(!animate)
  }, 10000)

  return (
    <ImageWrapper>
      <HeadlineWrapper>
        <Wave
          text="Tired of searching for good restaurants"
          effect="fadeOut"
          paused={animate}
          effectChange={2.0}
        />
      </HeadlineWrapper>
      <HeadlineWrapper>
        <Wave
          text="Try out our new app"
          effect="fadeOut"
          paused={animate}
          effectChange={2.0}
        />
      </HeadlineWrapper>
      <Button
        color="blue"
        size="large"
        style={{ margin: "-2vh auto" }}
        onClick={() => history.push("/restaurants")}
      >
        See restaurants
      </Button>
    </ImageWrapper>
  );
};

export default WelcomeImage;
