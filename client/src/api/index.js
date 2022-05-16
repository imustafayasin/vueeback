const axios = require('axios');
const notification = require('../utils/notification.js');
const BASE_URL = "http://localhost:3000";
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
export const setAuthInHeader = token => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token ?? localStorage.getItem('token')}`
}
setAuthInHeader()

const request = (method, path, data) => {
    return axios({
        method,
        url: BASE_URL + path,
        data
    })
        .then(result => {
            let { success, message, data, unAuthorized } = result.data;
            if (unAuthorized) location.href = "/login";
            !data ? notification.default(message, success) : "";
            if (!success) throw result.data;
            return result.data;
        })
        .catch(result => {
            throw result.message
        });
}


export const auth = {
    register(NAME, LASTNAME, EMAIL, PASSWORD) {
        return request('POST', '/register', { NAME, LASTNAME, EMAIL, PASSWORD })
    },
    login(EMAIL, PASSWORD) {
        return request('POST', '/login', { EMAIL, PASSWORD })
    }
}


export const feedback = {
    create(data) {
        return request("POST", "/feedback/create", data)
    },
    update(data) {
        return request("POST", "/feedback/update", data)
    },
    getUserFeedbacks() {
        return request("POST", "/feedback/getByUser")
    },
    get(filter) {
        return request("POST", "/feedback/get", { filter })
    },
    getById(id) {
        return request("GET", `/feedback/get/${id}`)
    },
    delete(id) {
        return request("GET", `/feedback/delete/${id}`)
    }
}

export const user = {
    get() {
        return request("POST", "/authuser")
    }
}

export const comment = {
    add(data) {
        return request("POST", "/feedback/addComment", data)
    },
    delete(id) {
        return request("POST", "/feedback/deleteComment", { id })
    }
}
