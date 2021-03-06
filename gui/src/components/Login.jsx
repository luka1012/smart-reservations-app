import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  RegisterLoginWrapper,
  WelcomeWidgetHello,
} from "../util/RestaurantStyledComponents";
import { Button, Checkbox, Form, Image, Message } from "semantic-ui-react";
import { Formik, Field, ErrorMessage } from "formik";
import { getAdminToken, getCentralToken } from "../util/endpoints";
import { saveToken, login } from "../redux/actions";
import Spinner from "react-bootstrap/Spinner";
import { useToasts } from "react-toast-notifications";
import axios from "axios";
import { connect } from "react-redux";
import Logo from "../assets/images/logo.png";


const Login = (props) => {
  const [submitting, isSubmitting] = useState(false);

  const { addToast } = useToasts();

  return (
    <RegisterLoginWrapper
      style={{
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
          <Image src={Logo} size="small" style={{margin: "0 auto"}} />
          <WelcomeWidgetHello
            style={{ margin: "0 auto", fontSize: "25px", color: "black" }}
          >
            Login
          </WelcomeWidgetHello>
          <Formik
            initialValues={{ email: "", password: "" }}
            validate={(values) => {
              const errors = {};
            }}
            onSubmit={async (values, { setSubmitting }) => {
              setSubmitting(true);
              isSubmitting(true);

              let adminToken;
              let centralToken;

              try {
                const credentials = {
                  username: `${values.username}`,
                  password: `${values.password}`,
                };

                adminToken = await axios.post(
                  `${window.ENVIRONMENT.AGILE_ADMINISTRATOR}/v1/jwt/authenticate`,
                  credentials
                );
              } catch (e) {
                addToast("Username/Password incorrect!", {
                  appearance: "error",
                });
                setSubmitting(false);
                isSubmitting(false);
              }

              axios
                .get(
                  `${window.ENVIRONMENT.AGILE_ADMINISTRATOR}/v1/user/getUserData`,
                  {
                    headers: {
                      Authorization: `Bearer ${adminToken.data.token}`
                    },
                    params: {
                      username: values.username,
                    },
                  }
                )
                .then((res) => {
                  props.saveToken(
                    adminToken.data.token,
                    null
                  );
                  props.login(true, res.data);
                  addToast("Login successfull!", {
                    appearance: "success",
                  });

                  setSubmitting(false);
                  isSubmitting(false);
                });
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
                <Button.Group
                  size="large"
                  style={{ width: "12vw", margin: "10px auto" }}
                >
                  <Button
                    color="orange"
                    onClick={() => props.setAction("Register")}
                  >
                    Register
                  </Button>
                  <Button.Or />
                  <Button
                    type="submit"
                    color="instagram"
                    disabled={isSubmitting}
                  >
                    Login
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

export default connect(null, { login, saveToken })(Login);
