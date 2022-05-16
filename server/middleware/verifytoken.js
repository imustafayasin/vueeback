const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
    const authorization = req.header('Authorization');
    if (!authorization) {
        res.json({ success: false, message: "Unauthorized", unAuthorized: true });
        return
    }

    const token = authorization.split("r ").pop();
    jwt.verify(token, 'yasin', (err, decoed) => {
        if (err) {
            res.json({ success: false, message: "Invalid token", unAuthorized: true });
            return
        }
        req.body.USER = decoed._id;
        next()
    })
}

module.exports = verifyToken
