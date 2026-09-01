const express = require('express')
const authMiddleware = require("../middleware/auth.middleware")

const { resigterUser, loginUser } = require('../controllers/auth.controller')

const router = express.Router()

router.post("/register", resigterUser)
router.post("/login", loginUser)
router.get("/me", authMiddleware, (req, res) => {
    return res.status(200).json({
        message: "You are authenticated",
        user: req.user
    })
})

module.exports = router
