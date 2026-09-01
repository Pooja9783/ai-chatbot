const mongoose = require('mongoose')

const converstionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    messages: [{
        role: { type: String, required: true },
        content: { type: String, required: true }
    }],

},
    { timestamps: true }
)

const converstions = mongoose.model("converstions", converstionSchema)

module.exports = converstions