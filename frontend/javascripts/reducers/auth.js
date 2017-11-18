const defaults = {
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
    default:
      return {
        ...state
      };
  }
}

export default profileReducer;
