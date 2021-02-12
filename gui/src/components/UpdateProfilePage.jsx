import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Headline,
  DashboardNav as Navigation,
  ComponentWidget,
  WidgetItem,
} from "../util/RestaurantStyledComponents";
import {
  Button,
  Checkbox,
  Form,
  Image,
  Message,
  Divider,
} from "semantic-ui-react";
import { Formik, Field, ErrorMessage } from "formik";
import { useSelector, connect } from "react-redux";
import Axios from "axios";
import { login } from "../redux/actions";

const NewUser = (props) => {
  const [submitting, isSubmitting] = useState(false);
  const [success, isSuccess] = useState(false);

  const user = useSelector((state) => state.auth.user);

  const token = useSelector((state) => state.auth.token);

  return (
    <div>
      <Headline>Update profile</Headline>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ padding: "50px" }}>
          <Formik
            initialValues={{
              username: user.username,
              firstname: user.firstname,
              password: user.password,
              lastname: user.lastname,
              email: user.email,
            }}
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

              Axios.post(
                `${window.ENVIRONMENT.AGILE_ADMINISTRATOR}/v1/user/updateUser`,
                values,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              )
                .then((res) => {
                  isSuccess(true);
                  setSubmitting(false);
                  isSubmitting(false);
                  props.login(true, values)
                })
                .catch((e) => console.log(e));
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
                size="large"
              >
                <input
                  disabled
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
                <Button
                  type="submit"
                  color="blue"
                  style={{ marginTop: "25px" }}
                  disabled={isSubmitting}
                >
                  Update
                </Button>
              </Form>
            )}
          </Formik>
        </div>
        {success && (
          <Message color="green" style={{ width: "25vw", height: "10vh" }}>
            <Message.Header>Successfull</Message.Header>
            <p
              style={{ fontSize: "15px", marginTop: "10px", color: "#253858" }}
            >
              Profile has been successfully updated!
            </p>
          </Message>
        )}
      </div>
    </div>
  );
};

export default connect(null, { login })(NewUser);
