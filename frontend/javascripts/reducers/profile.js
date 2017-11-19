const defaults = {
  fetching: false,
  fetched: false,
  error: false,
  username: '',
  register: {
    fetching: false,
    fetched: false,
    error: false
  },
  login: {
    fetching: false,
    fetched: false,
    error: false
  }
}

const profileReducer = (state = defaults, action) => {
  switch (action.type) {
    case "GET_PROFILE_PENDING":
      return {
        ...state,
        fetching: true,
        error: false
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
    case "REGISTER_PENDING":
      return {
        ...state,
        register: {
          fetching: true
        }
      }
    case "REGISTER_FULFILLED":
      return {
        ...state,
        register: {
          fetched: true,
          fetching: false
        }
      }
    case "REGISTER_REJECTED":
      return {
        ...state,
        register: {
          fetching: false,
          error: true
        }
      }
    case "LOGIN_PENDING":
      return {
        ...state,
        login: {
          fetching: true
        }
      }
    case "LOGIN_FULFILLED":
      return {
        ...state,
        login: {
          fetched: true,
          fetching: false
        }
      }
    case "LOGIN_REJECTED":
      return {
        ...state,
        login: {
          fetching: false,
          error: true
        }
      }
    case "DELETE_PROFILE":
      return defaults;
    default:
      return {
  ...state
};
  }
}

export default profileReducer
