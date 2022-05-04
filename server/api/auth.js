
const database = require("../database/connection");
database.connect();
const jwt = require("jsonwebtoken");
const { Identity } = require("../database/models");
const handleErrors = require("../middleware/handleDbErrors.js");


const register = (req, res, next) => {
    req.body.USERNAME = req.body.EMAIL.split("@").shift();
    Identity.create(req.body, (err, data) => {

        if (handleErrors(err?.errors)) return res.json({ success: false, message: handleErrors(err.errors) });
        else return res.json({ success: true, message: "Successfuly" });

    })
}

const login = (req, res, next) => {
    Identity.findOne(req.body, (err, usr) => {
        if (handleErrors(err?.errors)) return res.json({ success: false, message: handleErrors(err.errors) })

        if (usr) {
            const token = jwt.sign({ _id: usr._id }, 'yasin');
            return res.header('Authorization', token).json({ success: true, message: "Successfully logged in", accessToken: token })
        }

        else return res.json({ success: false, message: "Not found" })
    });
};
const getAuthUser = (req, res) => {
    Identity.findOne({ _id: req.body.USERID }, (err, usr) => {
        if (handleErrors(err?.errors)) return res.json({ success: false, message: handleErrors(err.errors) })

        if (usr) {
            let { EMAIL, USERNAME, LASTNAME, NAME, FULLNAME } = usr;
            return res.json({ success: true, message: "Success", data: { EMAIL, USERNAME, LASTNAME, NAME, FULLNAME } })
        }

        else return res.json({ succes: false, message: "Not found" })
    });
};


module.exports = {
    register,
    login,
    getAuthUser
}