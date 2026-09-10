const jwt = require('jsonwebtoken')


const authMiddleware = async (req, res, next) => {

    try {
        // 1. Get authorization header
        const authHeader = req.headers.authorization

        // 2. Check weather it exists or not?
        if (!authHeader) {
            return res.status(401).json({ message: "Unauthorized" })
        }

        // 3. extract Bearer token
        const [scheme, token] = authHeader.split(" ")

        if (scheme !== 'Bearer' || !token) {
            return res.status(401).json({ message: "Invalid authorization format" })

        }

        // 4. Verify + decode the token
        const decode = jwt.verify(token, process.env.JWT_SECRET)

        // 5. put decode data in req.user
        req.user = decode


        // 6. Continue pass to the next route or middleware
        next()

    } catch {
        return res.status(401).json({ message: "Invalid or expired token" })

    }


}

module.exports = authMiddleware
