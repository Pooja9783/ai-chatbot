const express = require('express')

const { conversation, conversationWithId, getConversation, getConversationWithId, deleteConversation } = require("../controllers/conversation.controller");
const authMiddleware = require("../middleware/auth.middleware")

const router = express.Router()

router.get("/", authMiddleware, getConversation)
router.get("/:id", authMiddleware, getConversationWithId)

router.post("/", authMiddleware, conversation);
router.post("/:id/messages", authMiddleware, conversationWithId);


router.delete("/:id", authMiddleware, deleteConversation);




module.exports = router