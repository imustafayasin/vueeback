const mongoose = require('mongoose');

const connection = () => mongoose.connect("mongodb://127.0.0.1:27017/feedback", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("Database connected!"))
    .catch(err => console.log(err));

module.exports = { connect: connection };