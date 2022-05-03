const mongoose = require('mongoose');

const Schema = mongoose.Schema;


//TODO
//-- Validations , virtuals, utils func.
var userSchema = new Schema({
    NAME: String,
    LASTNAME: String,
    USERNAME: String,
    EMAIL: String,
    PASSWORD: String,
    USERID: String
})
userSchema.virtual('FULLNAME').get(function () { return `${this.NAME} ${this.LASTNAME}` })

var Identity = mongoose.model("Identity", userSchema)


var Feedback = mongoose.model("Feedback", new Schema({
    TITLE: String,
    CATEGORY: String,
    DETAIL: String,
    VOTE: String,
    USERID: String
}))

var commentSchema = new Schema({
    USERID: { type: mongoose.Schema.Types.ObjectId, ref: 'Identity', required: true },
    COMMENT: String,
    CREATED_DATE: { type: String, default: Date },
    FEEDBACK_ID: String,
    PARENT_COMMENT_ID: String,
})

commentSchema.method.ownComment = function (id) {
    return id == this.USERID
}

var Comment = mongoose.model("Comment", commentSchema)


module.exports = { Identity, Feedback, Comment };