const mongoose = require('mongoose');
const Conversations = require('../model/conversation.model');

const conversation = async (req, res) => {
    try {
        // Get userId from authenticated user
        const userId = req.user.userId

        // Get title from request body
        const title = req.body.title
        // create converstion
        const userConverstion = await Conversations.create({
            userId,
            title,
            messages: []
        })

        if (!userConverstion) {
            return res.status(403).json({
                message: "Invalid parameters"
            })
        }


        // return response
        return res.status(201).json({
            message: "Posted message successfully",
            userConverstion
        })

    } catch {
        return res.status(500).json({
            message: "Something went wrong.."
        })
    }
}


const conversationWithId = async (req, res) => {
    try {
        const conversationId = req.params.id
        const userId = req.user.userId
        const content = req.body.content


        const conversation = await Conversations.findOne({
            _id: conversationId,
            userId,

        })

        if (!conversation) {
            return res.status(404).json({
                message: "conversation not found"
            })
        }

        conversation.messages.push({
            role: "user",
            content
        })

        await conversation.save()


        return res.status(200).json({
            message: "Messages added successfully",
            conversation
        })


    } catch {
        return res.status(500).json({
            message: "Something went wrong.."
        })
    }
}

const getConversation = async (req, res) => {
    try {
        const userId = req.user.userId


        const conversations = await Conversations.find({ userId }).sort({ updateAt: -1 })

        return res.status(200).json({
            conversations
        })

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Something went wrong"
        });


    }
}


const getConversationWithId = async (req, res) => {
    try {
        const userId = req.user.userId
        const conversationId = req.params.id

        if (!mongoose.Types.ObjectId.isValid(conversationId)) {
            return res.status(404).json({
                message: "Conversation not found"
            });
        }


        const conversation = await Conversations.findOne({ _id: conversationId, userId })

        if (!conversation) {
            return res.status(404).json({
                message: "Conversation not found"
            })
        }

        return res.status(200).json({
            conversation
        })

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Something went wrong"
        });
    }
}

const deleteConversation = async (req, res) => {
    try {

        const userId = req.user.userId
        const conversationId = req.params.id

        const conversation = await Conversations.findOneAndDelete({
            _id: conversationId,
            userId
        })

        if (!conversation) {
            return res.status(404).json({
                message: "Conversation Not Found"
            })
        }

        return res.status(200).json({
            message: "Delete conversation successfully"
        })

    }
    catch (err) {
        console.log(err);

        return res.status(500).json({
            message: "Something went wrong"
        })

    }
}


module.exports = { conversation, conversationWithId, getConversation, getConversationWithId, deleteConversation }