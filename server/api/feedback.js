
const database = require("../database/connection");
database.connect();


const { Feedback } = require("../database/models");

const create = (req, res, next) => {
    if (req.body && !!req.body.TITLE) {
        console.log(req.body);
        req.body.USERID = req.userId
        Feedback.create(req.body);
        res.json({ success: true, message: "Successfuly" });
    }
}
const getByUser = (req, res, next) => {
    if (!req.userId) return
    Feedback.find({ USERID: req.userId }, { TITLE: 1, CATEGORY: 1, _id: 0 }, (err, feedbacks) => {
        if (err) return
        res.json({ success: true, message: "Successfuly", data: feedbacks });
    });
}


module.exports = {
    create,
    getByUser
}