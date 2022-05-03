const express = require('express');
const cors = require('cors');
const auth = require('./api/auth');
const feedback = require('./api/feedback');
const comment = require('./api/comment');
const verifyToken = require('./middleware/verifytoken.js');
const jwt = require("jsonwebtoken")
const app = express();
app.use(cors())
app.use(express.json());

const includeUserID = (req, res, next) => {
    const authorization = req.header('Authorization');
    const token = authorization?.split("r ").pop();
    jwt.verify(token, 'yasin', (err, decoed) => {
        req.body.USERID = decoed?._id;
        next()
    })
}

app.get('/', verifyToken, (req, res) => {
    res.json({ message: "Hi there", as: `başarılı id'niz ${req.userId}` })
})

app.post('/login', auth.login)
app.post('/register', auth.register)
app.post('/authuser', verifyToken, auth.getAuthUser)

app.post('/feedback/create', verifyToken, feedback.create)
app.post('/feedback/update', verifyToken, feedback.update)
app.post('/feedback/getByUser', verifyToken, feedback.getByUser)
app.post('/feedback/get', feedback.get)
app.get('/feedback/get/:id', includeUserID, feedback.getById)
app.get('/feedback/delete/:id', verifyToken, feedback.softDelete)

app.post('/feedback/addComment', verifyToken, comment.create)
app.post('/feedback/deleteComment', verifyToken, comment.softDelete)


app.listen(3000, function () {
    console.log("running of 3000", "http://localhost:3000");
});
