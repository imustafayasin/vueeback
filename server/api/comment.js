
const database = require("../database/connection");
database.connect();

const handleErrors = require("../middleware/handleDbErrors.js");
const { Comment } = require("../database/models");
const { Feedback } = require("../database/models");

const create = (req, res) => {

    Comment.create(req.body, (err, comment) => {
        if (handleErrors(err?.errors)) res.json({ message: handleErrors(err?.errors), success: false, comment: comment })
        Feedback.findByIdAndUpdate(req.body.FEEDBACK_ID, { $push: { "COMMENTS": comment.id } }, { new: true, upsert: true }, (err, data) => {
        })
        res.json({ message: "Success", success: true, comment: comment })
    })
};

const softDelete = (req, res) => {
    if (!req.body.USERID || !req.body.id) return
    Comment.findOneAndDelete({ USERID: req.body.USERID, _id: req.body.id }, (err, comment) => {
        if (handleErrors(err?.errors)) res.json({ message: handleErrors(err?.errors), success: false, })
        else res.json({ message: "Success", success: true })
    })
}



module.exports = { create, softDelete }