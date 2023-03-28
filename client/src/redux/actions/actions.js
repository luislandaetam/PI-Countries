import {
  GET_ALL_COUNTRIES,
  GET_BY_ID,
  GET_BY_NAME,
  GET_ACTIVITIES,
  SORT_A_TO_Z,
  SORT_Z_TO_A,
  HIGHEST_POPULATION,
  LOWEST_POPULATION,
  FILTER_BY_CONTINENT,
  NEXT_GROUP,
  PREV_GROUP,
  IS_LOADING,
  DOESNT_EXIST,
  CREATE_ACTIVITY,
  FILTER_BY_ACTIVITY,
} from "./action-types.js";
import axios from "axios";

export const getAllCountries = () => {
  return async function (dispatch) {
    dispatch({ type: IS_LOADING });
    await axios.get("/countries").then((res) => {
      return dispatch({ type: GET_ALL_COUNTRIES, payload: res.data });
    });
  };
};

export const getById = (id) => {
  return async function (dispatch) {
    dispatch({ type: IS_LOADING });
    await axios.get(`/countries/${id}`).then((res) => {
      if (!res.data) {
        return dispatch({ type: DOESNT_EXIST, payload: { name: -1 } });
      }
      return dispatch({ type: GET_BY_ID, payload: res.data });
    });
  };
};

export const getByName = (name) => {
  return async function (dispatch) {
    dispatch({ type: IS_LOADING });
    await axios.get(`/countries?name=${name}`).then((res) => {
      if (res.data.length === 0) {
        return dispatch({ type: DOESNT_EXIST, payload: ["-1"] });
      }
      return dispatch({ type: GET_BY_NAME, payload: res.data });
    });
  };
};

export const getActivities = () => {
  return async function (dispatch) {
    dispatch({ type: IS_LOADING });
    await axios.get("/activities").then((res) => {
      if (res.data.length === 0) {
        return dispatch({ type: DOESNT_EXIST, payload: ["-2"] });
      }
      return dispatch({ type: GET_ACTIVITIES, payload: res.data });
    });
  };
};

export const createActivity = (activityDetails) => {
  return async function (dispatch) {
    console.log(activityDetails);
    await axios.post("/activities", activityDetails);
    dispatch({ type: CREATE_ACTIVITY });
    return (window.location.pathname = "/countries");
  };
};

export const sortAZ = () => {
  return function (dispatch) {
    dispatch({ type: IS_LOADING });
    return dispatch({ type: SORT_A_TO_Z });
  };
};

export const sortZA = () => {
  return function (dispatch) {
    dispatch({ type: IS_LOADING });
    return dispatch({ type: SORT_Z_TO_A });
  };
};

export const sortHighest = () => {
  return function (dispatch) {
    dispatch({ type: IS_LOADING });
    return dispatch({ type: HIGHEST_POPULATION });
  };
};

export const sortLowest = () => {
  return function (dispatch) {
    dispatch({ type: IS_LOADING });
    return dispatch({ type: LOWEST_POPULATION });
  };
};

export const filterByContinent = (continent) => {
  return function (dispatch) {
    dispatch({ type: IS_LOADING });
    return dispatch({ type: FILTER_BY_CONTINENT, payload: continent });
  };
};

export const filterByActivity = (activity) => {
  return function (dispatch) {
    dispatch({ type: IS_LOADING });
    return dispatch({ type: FILTER_BY_ACTIVITY, payload: activity });
  };
};

export const nextGroup = (currentPage) => {
  return function (dispatch) {
    dispatch({ type: IS_LOADING });
    return dispatch({ type: NEXT_GROUP, payload: currentPage });
  };
};

export const prevGroup = (currentPage) => {
  return function (dispatch) {
    dispatch({ type: IS_LOADING });
    return dispatch({ type: PREV_GROUP, payload: currentPage });
  };
};
