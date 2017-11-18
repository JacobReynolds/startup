const defaults = {
  fetching: false,
  fetched: false,
  error: false,
  username: ''
}

const profileReducer = (state = defaults, action) => {
  switch (action.type) {
    case "GET_PROFILE_PENDING":
      return {
        ...state,
        fetching: true
      }
    case "GET_PROFILE_FULFILLED":
      return {
        ...state,
        ...action.payload.data,
        fetched: true,
        fetching: false
      }
    case "GET_PROFILE_REJECTED":
      return {
        ...state,
        fetching: false,
        error: true
      }
    case "LOGOFF_FULFILLED":
      return {
        ...defaults
      }
    default:
      return {
        ...state
      };
  }
}

export default profileReducer
