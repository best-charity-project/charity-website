import { server } from "../../../api";
import axios from 'axios';

const setToken = data => {
    sessionStorage.setItem('token', data.token);
};

const getToken = () => window.sessionStorage.getItem('token');

const removeToken = () => window.sessionStorage.removeItem('token');

const signInUser = credentials => {
    return fetch(`${ server }/auth`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json; charset=UTF-8',
        },
        // credentials: 'cors', 
        body: JSON.stringify(credentials),
    });
};
export { signInUser, setToken, getToken, removeToken };