
const { default: mongoose } = require("mongoose");
const database = require("../database/connection");
const handleErrors = require("../middleware/handleDbErrors.js");

database.connect();

const { Feedback } = require("../database/models");
const { Comment } = require("../database/models");


const create = (req, res, next) => {
    if (!req.body.USERID) return
    Feedback.create(req.body, (err, data) => {
        if (handleErrors(err?.errors)) res.json({ success: false, message: handleErrors(err.errors) })
        else res.json({ success: true, message: "Successfuly" });
    });

}

const update = (req, res) => {
    if (req.body && !!req.body._id) {
        Feedback.findOneAndUpdate({ _id: req.body._id }, req.body, (err, data) => {
            if (err) { console.log(err); return; }
            res.json({ success: true, message: "Successfuly" });
        });

    }
}
const getByUser = (req, res, next) => {
    if (!req.body.USERID) return
    console.log(req.body.USERID)
    Feedback.find({ USERID: req.body.USERID }, (err, feedbacks) => {
        if (err) return
        res.json({ success: true, message: "Successfuly", data: feedbacks });
    });
}

const get = (req, res) => {
    let { sort, category } = req.body.filter;
    category = category == "All" ? { $ne: "" } : category

    Feedback.find({ CATEGORY: category }, (err, feedbacks) => {
        if (err) return
        res.json({ success: true, message: "Successfuly", data: feedbacks });
    }).populate('USERID').limit(10);
}

const getById = (req, res) => {
    if (!req.params.id) return
    Feedback.findById(req.params.id, (err, feedback) => {
        if (err) return
        Comment.find({ FEEDBACK_ID: feedback.id }, { COMMENT: 1, CREATED_DATE: 1, _id: 1 }, (err, comment) => {
            res.json({ success: true, message: "Successfuly", data: { data: feedback, ownFeedback: req.body.USERID == feedback.USERID && !!req.body.USERID, comments: comment, currentUserId: req.body.USERID } });
        }).populate('USERID');

    });
}

const softDelete = (req, res) => {
    if (!req.body.USERID || !req.params.id) return
    Feedback.deleteOne({ _id: req.params.id, USERID: req.body.USERID }, (err, feedback) => {
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