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
`;

export const DetailsTextWrapper = styled.div`
  text-align: center;
  font-weight: bold;
  font-family: "Arvo", serif;
  font-size: 20px;
  margin: 5vh auto;
  line-height: 5vh;
  width: 25vw;
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
