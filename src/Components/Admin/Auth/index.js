import { server } from "../../../api";
import axios from 'axios';

const setToken = data => {
    sessionStorage.setItem('token', data.token);
    console.log(data)
    console.log(data.token)
};

const getToken = () => window.sessionStorage.getItem('token');

const removeToken = () => window.sessionStorage.removeItem('token');

const signInUser = credentials => {
    console.log(credentials)
    return fetch(`${ server }/auth`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        // credentials: 'cors',
        body: JSON.stringify(credentials),
    })
    .then(res=>console.log(res));
};
export { signInUser, setToken, getToken, removeToken };