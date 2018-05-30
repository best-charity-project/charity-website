const setToken = data => {
    sessionStorage.setItem('token', data.token);
};

const getToken = () => window.sessionStorage.getItem('token');

const removeToken = () => window.sessionStorage.removeItem('token');

const signInUser = credentials => {
    return fetch('http://localhost:3001/api/auth', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        credentials: 'cors',
        body: JSON.stringify(credentials),
    });
};
export { signInUser, setToken, getToken, removeToken };