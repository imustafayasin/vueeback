
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
            if (handleErrors(err?.errors)) res.json({ success: false, message: handleErrors(err.errors) })
            else res.json({ success: true, message: "Successfuly" });
        });

    }
}
const getByUser = (req, res, next) => {
    if (!req.body.USERID) return
    Feedback.find({ USERID: req.body.USERID }, (err, feedbacks) => {
        if (handleErrors(err?.errors)) res.json({ success: false, message: handleErrors(err.errors) })
        else res.json({ success: true, message: "Successfuly", data: feedbacks });
    });
}

const get = (req, res) => {
    let { sort, category } = req.body.filter;
    category = category == "All" ? { $ne: "" } : category

    Feedback.find({ CATEGORY: category }, (err, feedbacks) => {
        if (handleErrors(err?.errors)) res.json({ success: false, message: handleErrors(err.errors) })
        else res.json({ success: true, message: "Successfuly", data: feedbacks });
    }).populate('USERID',{PASSWORD:0,EMAIL:0}).limit(10);
}

const getById = (req, res) => {
    if (!req.params.id) return
    Feedback.findById(req.params.id, (err, feedback) => {
        if (handleErrors(err?.errors)) res.json({ success: false, message: handleErrors(err.errors) })
        else {
            Comment.find({ FEEDBACK_ID: feedback.id }, { COMMENT: 1, CREATED_DATE: 1, _id: 1 }, (err, comment) => {
                res.json({ success: true, message: "Successfuly", data: { data: feedback, ownFeedback: req.body.USERID == feedback.USERID && !!req.body.USERID, comments: comment, currentUserId: req.body.USERID } });
            }).populate('USERID',{PASSWORD:0,EMAIL:0});
        }
    });
}

const softDelete = (req, res) => {
    if (!req.body.USERID || !req.params.id) return
    let feedbackId = req.params.id;
    Feedback.deleteOne({ _id: req.params.id, USERID: req.body.USERID }, (err, feedback) => {
        if (handleErrors(err?.errors)) res.json({ success: false, message: handleErrors(err.errors) })
        else {
            Comment.deleteMany({ FEEDBACK_ID: feedbackId }, (err, comment) => { });
            res.json({ success: true, message: "Successfuly" })
        };
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