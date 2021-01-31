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


const UserModal = (props) => {
  const [activeIndexs, setActiveIndexs] = useState([0, 1, 2, 3, 4, 5]);
  const [sending, isSending] = useState(false);
  const { addToast } = useToasts();

  return (
    <Modal
      show={props.show}
      onHide={() => props.setShow(false)}
      dialogClassName="modal-35w"
    >
      <Modal.Header closeButton>
        <Modal.Title style={{ fontFamily: "'Arvo', serif" }}>
          Restaurant images
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ fontFamily: "'Arvo', serif" }}>
        {props.body}
      </Modal.Body>
    </Modal>
  );
};

export default UserModal;
