import API from './api';
import { getToken } from './Auth/Auth';

const restorePassword = email =>
  API.post('account/restore-password', { email }).then(response => response.data);

const changePassword = data =>
  API.post('account/change-password', data, {
    headers: { Authorization: `Bearer ${getToken()}` },
  }).then(response => response.data);

export { restorePassword, changePassword };
