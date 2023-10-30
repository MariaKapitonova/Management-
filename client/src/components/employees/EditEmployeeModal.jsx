import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import EditForm from "./EditForm";

export default function EditEmployeeModal({ item }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="warning" onClick={handleShow}>
        Edit
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditForm handleClose={handleClose} item={item} />
        </Modal.Body>
      </Modal>
    </>
  );
}
