
const database = require("../database/connection");
database.connect();


const { Feedback } = require("../database/models");

const create = (req, res, next) => {
    if (req.body && !!req.body.TITLE) {
        console.log(req.body);
        req.body.USERID = req.userId
        Feedback.create(req.body, (err, feedback) => {
            console.log(err, feedback)
        });
        res.json({ success: true, message: "Successfuly" });
    }
}


module.exports = {
    create
}