const mongoose = require('mongoose')

const conversationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    messages: [{
        role: { type: String, required: true },
        content: { type: String, required: true }
    }],

},
    { timestamps: true }
)

const Conversations = mongoose.model("conversations", conversationSchema)

module.exports = Conversations