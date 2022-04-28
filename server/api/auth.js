
const database = require("../database/connection");
database.connect();


const { Identity } = require("../database/models");

const register = (req, res, next) => {
    console.log(req.body);
    if (req.body) {
        req.body.USERNAME = req.body.EMAIL.split("@").shift();
        Identity.create(req.body);
    }
    res.json({ succes: true, message: "Successfuly" });
}

const login = (req, res, next) => {
    Identity.findOne(req.body, (err, usr) => {
        res.json(usr ? { success: true, message: "Successfully logged in" } : { success: false, message: "Not found" })
    });
};

module.exports = {
    register,
    login
}