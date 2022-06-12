const jwt = require('jsonwebtoken')

function verify(req, res, next) {
    const authHeader = req.headers.authorization
    if (!authHeader) return res.status(401).json('You are not authenticated!')

    const token = authHeader.split(' ')[1]
    jwt.verify(
        token,
        process.env.SECRET_KEY,
        (err, user) => {
            if (err) return res.status(403).json('Token is not valid!')
            req.user = user
            next()
        }
    )
}

module.exports = verify