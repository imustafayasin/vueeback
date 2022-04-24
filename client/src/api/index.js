const axios = require('axios');

const BASE_URL = "http://localhost:3000";
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


const request = async (method, path, data) => {
    axios({
        method,
        url: BASE_URL + path,
        data
    })
        .then(result => result)
        .catch(result => {
            console.log(result)
            throw result.response
        });
}

export const auth = {
    login() {
        return request('POST', '/register', { name: "Yasin" })
    }
}

