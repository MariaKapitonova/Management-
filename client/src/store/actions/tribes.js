import instance from "../../index";
import {
  loadTribes,
  loadTribesFailure,
  loadTribesSuccess,
} from "../slices/tribesSlice";

export function fetchTribes() {
  return async (dispatch) => {
    dispatch(loadTribes());
    try {
      const response = await instance.get(`/tribes`);
      const data = response.data;
      dispatch(loadTribesSuccess(data));
    } catch (error) {
      dispatch(loadTribesFailure());
    }
  };
}
