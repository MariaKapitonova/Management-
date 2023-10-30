import { useFormik } from "formik";
import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees, putEmployees } from "../../store/actions/employees.js";
import { closeEdit } from "../../store/actions/modals";
import { fetchTribes } from "../../store/actions/tribes.js";

export default function EditForm({ item }) {
  const dispatch = useDispatch();
  const tribeList = useSelector((store) => store.tribes.tribeList);

  useEffect(() => {
    dispatch(fetchTribes());
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      id: item.id,
      name: item.name,
      title: item.title,
      tribe: item.tribe,
    },
    fieldValidation: (values) => {
      let errors;

      if (!values) {
        errors = "Field required";
      }

      return errors;
    },
    onSubmit: async (values, { resetForm }) => {
      // this is the function called when submit button is clicked
      try {
        tribeList.map((t) => {
          if (t.name === values.tribe) {
            return (values.tribe = t.id);
          }
        });
        dispatch(putEmployees(values, item.id));
        dispatch(fetchEmployees());
        resetForm();
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            defaultValue={formik.initialValues.name}
            placeholder="Enter name"
            type="name"
            onChange={formik.handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            defaultValue={formik.initialValues.title}
            placeholder="Enter title"
            type="text"
            onChange={formik.handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Tribe</Form.Label>
          <Form.Select
            aria-label="Default select example"
            type="tribe"
            name="tribe"
            value={formik.values.tribe}
            onChange={formik.handleChange}
          >
            <option disabled value="">
              select a tribe
            </option>
            {tribeList.map((t) => (
              <option key={t.id}>{t.name}</option>
            ))}
          </Form.Select>
        </Form.Group>
        <Modal.Footer>
          <Button
            type="submit"
            variant="success"
            disabled={Object.keys(formik.errors).length < 0 || !formik.dirty}
            onClick={() => dispatch(closeEdit())}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Form>
    </>
  );
}
