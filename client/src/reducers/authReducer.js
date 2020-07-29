// reducer to handle user authentication

const initialState = {
  isAuthenticated: null,
  token: null,
  msg: "",
  user: {},
  isLoading: false
}

export default function(state = initialState, action) {
  switch(action.type) {
    case "USER_LOADING":
    return {
      ...state,
      isLoading: true
    }

    case "USER_LOADED":
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload
      }
     

    case "REGISTER_SUCCESS":
    case "LOGIN_SUCCESS":
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
      }

    case "REGISTER_FAIL":
    case "LOGOUT":
    case "LOGIN_FAIL":
      localStorage.removeItem("token");
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        user: {}
      }

    default:
      return state;
  }
}