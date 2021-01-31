import styled from "styled-components";

export const ReviewNameWrapper = styled.div`
  font-weight: bold;
  font-family: "Arvo", serif;
  margin: 1vh 5vw;
`;

export const BottomContentItem = styled.div`
  font-family: "Arvo", serif;
  color: white;
  margin: 1vh 2vw;
`;

export const DetailsWrapper = styled.div`
  width: 65vw;
  height: 45vh;
  display: flex;
  flex-direction: row;
  margin: 2vh auto;
`;

export const ImageIndicator = styled.div`
  font-family: "Arvo", serif;
  &:hover {
    cursor: pointer;
  }
`;

export const DetailsItemWrapper = styled.div`
  height: 45vh;
  width: 10vw;
  display: flex;
  flex-direction: column;
  border-right: 4px solid #4287f5;
`;

export const DetailsItem = styled.div`
  background-color: #4287f5;
  color: white;
  width: 50px;
  height: 50px;
  border-radius: 40px;
  margin: auto auto;
  transition: 0.3s;
  &:hover {
    color: #4287f5;
    background-color: white;
  }
`;

export const DetailsImageWrapper = styled.div`
  margin: 2vh 1vw;
  width: 30vw;
  height: 50vh;
  transition: 0.7s;
`;

export const DetailsTextWrapper = styled.div`
  text-align: center;
  font-weight: bold;
  font-family: "Arvo", serif;
  font-size: 20px;
  margin: 5vh auto;
  line-height: 5vh;
  width: 25vw;
  transition: 0.7s;
`;

export const StyledText = styled.div`
  font-weight: bold;
  font-family: "Arvo", serif;
  font-size: 15px;
`;

export const Navigation = styled.div`
  width: 70vw;
  height: 5vh;
  background-color: #4287f5;
  display: flex;
  flex-direction: row;
  font-weight: bold;
  font-family: "Arvo", serif;
  color: white;
`;

export const NavigationItemWrapper = styled.div`
  margin: auto 5vw;

  &:hover {
    cursor: pointer;
    font-weight: bolder;
  }
`;

export const HeadlineWrapper = styled.div`
  margin: 10vh auto;
  font-weight: bold;
  font-family: "Arvo", serif;
  font-size: 45px;
  color: white;
`;

export const HomeWrapper = styled.div`
  width: 70vw;
  margin-left: 15vw;
  margin-right: 15vw;
  box-shadow: 0px 7px 13px 5px rgba(0, 0, 0, 0.17);
  display: flex;
  flex-direction: column;
  background-color: white;

  &::before {
    background-image: url("https://images.unsplash.com/photo-1527108097555-a5c5e36f3dd0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80");
    background-size: cover;
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    opacity: 0.75;
  }
`;

