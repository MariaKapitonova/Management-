import { configureStore } from "@reduxjs/toolkit";
import employeesReducer from "./slices/employeesSlice";
import modalsReducer from "./slices/modalsSlice";
import tribesReducer from "./slices/tribesSlice";

export default configureStore({
  reducer: {
    employees: employeesReducer,
    modals: modalsReducer,
    tribes: tribesReducer,
  },
});
