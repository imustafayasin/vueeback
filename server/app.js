const express = require('express');
const cors = require('cors');
const auth = require('./api/auth');

const app = express();
app.use(cors())
app.use(express.json());



app.get('/', (req, res) => {
    res.json({ message: "Lütfen Başar Artık" })
})
app.post('/register', auth.register)
app.listen(3000, function () {
    console.log("3000 de ayağa kalktı", "http://localhost:3000");
});
