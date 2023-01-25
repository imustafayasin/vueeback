const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' })

const connection = () => mongoose.connect(`mongodb+srv://imustafayasin:${process.env.MONGO_PASS}@feedback.jklwew7.mongodb.net/?retryWrites=true&w=majority/${process.env.DATABASE_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("Database connected to", process.env.DATABASE_NAME))
    .catch(err => console.log(err));

module.exports = { connect: connection };