import { useEffect } from "react";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../../components/Spinner.jsx";
import { fetchTribes } from "../../store/actions/tribes.js";

export default function Tribes() {
  const dispatch = useDispatch();

  const tribeList = useSelector((store) => store.tribes.tribeList);
  const loading = useSelector((store) => store.tribes.loading);

  useEffect(() => {
    dispatch(fetchTribes());
  }, [dispatch]);

  return (
    <>
      <div className="container">
        <div className="titles">
          <h1>Tribes</h1>
        </div>
        <div className="center-table">
          <Table bordered hover>
            <thead>
              <tr className="table-success">
                <th>#</th>
                <th>Name</th>
                <th>Department</th>
              </tr>
            </thead>
            <tbody>
              {loading === false &&
                tribeList.map((item, index) => (
                  <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.department}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
          {loading === true && <LoadingSpinner></LoadingSpinner>}
        </div>
      </div>
    </>
  );
}
