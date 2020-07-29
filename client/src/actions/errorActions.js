
export const returnError = (msg, id = null) => {
  return {
    type: "GET_ERRORS",
    payload: {msg, id}
  }
}

export const clearError = () => {
  return {
    type: "CLEAR_ERRORS"
  }
}