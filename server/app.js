const express = require('express');
const cors = require('cors');
const auth = require('./api/auth');
const feedback = require('./api/feedback');
const comment = require('./api/comment');
const verifyToken = require('./middleware/verifytoken.js');
const nullCheck = require('./middleware/nullCheck.js');
const jwt = require("jsonwebtoken")
const path = require("path")
const app = express();
app.use(cors())
app.use(express.json());
require('dotenv').config({ path: '../.env' })

const includeUserID = (req, res, next) => {
    const authorization = req.header('Authorization');
    const token = authorization?.split("r ").pop();
    jwt.verify(token, process.env.JTWHASH, (err, decoed) => {
        req.body.USER = decoed?._id;
        next()
    })
}

app.use(express.static(path.join(__dirname, 'dist')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './dist/index.html'))
})
app.get('*', (req, res) => {
    res.redirect('/')
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


app.listen(process.env.BACKEND_PORT, function () {
    console.log("running port: ", process.env.BACKEND_PORT);
});
