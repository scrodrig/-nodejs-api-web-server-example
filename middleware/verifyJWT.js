const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers['authorization']; //check for dot notation
    if (!authHeader) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    console.log(authHeader); //Bearer token

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: 'Forbidden' }); //Invalid token
        }
        req.user = decoded.username;
        next();
    });
};

module.exports = verifyJWT;
