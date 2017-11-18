export function clearErrorAction() {
  return {
    type: "CLEAR_ERROR",
    payload: null
  }
}

export function errorAction(error) {
  return {
    type: "ERROR",
    payload:  error
  }
}

export function clearMessageAction(message) {
  return {
    type: "MESSAGE",
    payload:  message
  }
}

export function messageAction(message) {
  return {
    type: "MESSAGE",
    payload:  message
  }
}
