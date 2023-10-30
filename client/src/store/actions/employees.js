import instance from "../../index";
import {
  loadEmployees,
  loadEmployeesFailure,
  loadEmployeesSuccess,
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
      const data = response.data;
      dispatch(fetchEmployees());
      return data;
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
      const data = response.data;
      dispatch(fetchEmployees());
      return data;
    } catch (error) {
      dispatch(loadEmployeesFailure());
    }
  };
}
