import { createSlice } from "@reduxjs/toolkit";
export const employeesSlice = createSlice({
  name: "employees",
  initialState: {
    loading: false,
    employeesList: [],
  },
  reducers: {
    loadEmployees: (state) => {
      state.loading = true;
    },
    loadEmployeesSuccess: (state, action) => {
      state.loading = false;
      state.employeesList = action.payload;
    },
    postEmployeeSuccess: (state, action)=>{
      state.loading = false;
      state.employeesList = [...state.employeesList, action.payload];
    },
    loadEmployeesFailure: (state) => {
      state.loading = false;
    },
    loadOnDelete: (state, action) => {
      state.loading = false;
      const updatedList = state.employeesList.filter ((employee)=>employee.id !== action.payload);
      state.employeesList = updatedList;
    },
    loadOnPost: (state, action) => {
      state.loading = false;
    },
  },
});
export const {
  loadEmployees,
  loadEmployeesSuccess,
  loadEmployeesFailure,
  loadOnDelete,
  loadOnDeleteFailure,
  loadOnPost,
  postEmployeeSuccess,
  putEmployeeSuccess,
} = employeesSlice.actions;

export default employeesSlice.reducer;
