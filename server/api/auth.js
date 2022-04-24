
const database = require("../database/connection");
database.connect();


const { Identity } = require("../database/models");
//to do add identity

const register = (req, res, next) => {
    console.log("register a ulaşıldı");
    Identity.create(sreq.body)
}

module.exports = {
    register
}