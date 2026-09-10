const { getResponsefromAI } = require("../services/ChatService");



const chatController = async (req, res) => {
  const { messages } = req.body;

  try {
    // 1. Basic Validation
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({
        message: "Prompt is required",
      });
    }

    // 2. Maximum number of messages
    if (messages.length > 50) {
      return res.status(400).json({
        message: "Too many messages",
      });
    }

    // Validate every message
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

    // 4. Call AI
    const answer = await getResponsefromAI(messages)

    return res.status(200).json({
      message: answer,
    });
  }
  catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Something went wrong",
    });
  }



};


module.exports = chatController