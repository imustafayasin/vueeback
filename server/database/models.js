const mongoose = require('mongoose');

const Schema = mongoose.Schema;


//TODO
//-- Validations , virtuals, utils func.
var userSchema = new Schema({
    NAME: {
        type: String,
        required: [true, 'Name is required'],
        max: 120
    },
    LASTNAME: {
        type: String, required: true,
        required: [true, 'Lastname is required'],
        max: 120
    },
    USERNAME: {
        type: String, required: true,
        required: [true, 'username is required'],
        max: 120
    },
    EMAIL: {
        type: String,
        required: true,
        unique: true,
        max: 120,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
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
        trim: true,
        min: 2,
        minlength: 2,
        maxlength: 15
    },
    CATEGORY: {
        type: String, required: true
        // , enum: {
        //     values: ['UI', 'UX', 'FEATURE', 'LIVE', 'ENCHANCEMET', 'BUG', 'FEATURE'],
        //     message: 'Category value not supported'
        // }
    },
    DETAIL: { type: String, min: 1, max: 255, required: true },
    VOTE: String,
    USER: { type: mongoose.Schema.Types.ObjectId, ref: 'Identity', required: true },
    COMMENTS: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
}))

var commentSchema = new Schema({
    USER: { type: mongoose.Schema.Types.ObjectId, ref: 'Identity', required: true },
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