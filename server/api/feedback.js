
const database = require("../database/connection");
const handleErrors = require("../middleware/handleDbErrors.js");

database.connect();

const { Feedback } = require("../database/models");
const { Comment } = require("../database/models");


const create = (req, res, next) => {
    if (!req.body.USER) return
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
    if (!req.body.USER) return
    Feedback.find({ USER: req.body.USER }, (err, feedbacks) => {
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
    }).populate('USER', { PASSWORD: 0, EMAIL: 0 }).limit(10);
}

const getById = (req, res) => {
    if (!req.params.id) return
    Feedback.findById(req.params.id, (err, feedback) => {
        if (handleErrors(err?.errors)) res.json({ success: false, message: handleErrors(err.errors) })
        else {
            Comment.find({ FEEDBACK_ID: feedback.id }, { COMMENT: 1, CREATED_DATE: 1, _id: 1 }, (err, comment) => {
                res.json({ success: true, message: "Successfuly", data: { data: feedback, ownFeedback: req.body.USER == feedback.USER && !!req.body.USER, comments: comment, currentUserId: req.body.USER } });
            }).populate('USER', { PASSWORD: 0, EMAIL: 0 });
        }
    });
}

const softDelete = (req, res) => {
    if (!req.body.USER || !req.params.id) return
    let feedbackId = req.params.id;
    Feedback.deleteOne({ _id: req.params.id, USER: req.body.USER }, (err, feedback) => {
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