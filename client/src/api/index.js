const axios = require('axios');

const BASE_URL = "http://localhost:3000";
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


const request = (method, path, data) => {
    return axios({
        method,
        url: BASE_URL + path,
        data
    })
        .then(result => result.data)
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
        return request('POST', '/login', {EMAIL, PASSWORD })
    }
}

