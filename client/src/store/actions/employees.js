import instance from "../../index";
import {
  loadEmployees,
  loadEmployeesFailure,
  loadEmployeesSuccess,
  loadOnDelete,
  postEmployeeSuccess,
} from "../slices/employeesSlice";

export function fetchEmployees() {
  return async (dispatch) => {
    dispatch(loadEmployees());
    try {
      const response = await instance.get(`/employees`);
      const data = response.data;
      const newEmployee = data.map((x) => {
        return { ...x, tribe: x.tribe.name };
      });
      dispatch(loadEmployeesSuccess(newEmployee));
    } catch (error) {
      dispatch(loadEmployeesFailure());
    }
  };
}
export function postEmployees(values) {
  return async (dispatch) => {
    try {
      const response = await instance.post(`/employees`, {
        name: values.name,
        title: values.title,
        tribe_id: values.tribe,
      });
      const newEmployee = await instance.get(`/employees/${response.data.id}`);
      const newEmployeeParsed = {...newEmployee, tribe: newEmployee.tribe.name};
      dispatch(postEmployeeSuccess(newEmployeeParsed));
    } catch (error) {
      dispatch(loadEmployeesFailure());
    }
  };
}
export function putEmployees(values, id) {
  return async (dispatch) => {
    try {
      const response = await instance.put(`/employees/${id}`, {
        id: values.id,
        name: values.name,
        title: values.title,
        tribe_id: values.tribe,
      });

      if (response.data.success === true){
        //conditioning whether there is any new update based on server's response
      dispatch(fetchEmployees());
      }
    } catch (error) {
      dispatch(loadEmployeesFailure());
    }
  };
}

export function deleteEmployee(id) {
  return async (dispatch) => {
    try {
      await instance.delete(`/employees/${id}`);
      dispatch(loadOnDelete(id));
    } catch (error) {
      dispatch(loadEmployeesFailure());
      console.log(error);
    }
  };
}
