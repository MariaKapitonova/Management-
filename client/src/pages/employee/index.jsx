import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../../components/Spinner.jsx";
import AddEmployeeModal from "../../components/employees/AddEmployeeModal.jsx";
import EditEmployeeModal from "../../components/employees/EditEmployeeModal.jsx";
import instance from "../../index.js";
import { fetchEmployees } from "../../store/actions/employees.js";
import { loadOnDelete } from "../../store/slices/employeesSlice.js";

export default function EmployeesTable() {
  const dispatch = useDispatch();

  const employeesList = useSelector((store) => store.employees.employeesList);
  const loading = useSelector((store) => store.employees.loading);

  const handleDelete = async (id) => {
    try {
      await instance.delete(`/employees/${id}`);
      const list = employeesList.filter((item) => item.id !== id);
      dispatch(loadOnDelete(list));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  return (
    <>
      <div className="container">
        <div className="titles">
          <h1>Employees</h1>
        </div>
        <div className="center-table">
          <Table bordered hover>
            <thead>
              <tr className="table-success">
                <th>#</th>
                <th>Name</th>
                <th>Title</th>
                <th>Tribe</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {loading === false &&
                employeesList.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.title}</td>
                    <td>{item.tribe}</td>
                    <td>
                      <Button
                        onClick={() => {
                          handleDelete(item.id);
                        }}
                        variant="danger"
                        size="sm"
                      >
                        Delete
                      </Button>
                    </td>
                    <td>
                      <EditEmployeeModal item={item} />
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
          {loading === true && <LoadingSpinner></LoadingSpinner>}
          <AddEmployeeModal />
        </div>
      </div>
    </>
  );
}
