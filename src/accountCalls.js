import API from './api';
import appendAuthorizationHeaders from './appendAuthorizationHeaders';

const restorePassword = email =>
  API.post('account/restore-password', { email }).then(response => response.data);

const changePassword = data =>
  API.post('account/change-password', data, { headers: appendAuthorizationHeaders() }).then(response => response.data);

const changeForgottenPassword = data =>
  API.post('account/change-forgotten-password', data).then(response => response.data);

const isValidToken = token =>
  API.get(`account/${token}`).then(response => response.data.isValidToken);

export { restorePassword, changePassword, isValidToken, changeForgottenPassword };
