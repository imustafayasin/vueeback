const mongoose = require('mongoose');

const Schema = mongoose.Schema;


//TODO
//-- Validations , virtuals, utils func.
var Identity = mongoose.model("Identity", new Schema({
    NAME: String,
    LASTNAME: String,
    USERNAME: String,
    EMAIL: String,
    PASSWORD: String,
    USERID: String
}))

var Feedback = mongoose.model("Feedback", new Schema({
    TITLE: String,
    CATEGORY: String,
    DETAIL: String,
    VOTE: String,
    USERID: String
}))



module.exports = { Identity, Feedback };