import axios from "axios";
import {returnError} from "./errorActions";

export const tokenConfig = (getState) => {
  const token = getState().auth.token;

  const config = {
    headers: {
      "Content-type": "application/json"
    }
  }
  if (token) {
    config.headers["x-auth-token"] = token;
  }
  return config;
}

export const loadUser = () => (dispatch, getState) => {
  dispatch({type: "USER_LOADING"});

  axios.get("/api/users/", tokenConfig(getState))
  .then(res => dispatch({
    type: "USER_LOADED",
    payload: res.data
  }))
  .catch(err => {
    dispatch(returnError(err.response.data, err.response.status))
    dispatch({
      type: "AUTH_ERROR"
    })
  })
}

export const register = ({name, email, password}) => dispatch => {
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  }
  const body = JSON.stringify({name, email, password});
  axios.post("/api/users/register", body, config)
  .then(res => dispatch({
    type: "REGISTER_SUCCESS",
    payload: res.data
  }))
  .catch(err => {
    dispatch(returnError(err.response.data, "REGISTER_FAIL"))
    dispatch({
      type: "REGISTER_FAIL"
    })
  })
}

export const login = ({email, password}) => dispatch => {
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  }
  const body = JSON.stringify({email, password});
  axios.post("/api/users/login", body, config)
  .then(res => dispatch({
    type: "LOGIN_SUCCESS",
    payload: res.data
  }))
  .catch(err => {
    dispatch(returnError(err.response.data, "LOGIN_FAIL"))
    dispatch({
      type: "LOGIN_FAIL"
    })
  })
}

export const logout = () => {
  return {
    type: "LOGOUT"
  }
}