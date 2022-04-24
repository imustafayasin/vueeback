const mongoose = require('mongoose');

const Schema = mongoose.Schema;


//TODO
//-- Validations , virtuals, utils func.
var Identity =  mongoose.model("Identity", new Schema({
    NAME:String,
    LASTNAME:String,
    USERNAME:String,
    EMAIL:String,
    PASSWORD:String
}))


module.exports = {Identity};