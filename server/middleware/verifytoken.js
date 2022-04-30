const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
    const authorization = req.header('Authorization');
    if (!authorization) {
        res.status(401).send('Access denied. no token provided');
        return
    }

    const token = authorization.split("r ").pop();
    jwt.verify(token, 'yasin', (err, decoed) => {
        if (err) {
            res.status(401).send("Invalid token");
            return
        }
        req.userId = decoed._id;
        next()
    })
}

module.exports = verifyToken
