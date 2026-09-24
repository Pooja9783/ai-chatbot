const Conversations = require("../model/conversation.model");
const { getResponsefromAI } = require('../services/chatService')



const chatController = async (req, res) => {
  const { conversationId, messages } = req.body;

  try {
    // 1. Basic Validation
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({
        message: "Prompt is required",
      });
    }

    // 2. Conversation ID validation
    if (!conversationId) {
      return res.status(400).json({
        message: "Conversation ID is required",
      });
    }

    // 3. Maximum number of messages
    if (messages.length > 50) {
      return res.status(400).json({
        message: "Too many messages",
      });
    }

    // 4. Message validation
    const isValid = messages.every((m) =>
      m &&
      typeof m.content === "string" &&
      m.content.trim() !== "" &&
      m.content.length <= 5000 &&
      ["user", "assistant"].includes(m.role)
    );


    if (!isValid) {
      return res.status(400).json({ message: "Invalid message format" })
    }

    // 5. Find conversation + verify ownership
    const userId = req.user.userId

    const conversation = await Conversations.findOne({
      _id: conversationId,
      userId
    });

    if (!conversation) {
      return res.status(404).json({
        message: "Conversation not found"
      });
    }

    const latestUserMessage = messages[messages.length - 1];

    conversation.messages.push({
      role: latestUserMessage.role,
      content: latestUserMessage.content
    });

    await conversation.save();

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    res.flushHeaders();

    let fullAnswer = "";

    //6. Call AI
    await getResponsefromAI(messages, (chunk) => {
      fullAnswer += chunk;

      res.write(
        `data: ${JSON.stringify({ content: chunk })}\n\n`
      );
    });

    conversation.messages.push({
      role: "assistant",
      content: fullAnswer
    });

    await conversation.save();

    res.write(
      `data: ${JSON.stringify({ done: true })}\n\n`
    );

    res.end();
  }
  catch (err) {
    console.error(err);

    if (res.headersSent) {
      res.write(
        `data: ${JSON.stringify({
          error: "Something went wrong"
        })}\n\n`
      );

      res.end();
      return;
    }

    return res.status(500).json({
      message: "Something went wrong",
    });
  }



};


module.exports = chatController