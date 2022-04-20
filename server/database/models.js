const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var Identity =  mongoose.model("Identity", new Schema({
    NAME:String,
    LASTNAME:String,
    USERNAME:String,
    EMAIL:String,
    PASSWORD:String
}))


module.exports = {Identity};