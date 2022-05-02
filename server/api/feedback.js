
const database = require("../database/connection");
database.connect();


const { Feedback } = require("../database/models");

const create = (req, res, next) => {
    if (req.body && !!req.body.TITLE) {
        req.body.USERID = req.userId
        Feedback.create(req.body);
        res.json({ success: true, message: "Successfuly" });
    }
}

const update = (req, res) => {
    console.log(req.body)
    if (req.body && !!req.body._id) {
        req.body.USERID = req.userId

        Feedback.findOneAndUpdate({ id: req.body.id }, req.body, (err, feedback) => {
            if (err) return
            res.json({ success: true, message: "Successfuly" });
        });

    }
}
const getByUser = (req, res, next) => {
    if (!req.userId) return
    Feedback.find({ USERID: req.userId }, (err, feedbacks) => {
        if (err) return
        res.json({ success: true, message: "Successfuly", data: feedbacks });
    });
}

const get = (req, res) => {
    Feedback.find({}, (err, feedbacks) => {
        if (err) return
        res.json({ success: true, message: "Successfuly", data: feedbacks });
    }).limit(10);
}

const getById = (req, res) => {
    if (!req.params.id) return
    Feedback.findById(req.params.id, (err, feedback) => {
        if (err) return

        console.log(req.userId, feedback.USERID)
        res.json({ success: true, message: "Successfuly", data: { data: feedback, ownFeedback: req.userId == feedback.USERID } });
    });
}

const softDelete = (req, res) => {
    console.log(req.params.id)
    if (!req.userId || !req.params.id) return
    Feedback.deleteOne({ id: req.params.id }, (err, feedback) => {
        if (err) return
        res.json({ success: true, message: "Successfuly" });
    });
}


module.exports = {
    create,
    update,
    getByUser,
    get,
    getById,
    softDelete
}