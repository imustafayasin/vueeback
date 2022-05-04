const express = require('express');
const cors = require('cors');
const auth = require('./api/auth');
const feedback = require('./api/feedback');
const comment = require('./api/comment');
const verifyToken = require('./middleware/verifytoken.js');
const nullCheck = require('./middleware/nullCheck.js');
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

app.post('/login', nullCheck, auth.login)
app.post('/register', nullCheck, auth.register)
app.post('/authuser', verifyToken, auth.getAuthUser)

app.post('/feedback/create', [nullCheck, verifyToken], feedback.create)
app.post('/feedback/update', [nullCheck, verifyToken], feedback.update)
app.post('/feedback/getByUser', [nullCheck, verifyToken], feedback.getByUser)
app.post('/feedback/get', includeUserID, feedback.get)
app.get('/feedback/get/:id', includeUserID, feedback.getById)
app.get('/feedback/delete/:id', [nullCheck, verifyToken], feedback.softDelete)

app.post('/feedback/addComment', [nullCheck, verifyToken], comment.create)
app.post('/feedback/deleteComment', [nullCheck, verifyToken], comment.softDelete)


app.listen(3000, function () {
    console.log("running of 3000", "http://localhost:3000");
});
