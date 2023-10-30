import { createSlice } from "@reduxjs/toolkit";

export const tribesSlice = createSlice({
  name: "tribes",
  initialState: {
    loading: false,
    tribeList: [],
  },
  reducers: {
    loadTribes: (state) => {
      state.loading = true;
    },
    loadTribesSuccess: (state, action) => {
      state.loading = false;
      state.tribeList = action.payload;
    },
    loadTribesFailure: (state) => {
      state.loading = false;
    },
  },
});

export const { loadTribes, loadTribesSuccess, loadTribesFailure } =
  tribesSlice.actions;

export default tribesSlice.reducer;
