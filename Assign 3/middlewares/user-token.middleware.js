const jwt = require("jsonwebtoken")

const UserTokenMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization
        if (token) {
            const decodedToken = await jwt.verify(token, "You Cant Hack My Password")
            if (decodedToken) {
                // console.log(decodedToken)
                next()
            }
        } else {
            res.status(401);
            res.send({ error: "unauthorized_request", errorDiscription: "Authroized Token is Required" })
        }
    } catch (error) {
        console.log(error)
        if (error instanceof jwt.JsonWebTokenError) {
            res.status(500).send({ error: 'Invalid_token', errorDiscription: 'Provided Token Is Invalid' })
        } else {
            res.status(500)
            res.send({ error: 'Internal Server Error' })
        }
    }
}

module.exports = UserTokenMiddleware