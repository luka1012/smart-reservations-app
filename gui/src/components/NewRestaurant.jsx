import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Headline,
  DashboardNav as Navigation,
  ComponentWidget,
  WidgetItem,
  FormikWrapper,
} from "../util/RestaurantStyledComponents";
import {
  Button,
  Checkbox,
  Form,
  Image,
  Message,
  Divider,
  Select,
} from "semantic-ui-react";
import { Formik, Field, ErrorMessage } from "formik";
import Axios from "axios";
import ImageUploading from "react-images-uploading";
import { useToasts } from "react-toast-notifications";
import { useSelector } from "react-redux";

const roles = [
  { value: "admin", text: "ADMIN" },
  { value: "user", text: "USER" },
];

const NewUser = (props) => {
  const [submitting, isSubmitting] = useState(false);
  const [successfull, setSuccesfull] = useState(false);
  const [images, setImages] = useState([]);
  const [imageRender, setImageRender] = useState([]);
  const [mainImage, setMainImage] = useState();
  const maxNumber = 69;

  const handleUploadImage = (image, action) => {
    if (action === "images") {
      setImages([...images, image]);
    }

    if (action === "main") {
      setMainImage(image);
    }
  };

  const onChange = (imageList, addUpdateIndex) => {
    setImageRender(imageList);
    // data for submit
    imageList.map((image) => {
      console.log(image)
      setImages([...images, image.data_url]);
    });
  };

  const user = useSelector((state) => state.auth.user);

  const token = useSelector((state) => state.auth.token);

  const { addToast } = useToasts();

  console.log(images);

  return (
    <div>
      <Headline>Add new restaurant</Headline>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ margin: "0 auto" }}>
          <ImageUploading
            multiple
            value={imageRender}
            onChange={onChange}
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
                  style={isDragging ? { color: "red" } : undefined}
                  onClick={onImageUpload}
                  {...dragProps}
                >
                  Click or Drop here
                </Button>
                &nbsp;
                <Button onClick={onImageRemoveAll}>Remove all images</Button>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    margin: "2vh 0",
                  }}
                >
                  {imageList.map((image, index) => (
                    <div style={{ position: "relative" }}>
                      <div
                        key={index}
                        className="image-item"
                        style={{ position: "relative", marginTop: "2vh" }}
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
        <Headline
          style={{
            padding: "0",
            fontSize: "17px",
            margin: "2vh auto",
            marginBottom: "-5vh",
          }}
        >
          {images.lenght !== 0
            ? `${imageRender.length} images choosen`
            : "Choose 5 images"}
        </Headline>
        <FormikWrapper style={{ padding: "50px" }}>
          <Formik
            initialValues={{ email: "", password: "" }}
            validate={(values) => {
              const errors = {};
            }}
            onSubmit={async (values, { setSubmitting }) => {
              isSubmitting(true);

              setTimeout(() => {
                Axios.post(
                  `${window.ENVIRONMENT.AGILE_ADMINISTRATOR}/v1/restaurants/createRestaurant`,
                  {
                    ...values,
                    manager: `${user.firstname} ${user.lastname}`,
                    images,
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }
                )
                  .then((res) => {
                    addToast("Registration successfull!", {
                      appearance: "success",
                    });

                    setSubmitting(false);
                    isSubmitting(false);
                    setSuccesfull(true);
                  })
                  .catch((err) =>
                    addToast("Registration error!", {
                      appearance: "error",
                    })
                  );
              }, 2000);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              setFieldValue,
            }) => (
              <Form
                style={{
                  width: "17vw",
                  margin: "5vh auto",
                  display: "flex",
                  flexDirection: "column",
                }}
                onSubmit={handleSubmit}
                size="large"
              >
                <input
                  style={{ margin: "10px 0" }}
                  name="name"
                  placeholder="Name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                />
                <input
                  style={{ margin: "10px 0" }}
                  name="address"
                  placeholder="Address"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.address}
                />
                <Button
                  type="submit"
                  color="blue"
                  style={{ marginTop: "25px" }}
                  disabled={isSubmitting}
                  loading={submitting}
                >
                  Add
                </Button>
              </Form>
            )}
          </Formik>
        </FormikWrapper>
      </div>
    </div>
  );
};

export default NewUser;
