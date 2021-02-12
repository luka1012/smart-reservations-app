import React, { useState, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Headline,
  DashboardNav as Navigation,
  ComponentWidget,
  WidgetItem,
  styledTable,
} from "../util/RestaurantStyledComponents";
import {
  Button,
  Checkbox,
  Form,
  Image,
  Message,
  Divider,
  Input,
  Tab,
  TextArea,
} from "semantic-ui-react";
import {
  useTable,
  useFilters,
  useGlobalFilter,
  useAsyncDebounce,
} from "react-table";
import { FormattedMessage } from "react-intl";
import Axios from "axios";
import UserModal from "./UserModal";
import UserCredentialsModal from "./UserCredentialModal";
import ImageUploading from "react-images-uploading";

const MealTab = () => {
  const [submitting, isSubmitting] = useState(false);
  const [successfull, setSuccesfull] = useState(false);
  const [mealOneImage, setMealOneImages] = useState([]);
  const [mealTwoImage, setMealTwoImages] = useState([]);
  const [mealThreeImage, setMealThreeImages] = useState([]);
  const [mainImage, setMainImage] = useState();
  const maxNumber = 69;

  const onChange = (imageList, addUpdateIndex, mealOrder) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    if (mealOrder === 1) {
      setMealOneImages(imageList);
    }
    if (mealOrder === 2) {
      setMealTwoImages(imageList);
    }
    if (mealOrder === 3) {
      setMealThreeImages(imageList);
    }
  };
  return (
    <Tab.Pane style={{ display: "flex", flexDirection: "row" }}>
      <div
        style={{
          width: "15vw",
          height: "55vh",
          margin: "0 0.5vw",
          border: "1px solid black",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ margin: "0 auto" }}>
            <ImageUploading
              multiple
              value={mealOneImage}
              onChange={(imageList, addUpdateIndex) =>
                onChange(imageList, addUpdateIndex, 1)
              }
              maxNumber={maxNumber}
              dataURLKey="data_url"
            >
              {({
                imageList,
                onImageUpload,
                onImageRemoveAll,
                onImageUpdate,
                onImageRemove,
                isDragging,
                dragProps,
              }) => (
                // write your building UI
                <div className="upload__image-wrapper">
                  <Button
                    color="blue"
                    disabled={mealOneImage.length !== 0}
                    style={
                      isDragging ? { color: "red" } : { margin: "2vh auto" }
                    }
                    onClick={onImageUpload}
                    {...dragProps}
                  >
                    Select photo
                  </Button>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      margin: "2vh 0",
                    }}
                  >
                    {imageList.map((image, index) => (
                      <div style={{ display: "flex", margin: "0 auto" }}>
                        <div
                          key={index}
                          className="image-item"
                          style={{
                            marginTop: "2vh",
                            margin: "0 auto",
                          }}
                        >
                          <img
                            src={image["data_url"]}
                            alt=""
                            width="100"
                            style={{ margin: "2vh 0.5vw" }}
                          />
                          <div
                            className="image-item__btn-wrapper"
                            style={{ bottom: 0, position: "relative" }}
                          >
                            <Button
                              color="blue"
                              style={{ margin: "0 0.5vw" }}
                              basic
                              onClick={() => onImageRemove(index)}
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </ImageUploading>
          </div>
        </div>
        <Input placeholder="Name" style={{ margin: "0 auto" }} />
        <TextArea
          placeholder="Enter describtion..."
          style={{ margin: "1vh 0.1vw", height: "30vh" }}
        />
      </div>
      <div
        style={{
          border: "1px solid black",
          width: "15vw",
          height: "55vh",
          margin: "0 0.5vw",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {" "}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ margin: "0 auto" }}>
            <ImageUploading
              multiple
              value={mealTwoImage}
              onChange={(imageList, addUpdateIndex) =>
                onChange(imageList, addUpdateIndex, 2)
              }
              maxNumber={maxNumber}
              dataURLKey="data_url"
            >
              {({
                imageList,
                onImageUpload,
                onImageRemoveAll,
                onImageUpdate,
                onImageRemove,
                isDragging,
                dragProps,
              }) => (
                // write your building UI
                <div className="upload__image-wrapper">
                  <Button
                    color="blue"
                    disabled={mealTwoImage.length !== 0}
                    style={
                      isDragging ? { color: "red" } : { margin: "2vh auto" }
                    }
                    onClick={onImageUpload}
                    {...dragProps}
                  >
                    Select photo
                  </Button>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      margin: "2vh 0",
                    }}
                  >
                    {imageList.map((image, index) => (
                      <div style={{ display: "flex", margin: "0 auto" }}>
                        <div
                          key={index}
                          className="image-item"
                          style={{
                            marginTop: "2vh",
                            margin: "0 auto",
                          }}
                        >
                          <img
                            src={image["data_url"]}
                            alt=""
                            width="100"
                            style={{ margin: "2vh 0.5vw" }}
                          />
                          <div
                            className="image-item__btn-wrapper"
                            style={{ bottom: 0, position: "relative" }}
                          >
                            <Button
                              color="blue"
                              style={{ margin: "0 0.5vw" }}
                              basic
                              onClick={() => onImageRemove(index)}
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </ImageUploading>
          </div>
        </div>
        <Input placeholder="Name" style={{ margin: "0 auto" }} />
        <TextArea
          placeholder="Enter describtion..."
          style={{ margin: "1vh 0.1vw", height: "30vh", width: "99%" }}
        />
      </div>
      <div
        style={{
          border: "1px solid black",
          width: "15vw",
          height: "55vh",
          margin: "0 0.5vw",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {" "}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ margin: "0 auto" }}>
            <ImageUploading
              multiple
              value={mealThreeImage}
              onChange={(imageList, addUpdateIndex) =>
                onChange(imageList, addUpdateIndex, 3)
              }
              maxNumber={maxNumber}
              dataURLKey="data_url"
            >
              {({
                imageList,
                onImageUpload,
                onImageRemoveAll,
                onImageUpdate,
                onImageRemove,
                isDragging,
                dragProps,
              }) => (
                // write your building UI
                <div className="upload__image-wrapper">
                  <Button
                    color="blue"
                    disabled={mealThreeImage.length !== 0}
                    style={
                      isDragging ? { color: "red" } : { margin: "2vh auto" }
                    }
                    onClick={onImageUpload}
                    {...dragProps}
                  >
                    Select photo
                  </Button>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      margin: "2vh 0",
                    }}
                  >
                    {imageList.map((image, index) => (
                      <div style={{ display: "flex", margin: "0 auto" }}>
                        <div
                          key={index}
                          className="image-item"
                          style={{
                            marginTop: "2vh",
                            margin: "0 auto",
                          }}
                        >
                          <img
                            src={image["data_url"]}
                            alt=""
                            width="100"
                            style={{ margin: "2vh 0.5vw" }}
                          />
                          <div
                            className="image-item__btn-wrapper"
                            style={{ bottom: 0, position: "relative" }}
                          >
                            <Button
                              color="blue"
                              style={{ margin: "0 0.5vw" }}
                              basic
                              onClick={() => onImageRemove(index)}
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </ImageUploading>
          </div>
        </div>
        <Input placeholder="Name" style={{ margin: "0 auto" }} />
        <TextArea
          placeholder="Enter describtion..."
          style={{ margin: "1vh 0.1vw", height: "30vh", width: "99%" }}
        />
      </div>
    </Tab.Pane>
  );
};

const RestaurantMenu = (props) => {
  const panes = [
    {
      menuItem: "Appetizers",
      render: () => <MealTab />,
    },
    { menuItem: "Meals", render: () => <MealTab /> },
    { menuItem: "Deserts", render: () => <MealTab /> },
    { menuItem: "Drinks", render: () => <MealTab /> },
  ];

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Headline>Menus</Headline>
        <Button
          color="green"
          basic
          style={{ width: "7vw", margin: "auto 0", height: "4vh" }}
        >
          Upload
        </Button>
      </div>

      <div style={{ margin: "0 2vw" }}>
        <Tab panes={panes} style={{ width: "45vw" }} />
      </div>
    </div>
  );
};

export default RestaurantMenu;
