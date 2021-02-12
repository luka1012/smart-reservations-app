import React, { useState } from "react";
import PropTypes from "prop-types";
import Navigation from "../components/Navigation";
import {
  HomeWrapper,
  RestaurantWrapper,
  ReviewNameWrapper,
  AppImage,
  HeadlineWrapper,
  StyledText,
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
} from "semantic-ui-react";
import Modal from "../components/Modal";
import Logo from "../assets/images/logo.png";

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

  return (
    <AppImage
      style={{
        backgroundImage: "none",
      }}
    >
      <HomeWrapper>
        <Navigation />
        <Item
          style={{ margin: "2vh auto", display: "flex", flexDirection: "row" }}
        >
          <Item.Image
            size="small"
            src="https://hvar-gariful.hr/wp-content/themes/gariful-20/img/showcase/aboutFull1.jpg"
          />

          <Item.Content style={{ margin: "2vh 1vw" }}>
            <StyledText>Restaurant 1</StyledText>
            <StyledText>Description 1</StyledText>
            <StyledText>Additional Details</StyledText>
          </Item.Content>
        </Item>
        <MenuTemplate
          meal={{
            name: "Predjelo",
            predjelo1: {
              name: "Jelo 1",
              taste: "Sweet",
              image:
                "https://images.unsplash.com/photo-1502301103665-0b95cc738daf?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
            },
            predjelo2: {
              name: "Jelo 2",
              taste: "Sweet",
              image:
                "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            },
            predjelo3: {
              name: "Jelo 3",
              taste: "Sweet",
              image:
                "https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            },
          }}
        />
        <MenuTemplate
          meal={{
            name: "Glavno jelo",
            predjelo1: {
              name: "Jelo 1",
              taste: "Salty",
              image:
                "https://images.unsplash.com/photo-1481931098730-318b6f776db0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=637&q=80",
            },
            predjelo2: {
              name: "Jelo 2",
              taste: "Sweet",
              image:
                "https://images.unsplash.com/photo-1529042410759-befb1204b468?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=633&q=80",
            },
            predjelo3: {
              name: "Jelo 3",
              taste: "Salty",
              image:
                "https://images.unsplash.com/photo-1484980972926-edee96e0960d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
            },
          }}
        />
        <MenuTemplate
          meal={{
            name: "Desert",
            predjelo1: {
              name: "Jelo 1",
              taste: "Sweet",
              image:
                "https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80",
            },
            predjelo2: {
              name: "Jelo 2",
              taste: "Sweet",
              image:
                "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            },
            predjelo3: {
              name: "Jelo 3",
              taste: "Sweet",
              image:
                "https://images.unsplash.com/photo-1501959915551-4e8d30928317?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
            },
          }}
        />
        <MenuTemplate
          meal={{
            name: "Drinks",
            predjelo1: {
              name: "Sprite",
              taste: "Sweet",
              image:
                "https://images.unsplash.com/photo-1592860893757-84536a1c9b82?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Nnx8c3ByaXRlfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            },
            predjelo2: {
              name: "Juice",
              taste: "Sweet",
              image:
                "https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
            },
            predjelo3: {
              name: "Water",
              taste: "Sweet",
              image:
                "https://images.unsplash.com/photo-1523362628745-0c100150b504?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1493&q=80",
            },
          }}
        />
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
    </AppImage>
  );
};

export default Menu;