export const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 70vw;
  height: 59vh;
  background-image: url("https://images.unsplash.com/photo-1544148103-0773bf10d330?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  opacity: 0.9;
`;

export const AppImage = styled.div`
  background-image: url("https://hvar-gariful.hr/wp-content/themes/gariful-20/img/showcase/aboutFull1.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
`;

export const RestaurantWrapper = styled.div`
  width: 59vw;
  height: 40vh;
  box-shadow: 0px 7px 13px 5px rgba(0, 0, 0, 0.11);
  border-radius: 7px;
  margin: 4vh auto;
`;

export const DashboardUserWrapper = styled.div`
  margin-left: 52vw;
  display: flex;
  flex-direction: row;
  @media only screen and (max-width: 1270px) {
    flex-direction: column;
    margin: 2vh auto;
  }
`;

export const ContentNav = styled.div`
  width: 45vw;
  height: 5.5vh;
  display: flex;
  flex-direction: row;
  text-align: center;
  background-color: #1b5cb5;
`;

export const DashboardNavHeadline = styled.div`
  padding: 5px;
  font-family: "Russo One", sans-serif;
  box-shadow: 0px 7px 13px 5px rgba(0, 0, 0, 0.07);
  font-size: 19px;
  color: black;
  width: 14vw;
  height: 5.5vh;
  z-index: 10;
  @media only screen and (max-width: 1275px) and (min-width: 1270px) {
    flex-direction: column;
    width: 22.5vw;
    height: 5.5vh;
    font-size: 15px;
  }
  @media only screen and (max-width: 1270px) {
    flex-direction: column;
    width: 104vw;
    padding: 10px;
    margin-left: -6.8vw;
    margin-top: -5vw;
    height: 10vh;
  }
  @media only screen and (max-width: 734px) {
    width: 100vw;
    margin-top: -5.9vh;
    margin-left: -11vw;
    height: 10vh;
  }
`;

export const DashboardNavHeadlineItemWrapper = styled.div`
  @media only screen and (max-width: 1270px) {
    margin: 1vh 5vw;
  }
`;

export const DashboardNavHeadlineItemContainer = styled.div`
  display: flex;
  @media only screen and (max-width: 1270px) {
    margin: 1vh -10vw;
    flex-direction: row;
    background-color: white;
    width: 100vw;
  }
  @media only screen and (max-width: 734px) {
    flex-direction: column;
  }
`;

export const DashboardNavItem = styled.div`
  padding: 10px;
  font-family: "Roboto", sans-serif;
  color: #253858;
  font-size: 15px;
  cursor: default;
  margin: 5px auto;
  width: 11vw;
  height: 5vh;
  border-radius: 10px;
  transition: 0.7s;
  &:hover {
    background-color: #63a4ff;
  }
  @media only screen and (max-width: 1270px) {
    width: 50vw;
  }
`;

export const DashboardHeadlineWrapper = styled.div`
  width: 11vw;
  height: 7vh;
  border-radius: 10px;
  background-color: #a6cbff;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  @media only screen and (max-width: 1270px) {
    width: 50vw;
    padding: 20px;
  }
`;

export const DashboardHeadline = styled.div`
  font-family: "Roboto", sans-serif;
  font-size: 15px;
  margin: 12px 20px;
  @media only screen and (max-width: 1270px) {
    width: 50vw;
    margin: -10px 0;
    padding: 7px;
  }
`;

export const WelcomeWidgetHello = styled.div`
  font-family: "Libre Baskerville", serif;
  font-weight: bold;
  font-size: 45px;
  color: #f5f5f5;
  margin: 7vh auto;
`;

export const DashboardWelcomeWrapper = styled.div`
  width: 100vw;
  height: 94.5vh;
  display: flex;
  flex-direction: row;
  background-color: #f4f5f7;
`;

export const Headline = styled.div`
  padding: 35px;
  font-family: "Libre Baskerville", serif;
  color: #253858;
  font-weight: bold;
  font-size: 25px;
  cursor: default;
  @media only screen and (max-width: 1400px) {
    font-size: 19px;
  }
  @media only screen and (max-width: 1150px) {
    font-size: 15px;
    margin: 0 auto;
  }
  @media only screen and (max-width: 1150px) {
    font-size: 15px;
    margin: 2vh auto;
  }
  @media only screen and (max-width: 980px) {
    font-size: 12px;
    margin: 2vh auto;
  }
`;

export const SideWidgetMenu = styled.div`
  display: flex;
  flex-direction: column;
  width: 12vw;
  height: 36.5;
  box-shadow: 4px 0px 10px -4px rgba(0, 0, 0, 0.15);
  @media only screen and (max-width: 1450px) {
    width: 20vw;
  }
  @media only screen and (max-width: 785px) {
    width: 25vw;
  }
`;

export const BacklogHeadline = styled.div`
  padding: 10px;
  margin-left: 1vw;
  font-family: "Libre Baskerville", serif;
  color: #253858;
  font-weight: bold;
  font-size: 17px;
  cursor: default;
`;

export const SystemDashboardContentWrapper = styled.div`
  width: 45vw;
  height: 25vh;
  background-color: white;
  margin: 45px;
  box-shadow: 0px 7px 13px 5px rgba(0, 0, 0, 0.17);
`;

export const ProjectNavigation = styled.div`
  width: 15vw;
  height: 94.5vh;
  background-color: #f4f5f7;
`;


export const ComponentWidget = styled.div`
  width: 70vw;
  height: 75vh;
  background-color: white;
  border-radius: 10px;
  margin: 2vh 2vw;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 7px 13px 5px rgba(0, 0, 0, 0.05);
  @media only screen and (max-width: 1400px) {
    margin: 0 auto;
    width: 80vw;
  }
`;

export const FormikWrapper = styled.div`
  @media only screen and (max-width: 1400px) {
  }
`;

export const BacklogWidget = styled.div`
  width: 80vw;
  height: 38vh;
  padding: 10px;
  background-color: white;
  margin: 1vh 2vw;
  display: flex;
  flex-direction: column;
  transition: 0.5s;
`;

export const TaskWidget = styled.div`
  width: 30vw;
  height: 95vh;
  padding: 10px;
  background-color: white;
  transition: 0.5s;
  margin: -7vh -2vw;
  display: flex;
  flex-direction: column;
  box-shadow: -4px 3px 5px 0px rgba(0, 0, 0, 0.27);
  font-weight: bold;
  font-family: "Arvo", serif;
  font-size: 15px;
  overflow-y: scroll;
  @media only screen and (max-width: 1270px) {
    width: 50vh;
  }
`;

export const ProjectNavigationBar = styled.div`
  width: 14vw;
  background-color: white;
  display: flex;
  flex-direction: column;
  @media only screen and (max-width: 1270px) {
    width: 100vw;
    margin: 0 auto;
    margin-top: 5vh;
    margin-bottom: 1.5vh;
  }
  @media only screen and (max-width: 1275px) and (min-width: 1270px) {
    width: 17.3vw;
  }
  @media only screen and (max-width: 734px) {
    margin-top: 15vh;
  }
`;

export const ProjectBoard = styled.div`
  display: flex;
  flex-direction: row;
  @media only screen and (max-width: 1270px) {
    flex-direction: column;
  }
`;

export const TaskSection = styled.div`
  width: 25vw;
  padding: 15px;
  color: #b0b0b0;
  margin: 10px;
`;

export const AccountImageWrapper = styled.div`
  margin: 5vh auto;
  width: 7vw;
  height: 7vh;
  border-radius: 50px;
`;

export const TodoWidget = styled.div`
  width: 35vw;
  height: 75.5vh;
  background-color: white;
  border-radius: 10px;
  margin: 0 auto;
  margin-right: 7vw;
  box-shadow: 0px 7px 13px 5px rgba(0, 0, 0, 0.05);
`;

export const TimeWidget = styled.div`
  width: 19vw;
  height: 36.5vh;
  background-color: white;
  padding: 35px;
  border-radius: 10px;
  margin: 0.4vh 2.5vw;
  box-shadow: 0px 7px 13px 5px rgba(0, 0, 0, 0.05);
  font-family: "Russo One", sans-serif;
  font-size: 13px;
`;

export const ProjectNavigationItem = styled.div`
  padding: 15px;
  margin: 10px 40px;
  font-family: "Roboto", sans-serif;
  cursor: pointer;
  width: 11vw;
  transition: 0.5s;
  border-radius: 2px;
  &:hover {
    background-color: #abb2c2;
  }
`;

export const RegisterLoginWrapper = styled.div`
  margin-top: 20vh;
  margin-left: auto;
  margin-right: auto;
  width: 22vw;
  height: 47vh;
  background-color: white;
  box-shadow: 0px 7px 13px 5px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
`;

export const WidgetItem = styled.div`
  margin: 0 auto;
  width: 12vw;
  height: 5vh;
  text-align: left;
  font-family: "Roboto", sans-serif;
  box-shadow: 1px 5px 10px -4px rgba(0, 0, 0, 0.07);
  padding: 50px;
  transition: 0.25s;
  vertical-align: center;
  cursor: default;
  &:hover {
    background-color: #fcfcfc;
    color: #3396ff;
    font-weight: bold;
    border-left: 4px solid #3396ff;
    font-size: 12px;
  }
  @media only screen and (max-width: 1450px) {
    width: 20vw;
  }
  @media only screen and (max-width: 785px) {
    width: 25vw;
  }
`;

export const StyledLabel = styled.div`
  font-family: "Roboto", sans-serif;
  color: #253858;
  padding: 5px;
  margin: 10px 0;
  @media only screen and (max-width: 1400px) {
    font-size: 15px;
  }
`;

export const StyledProfileLabel = styled.div`
  font-family: "Roboto", sans-serif;
  color: #253858;
  padding: 15px;
  margin: 2px 0;
  font-size: 17px;
  font-weight: bold;
`;

export const styledTable = styled.div`
  padding: 45px;
  table {
    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }
    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;
      :last-child {
        border-right: 0;
      }
    }
  }
`;
