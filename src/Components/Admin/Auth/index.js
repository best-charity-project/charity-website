const setToken = data => {
    sessionStorage.setItem('token', data.token);
};

const signInUser = credentials => {
    console.log(credentials);
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
export { signInUser, setToken };