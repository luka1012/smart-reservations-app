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
import { useToasts } from "react-toast-notifications";

const roles = [
  { value: "admin", text: "ADMIN" },
  { value: "user", text: "USER" },
];

const NewUser = (props) => {
  const [submitting, isSubmitting] = useState(false);
  const [successfull, setSuccesfull] = useState(false);

  const { addToast } = useToasts();

  return (
    <div>
      <Headline>Add new user</Headline>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <FormikWrapper style={{ padding: "50px" }}>
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

              setTimeout(() => {
                Axios.post(
                  `${window.ENVIRONMENT.AGILE_ADMINISTRATOR}/v1/user/createUser`,
                  { ...values, role: "USER" }
                )
                  .then((res) => {
                    setSubmitting(false);
                    isSubmitting(false);
                    addToast("User created!", {
                      appearance: "success",
                    });
                  })
                  .catch((err) => console.log(err));
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
