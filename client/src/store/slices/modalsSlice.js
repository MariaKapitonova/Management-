import { createSlice } from "@reduxjs/toolkit";

export const modalsSlice = createSlice({
  name: "modals",
  initialState: {
    editEmployee: false,
    addEmployee: false,
  },
  reducers: {
    handleCloseAdd: (state) => {
      state.addEmployee = false;
    },
    handleShowAdd: (state) => {
      state.addEmployee = true;
    },
    handleCloseEdit: (state) => {
      state.editEmployee = false;
    },
    handleShowEdit: (state) => {
      state.editEmployee = true;
    },
  },
});

export const {
  handleCloseAdd,
  handleShowAdd,
  handleCloseEdit,
  handleShowEdit,
} = modalsSlice.actions;

export default modalsSlice.reducer;
