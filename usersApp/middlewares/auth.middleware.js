const jwt = require('jsonwebtoken')

function verifyToken(req, resp, next) {
    const authHeader = req.authHeader['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
        return resp.status(401).json({status: false, message: "Access Denied. No token provided"})
    }

    const secret = process.env.TOKEN_SECRET;

    try {
        const decoded =jwt.verify(token, secret);
        
        console.log(decoded);
        next()
    } catch (err) {
        return resp.status(403).json({status: false, data: err})
    }

}

module.exports = {verifyToken}