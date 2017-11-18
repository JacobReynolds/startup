import axios from '../util/axios.js';

export function registerAction(username, email, password) {
  return {
    type: "REGISTER",
    payload: axios.post('/register', {username, email, password})
  }
}

export function loginAction(email, password) {
  return {
    type: "LOGIN",
    payload: axios.post('/login', {email, password})
  }
}

export function forgotPasswordAction(email, password) {
  return {
    type: "FORGOT_PASSWORD",
    payload: axios.post('/profile/forgot', {email})
  }
}

export function resetPasswordAction(password, reset) {
  return {
    type: "RESET_PASSWORD",
    payload: axios.post('/profile/reset', {password, resetToken: reset})
  }
}

export function logoffAction(email, password) {
  return {type: "LOGOFF", payload: axios.post('/logoff')}
}

export function confirmProfileAction(confirmationToken) {
  return {
    type: "CONFIRM_PROFILE",
    payload: axios.post('/profile/confirm', {confirmationToken})
  }
}
