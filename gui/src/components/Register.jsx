import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  RegisterLoginWrapper,
  WelcomeWidgetHello,
} from "../util/RestaurantStyledComponents";
import { Button, Checkbox, Form, Image, Message } from "semantic-ui-react";
import { Formik, Field, ErrorMessage } from "formik";
import {
  createAccount,
  getAdminToken,
  getCentralToken,
} from "../util/endpoints";
import { connect } from "react-redux";
import { saveToken, login } from "../redux/actions";
import Spinner from "react-bootstrap/Spinner";
import { useToasts } from "react-toast-notifications";
import axios from "axios";
import ImageUploader from "react-images-upload";
import ImageUploading from "react-images-uploading";

const Register = (props) => {
  const [submitting, isSubmitting] = useState(false);
  const [profile, setProfile] = useState(null);
  const maxNumber = 1;

  const { addToast } = useToasts();

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setProfile(imageList);
  };

  return (
    <RegisterLoginWrapper
      style={{
        height: "62vh",
        marginTop: props.accountModal !== undefined && "0vh",
        boxShadow: props.accountModal !== undefined && "none",
      }}
    >
      {submitting === true ? (
        <div style={{ margin: "auto auto" }}>
          <Spinner animation="border" size="lg" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <>
          <WelcomeWidgetHello
            style={{ margin: "0 auto", fontSize: "25px", color: "black" }}
          >
            Register
          </WelcomeWidgetHello>
          <Formik
            initialValues={{ email: "", password: "" }}
            validate={(values) => {
              const errors = {};
              if (!values.email) {
                errors.email = "Required";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = "Invalid email address";
              }
              return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
              isSubmitting(true);

              let adminToken;
              let centralToken;

              try {
                console.log(profile);
                const user = await createAccount(
                  {
                    ...values,
                    profilePhoto: profile[0].data_url,
                  },
                  "USER"
                );

                const credentials = {
                  username: `${values.username}`,
                  password: `${values.password}`,
                };

                adminToken = await axios.post(
                  `${window.ENVIRONMENT.AGILE_ADMINISTRATOR}/v1/jwt/authenticate`,
                  credentials
                );
              } catch (e) {
                addToast("User already exists!", {
                  appearance: "error",
                });
                setSubmitting(false);
                isSubmitting(false);
                console.log(e);
              }

              props.saveToken(adminToken.data.token);
              props.login(true, { ...values, profile: profile[0].data_url });

              addToast("Registration successfull!", {
                appearance: "success",
              });

              setSubmitting(false);
              isSubmitting(false);
              console.log("SENT");
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
              /* and other goodies */
            }) => (
              <Form
                style={{
                  width: "17vw",
                  margin: "5vh auto",
                  display: "flex",
                  flexDirection: "column",
                }}
                onSubmit={handleSubmit}
              >
                <ImageUploading
                  multiple
                  value={profile}
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
                    <div
                      className="upload__image-wrapper"
                      style={{ display: "flex", flexDirection: "column" }}
                    >
                      {profile === null && (
                        <Button
                          basic
                          circular
                          color="blue"
                          style={
                            isDragging ? { color: "red" } : { margin: "0 auto" }
                          }
                          onClick={onImageUpload}
                          {...dragProps}
                        >
                          Select profile
                        </Button>
                      )}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          margin: "0.5vh auto",
                        }}
                      >
                        {imageList.map((image, index) => (
                          <div style={{ position: "relative" }}>
                            <div key={index} className="image-item">
                              <img src={image["data_url"]} alt="" width="100" />
                              <div
                                className="image-item__btn-wrapper"
                                style={{ display: "flex" }}
                              >
                                <Button
                                  color="blue"
                                  style={{ margin: "0.5vh auto" }}
                                  basic
                                  onClick={() => {
                                    onImageRemove(index);
                                    setProfile(null);
                                  }}
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
                <input
                  style={{ margin: "10px 0" }}
                  name="username"
                  placeholder="Username"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                <input
                  style={{ margin: "10px 0" }}
                  name="firstname"
                  placeholder="Firstname"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.firstname}
                />
                <input
                  style={{ margin: "10px 0" }}
                  name="lastname"
                  placeholder="Lastname"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.lastname}
                />
                <input
                  style={{ margin: "10px 0" }}
                  name="email"
                  type="email"
                  placeholder="Email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                <Button.Group
                  size="large"
                  style={{ width: "12vw", margin: "10px auto" }}
                >
                  <Button
                    color="orange"
                    onClick={() => props.setAction("Login")}
                  >
                    Back
                  </Button>
                  <Button.Or />
                  <Button
                    type="submit"
                    color="instagram"
                    disabled={isSubmitting}
                  >
                    Register
                  </Button>
                </Button.Group>
              </Form>
            )}
          </Formik>
        </>
      )}
    </RegisterLoginWrapper>
  );
};

export default connect(null, { saveToken, login })(Register);
