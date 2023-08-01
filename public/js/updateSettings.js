import axios from 'axios';
import { showAlert } from './alert';

// type is either data or password
export const updateSettings = async (data, type) => {
  const url =
    type === 'data'
      ? '/api/v1/users/updateMe'
      : '/api/v1/users/updateMyPassword';
  try {
    const res = await axios({
      method: 'patch',
      url,
      credetinals: 'include',
      data,
    });

    if (res.data.status === 'success') {
      showAlert('success', `Updated user ${type.toUpperCase()}!`);
      // window.setTimeout(() => {
      //   location.assign('/');
      // }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
