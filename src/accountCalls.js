import API from './api';

const restorePassword = email =>
  API.post('account/restore-password', { email }).then(response => response.data);

export default restorePassword;
