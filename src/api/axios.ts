import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
})

const authErrorCodes = [
    "TOKEN_MISSING",
    "TOKEN_INVALID",
    "TOKEN_EXPIRED",
    "TOKEN_INVALID_PAYLOAD",
    "USER_INVALID_SCHEMA",
];

let clearContext: (() => void) | null = null;;

export const setClearContext = (callback: () => void) => {
    clearContext = callback
};



api.interceptors.response.use(null, (error) => {
    const navigate = useNavigate()
    if ( authErrorCodes.includes(error.response?.data?.code) ) {
        if (clearContext) {
            clearContext()
        }
        navigate('/')
        return
    }
    return Promise.reject(error)
}
);