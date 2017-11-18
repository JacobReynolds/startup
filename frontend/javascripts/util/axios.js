import axios from 'axios';
var authToken = null;
axios.defaults.baseURL = 'http://localhost:3000';

export function setAuthToken(token) {
  axios.defaults.headers.post['Authorization'] = 'ServAuth ' + token;
  axios.defaults.headers.put['Authorization'] = 'ServAuth ' + token;
  axios.defaults.headers.delete['Authorization'] = 'ServAuth ' + token;
  axios.defaults.headers.patch['Authorization'] = 'ServAuth ' + token;
  axios.defaults.headers.get['Authorization'] = 'ServAuth ' + token;
}

export function clearAuthToken() {
  axios.defaults.headers.post['Authorization'] = '';
  axios.defaults.headers.get['Authorization'] = '';
}

var authToken = localStorage.getItem('authToken');
if (authToken) {
  setAuthToken(authToken);
} else {
  setAuthToken('unauth');
}

export default axios;
