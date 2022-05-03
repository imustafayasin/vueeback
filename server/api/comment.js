
const database = require("../database/connection");
database.connect();


const { Comment } = require("../database/models");

const create = (req, res) => {
    Comment.create(req.body, (err, comment) => {
        if (err) return
        res.json({ message: "Success", success: true, comment: comment })
    })
};

const softDelete = (req, res) => {
    console.log(req.body.USERID, req.body.id);
    if (!req.body.USERID || !req.body.id) return
    Comment.findOneAndDelete({ USERID: req.body.USERID, _id: req.body.id }, (err, comment) => {
        if (err) console.log(err, comment)
        res.json({ message: "Success", success: true })
    })
}



module.exports = { create, softDelete }