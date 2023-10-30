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
    loadEmployeesFailure: (state) => {
      state.loading = false;
    },
    loadOnDelete: (state, action) => {
      state.loading = false;
      state.employeesList = action.payload;
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
} = employeesSlice.actions;

export default employeesSlice.reducer;
