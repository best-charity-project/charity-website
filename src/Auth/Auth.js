import API from '../api';

const getToken = () => window.localStorage.getItem('token');

const setToken = (token) => {
  window.localStorage.setItem('token', token);
};

const deleteToken = () => {
  window.localStorage.removeItem('token');
};

const getUserAuthInfo = () =>
  API.get('auth-info', { headers: { Authorization: `Bearer ${getToken()}` } }).then(res => res.data.userInfo);

const loginUser = credentials =>
  API.post('login', credentials).then((res) => {
    const { token } = res.data;
    if (token) {
      setToken(token);
      return res.data.userInfo;
    }
    return null;
  });

const signupUser = credentials =>
  API.post('signup', credentials).then((res) => {
    const { token } = res.data;
    if (token) {
      setToken(token);
      return res.data;
    }
    return res.data;
  });

const logoutUser = () => {
  deleteToken();
};

export { getUserAuthInfo, logoutUser, loginUser, signupUser };
