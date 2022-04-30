const express = require('express');
const cors = require('cors');
const auth = require('./api/auth');
const feedback = require('./api/feedback');
const verifyToken = require('./middleware/verifytoken.js');

const app = express();
app.use(cors())
app.use(express.json());



app.post('/login', auth.login)

app.get('/', verifyToken, (req, res) => {
    res.json({ message: "Hi there", as: `başarılı id'niz ${req.userId}` })
})

app.post('/authuser', verifyToken, auth.getAuthUser)

app.post('/feedback/create', verifyToken, feedback.create)

app.post('/feedback/getByUser', verifyToken, feedback.getByUser)

app.post('/register', auth.register)
app.listen(3000, function () {
    console.log("3000 de ayağa kalktı", "http://localhost:3000");
});
