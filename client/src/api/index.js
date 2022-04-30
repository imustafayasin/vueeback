import { mapActions, mapGetters } from 'vuex';

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
            let { success, message } = result.data;
            notification.default(message, success);
            if (!success) return
            return result.data;
        })
        .catch(result => {
            console.log(result)
            throw result.response
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
    getUserFeedbacks() {
        return request("POST", "/feedback/getByUser")
    }
}

export const user = {
    get() {
        return request("POST", "/authuser")
    }
}

