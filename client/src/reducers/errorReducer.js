
const initialState = {
  msg: {},
  id: null
}

export default function(state = initialState, action) {
  switch(action.type) {
    case "GET_ERRORS":
      return {
        msg: action.payload.msg,
        id: action.payload.id
      }

    case "CLEAR_ERRORS":
      return {
        msg: {},
        id: null
      }

    default:
      return state
  }
}