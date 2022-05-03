const mongoose = require('mongoose');

const Schema = mongoose.Schema;


//TODO
//-- Validations , virtuals, utils func.
var userSchema = new Schema({
    NAME: {
        type: String, required: true,
        min: [5, 'Must be at least 5, got {VALUE}'],
        max: 120
    },
    LASTNAME: {
        type: String, required: true,
        min: [5, 'Must be at least 5, got {VALUE}'],
        max: 120
    },
    USERNAME: {
        type: String, required: true,
        min: [5, 'Must be at least 5, got {VALUE}'],
        max: 120
    },
    EMAIL: {
        type: String, required: true,
        max: 120
    },
    PASSWORD: {
        type: String, required: true,
        max: 120
    },
    USERID: String
})
userSchema.virtual('FULLNAME').get(function () { return `${this.NAME} ${this.LASTNAME}` })

var Identity = mongoose.model("Identity", userSchema)


var Feedback = mongoose.model("Feedback", new Schema({
    TITLE: {
        type: String, required: true,
        min: [5, 'Must be at least 5, got {VALUE}'],
        max: 255
    },
    CATEGORY: {
        type: String, required: true, enum: {
            values: ['UI', 'UX', 'FEATURE', 'LIVE', 'ENCHANCEMET', 'BUG', 'FEATURE'],
            message: '{VALUE} is not supported'
        }
    },
    DETAIL: { type: String, min: 1, max: 255, required: true },
    VOTE: String,
    USERID: { type: mongoose.Schema.Types.ObjectId, ref: 'Identity', required: true },
    COMMENTS: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
}))

var commentSchema = new Schema({
    USERID: { type: mongoose.Schema.Types.ObjectId, ref: 'Identity', required: true },
    COMMENT: { type: String, min: 1, max: 255, required: true },
    CREATED_DATE: { type: String, default: Date },
    FEEDBACK_ID: String,
    PARENT_COMMENT_ID: String,
})

commentSchema.method.ownComment = function (id) {
    return id == this.USERID
}

var Comment = mongoose.model("Comment", commentSchema)


module.exports = { Identity, Feedback, Comment };