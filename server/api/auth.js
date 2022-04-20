
const { Identity } = require("../database/models");

//to do add identity
const register = (req, res, next) => {
    console.log("register a ulaşıldı");
    console.log(req.body)
    res.json({ message: "Selam" });
}

module.exports = {
    register
}