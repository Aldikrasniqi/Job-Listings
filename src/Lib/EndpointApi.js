import axios from 'axios';
import { store } from '../Store/Store.jsx';

export const ENDPOINTS = {
  register: { method: 'POST', url: '/register' },
  verifyAccount: { method: 'GET', url: '/verify-account' },
  login: { method: 'POST', url: '/login' },
  forgotPasswordRequest: { method: 'POST', url: '/forgot-password-request' },
  resetPassword: { method: 'POST', url: '/reset-password' },
};
const apiInstance = axios.create({
  baseURL: 'http://localhost:4001/auth',
});

apiInstance.interceptors.request.use((config) => {
  const auth = store.getState().auth.value;
  if (auth) {
    config.headers = {
      Authorization: 'Bearer ' + auth?.token,
    };
  }
  return config;
});

export const apiCall = async (endpoint, options = null) => {
  let data = {};
  if (options) {
    data = options.data;
  }

  try {
    const response = await apiInstance({
      ...endpoint,
      data,
    });
    return response.data;
  } catch (error) {
    throw error; // Throw the error for handling in the calling function
  }
};
