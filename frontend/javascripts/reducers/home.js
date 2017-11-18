const homeReducer = (state = [], action) => {
  switch (action.type) {
    case "update":
      return {
        ...state,
        test: action.payload
      }
    default:
      return {...state};
  }
}


export default homeReducer
/*
case "SUBMIT_DATA_PENDING":
return {
  ...state,
  requestStatus: 'Request pending'
}
case "SUBMIT_DATA_FULFILLED":
return {
  ...state,
  requestStatus: 'Request fulfilled'
}
case "SUBMIT_DATA_REJECTED":
return {
  ...state,
  requestStatus: 'Request rejected'
}*/
