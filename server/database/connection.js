const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' })

const connection = () => mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DATABASE_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("Database connected to", process.env.DATABASE_NAME))
    .catch(err => console.log(err));

module.exports = { connect: connection };