const express = require('express');
const cors = require('cors');
const auth = require('./api/auth');
const mongoose = require("./database/connection");

const app = express();
app.use(cors())
mongoose.connect()
app.use(express.json());



app.get('/', auth.register)
app.post('/auth', auth.register)
app.listen(3000, function () {
    console.log("3000 de ayağa kalktı", "http://localhost:3000");
});
