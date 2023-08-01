import '@babel/polyfill';
import axios from 'axios';
import { showAlert } from './alert';

export const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'post',
      url: '/api/v1/users/login',
      credentials: 'include',
      data: {
        email,
        password,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Logged in successfully');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const logout = async (req, res) => {
  try {
    const res = await axios({
      method: 'get',
      url: '/api/v1/users/logout',
    });

    if (res.data.status === 'success') {
      // passing true in the reload method for restarting the server!
      location.reload(true);
    }
  } catch (err) {
    showAlert('Error', 'Error logging out! Try again.');
  }
};
