import React, { useState, useCallback } from "react";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import {
  Button,
  Icon,
  Label,
  Accordion,
  Input,
  Form,
  Select,
  TextArea,
  Segment,
  Header,
} from "semantic-ui-react";
import { Formik, Field, ErrorMessage, FieldArray } from "formik";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { useToasts } from "react-toast-notifications";
import TimeInputPolyfill from "react-time-input-polyfill";
import Axios from "axios";
import { useSelector } from "react-redux";

const UserModal = (props) => {
  const [activeIndexs, setActiveIndexs] = useState([0, 1, 2, 3, 4, 5]);
  const [value, onChange] = useState(new Date());
  const [sending, isSending] = useState(false);
  const { addToast } = useToasts();

  const token = useSelector((state) => state.auth.token);

  return (
    <Modal
      show={props.show}
      onHide={() => props.setShow(false)}
      dialogClassName="modal-35w"
    >
      <Modal.Header closeButton>
        <Modal.Title style={{ fontFamily: "'Arvo', serif" }}>
          Book a table
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ fontFamily: "'Arvo', serif" }}>
        <Formik
          initialValues={{ date: new Date() }}
          onSubmit={async (values, { setSubmitting }) => {
            isSending(true);

            console.log(values);

            Axios.post(
              `${window.ENVIRONMENT.AGILE_ADMINISTRATOR}/v1/restaurants/addBooking`,
              { ...values, restaurant: props.restaurant.name },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            )
              .then((result) => {
                console.log(result.data);

                addToast("Booking added!", {
                  appearance: "success",
                  autoDismiss: true,
                });

                props.setShow(false);
              })
              .catch((err) => {
                isSending(false);
                addToast("Error while adding booking", {
                  appearance: "error",
                  autoDismiss: true,
                });
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
            setFieldValue,
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
              <div
                style={{
                  marginTop: 5,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    margin: "1vh 10px",
                    width: "10vw",
                  }}
                >
                  <Icon name="user outline" color="green" /> Lastname:
                </div>
                <Input
                  name="lastname"
                  onChange={(e) => setFieldValue("lastname", e.target.value)}
                />
              </div>
              <div
                style={{
                  marginTop: 15,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    margin: "1vh 10px",
                    width: "5vw",
                  }}
                >
                  <Icon name="calendar" color="green" /> Date:
                </div>
                <DatePicker
                  selected={values.date}
                  name="date"
                  onChange={(date) => setFieldValue("date", date)}
                  onBlur={handleBlur}
                  dateFormat="yyyy-MM-dd"
                />
              </div>
              <div
                style={{
                  margin: "1vh 10px",
                  width: "5vw",
                }}
              >
                <Icon name="calendar" color="green" /> Time:
              </div>
              <TimeInputPolyfill
                value={value}
                name="time"
                onChange={({ value, element }) => {
                  // Export the new value to the parent component
                  onChange(value);
                  setFieldValue("time", value);
                }}
              />
              <div
                style={{
                  marginTop: 15,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    margin: "1vh 10px",
                    width: "5vw",
                  }}
                >
                  <Icon name="user" color="green" /> People:
                </div>
                <Select
                  placeholder="Select people"
                  name="people"
                  onChange={(value) =>
                    setFieldValue("people", value.target.innerText)
                  }
                  onBlur={handleBlur}
                  options={[
                    { text: 1, value: 1 },
                    { text: 2, value: 2 },
                    { text: 3, value: 3 },
                    { text: 4, value: 4 },
                  ]}
                />
              </div>
              <div
                style={{
                  marginTop: 15,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    margin: "auto 10px",
                    width: "10vw",
                  }}
                >
                  Special request:
                </div>
                <TextArea
                  name="request"
                  onChange={(e) => setFieldValue("request", e.target.value)}
                />
              </div>
              <Button
                basic
                color="green"
                type="submit"
                size="large"
                disabled={isSubmitting}
                loading={sending}
                style={{ margin: "2vh auto" }}
              >
                Book
              </Button>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default UserModal;
