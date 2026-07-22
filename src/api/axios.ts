import axios from 'axios'

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
    "INVALID_CREDENTIALS",
    "USER_INVALID_SCHEMA",
];

let logout: (() => void) | null = null;;

export const setLogout = (callback: () => void) => {
    logout = callback
};

api.interceptors.response.use(null, (error) => {
    if ( authErrorCodes.includes(error.response?.data?.code) ) {
        if (logout) {
            logout()
        }
    }
    return Promise.reject(error)
}
);