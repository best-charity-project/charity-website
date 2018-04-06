import API from './api';
import { getToken } from './Auth/Auth';

const restorePassword = email =>
  API.post('account/restore-password', { email }).then(response => response.data);

const changePassword = data =>
  API.post('account/change-password', data, {
    headers: { Authorization: `Bearer ${getToken()}` },
  }).then(response => response.data);

const changeForgottenPassword = data =>
  API.post('account/change-forgotten-password', data).then(response => response.data);

const isValidToken = token =>
  API.get(`account/${token}`).then(response => response.data.isValidToken);

export { restorePassword, changePassword, isValidToken, changeForgottenPassword };
