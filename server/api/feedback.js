
const database = require("../database/connection");
database.connect();


const { Feedback } = require("../database/models");
const { Comment } = require("../database/models");


const create = (req, res, next) => {
    if (req.body && !!req.body.TITLE) {
        req.body.USERID = req.userId
        Feedback.create(req.body);
        res.json({ success: true, message: "Successfuly" });
    }
}

const update = (req, res) => {
    if (req.body && !!req.body._id) {
        req.body.USERID = req.userId;

        Feedback.findOneAndUpdate({ _id: req.body._id }, req.body, (err, data) => {
            if (err) { console.log(err); return; }
            res.json({ success: true, message: "Successfuly" });
        });

    }
}
const getByUser = (req, res, next) => {
    if (!req.body.USERID) return
    Feedback.find({ USERID: req.body.USERID }, (err, feedbacks) => {
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
        Comment.find({ FEEDBACK_ID: feedback.id }, { COMMENT: 1, CREATED_DATE: 1, _id: 1 }, (err, comment) => {
            res.json({ success: true, message: "Successfuly", data: { data: feedback, ownFeedback: req.body.USERID == feedback.USERID && !!req.body.USERID, comments: comment, currentUserId: req.body.USERID } });
        }).populate('USERID');

    });
}

const softDelete = (req, res) => {
    if (!req.body.USERID || !req.params.id) return
    Feedback.deleteOne({ _id: req.params.id, USERID: req.userId }, (err, feedback) => {
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