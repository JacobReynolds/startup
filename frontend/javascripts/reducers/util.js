const defaults = {
  error: null,
  message: null
}

const utilReducer = (state = defaults, action) => {
  if (/.*_REJECTED/.test(action.type) && typeof action.payload.response.data.message == "string") {
    return {
      ...state,
      error: action.payload.response.data.message
    }
  }
  switch (action.type) {
    case "ERROR":
      return {
        ...state,
        error: action.payload
      }
    case "CLEAR_ERROR":
      return {
        ...state,
        error: null
      }
        case "MESSAGE":
          return {
            ...state,
            message: action.payload
          }
        case "CLEAR_MESSAGE":
          return {
            ...state,
            message: null
          }
    case "@@router/LOCATION_CHANGE":
      return {
        ...state,
        error: null,
        message: null
      }
    default:
      return {
        ...state
      };
  }
}

export default utilReducer
