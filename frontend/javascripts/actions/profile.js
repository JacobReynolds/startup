import axios from '../util/axios.js';

export function getProfileAction() {
  return {
    type: "GET_PROFILE",
    payload: axios.get('/profile')
  }
}
