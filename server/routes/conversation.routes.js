const express = require('express')

const { conversation, getConversation, getConversationWithId, deleteConversation } = require("../controllers/conversation.controller");
const authMiddleware = require("../middleware/auth.middleware")

const router = express.Router()

router.get("/", authMiddleware, getConversation)
router.get("/:id", authMiddleware, getConversationWithId)

router.post("/", authMiddleware, conversation);
router.delete("/:id", authMiddleware, deleteConversation);

module.exports = router