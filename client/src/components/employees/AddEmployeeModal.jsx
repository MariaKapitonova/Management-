import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { handleCloseAdd } from "../../store/slices/modalsSlice";
import MyButton from "../Button";
import AddForm from "./AddForm";

export default function AddEmployeeModal() {
  const dispatch = useDispatch();
  const showModal = useSelector((store) => store.modals.addEmployee);

  return (
    <>
      <MyButton color={"success"} text={"Add employee"} />
      <Modal show={showModal} onHide={() => dispatch(handleCloseAdd())}>
        <Modal.Header closeButton>
          <Modal.Title>New employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddForm />
        </Modal.Body>
      </Modal>
    </>
  );
}
