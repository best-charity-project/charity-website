import { server } from "../../../api";
import axios from 'axios';

const setToken = data => {
    localStorage.setItem('token', data.token);
};

const getToken = () => window.localStorage.getItem('token');

const removeToken = () => window.localStorage.removeItem('token');

const signInAdmin = credentials => {
    return axios({
        method:'post',
        url:`${ server }/api/auth`,
        data:credentials,
        config:{
            headers:{
                'Content-Type': 'application/json'
            }
        }
    })
};

const signInUser = credentials => {
    return axios({
        method:'post',
        url:`${ server }/api/user-auth`,
        data:credentials,
        config:{
            headers:{
                'Content-Type': 'application/json'
            }
        }
    })
};

export { signInUser, signInAdmin, setToken, getToken, removeToken };