import {
  handleCloseAdd,
  handleCloseEdit,
  handleShowAdd,
  handleShowEdit,
} from "../slices/modalsSlice";

export function showEdit() {
  return (dispatch) => {
    dispatch(handleShowEdit());
  };
}
export function closeEdit() {
  return async (dispatch) => {
    await dispatch(handleCloseEdit());
  };
}
export function showAdd() {
  return async (dispatch) => {
    await dispatch(handleShowAdd());
  };
}
export function closeAdd() {
  return async (dispatch) => {
    await dispatch(handleCloseAdd());
  };
}
