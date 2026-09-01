const express = require('express')

const { conversertion, conversertionWithId } = require("../controllers/conversation.controller");
const authMiddleware = require("../middleware/auth.middleware")



const router = express.Router()

router.post("/", authMiddleware, conversertion);

router.post(
    "/:id/messages",
    authMiddleware,
    conversertionWithId
);


module.exports = router