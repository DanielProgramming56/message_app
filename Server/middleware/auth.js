const User = require('../models/User')
const jwt = require("jsonwebtoken")


const authGuard = async (req, res, next) => {
    try {
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            const token = req.headers.authorization.split(" ")[1]

            const { userId } = jwt.verify(token, process.env.TOKEN_KEY)
            req.user = await User.findById(userId).select('-password')
            next()
        } else {
            let err = new Error('Token not provided')
            err.statusCode = 401
            next(err)
            return
        }
    } catch (error) {
        let err = new Error('not authorized token failed')
        err.statusCode = 401
        next(err)
    }
}

module.exports = authGuard