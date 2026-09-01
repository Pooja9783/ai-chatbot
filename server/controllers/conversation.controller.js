const Conversertion = require('../model/converstions.model');

const conversertion = async (req, res) => {
    try {
        // Get userId from authenticated user
        const userId = req.user.userId

        console.log("req.user:", req.user);
        console.log("userId:", req.user.userId);


        // Get title from request body
        const title = req.body.title
        // create converstion
        const userConverstion = await Conversertion.create({
            userId,
            title,
            messages: []
        })

        console.log(userConverstion)

        if (!userConverstion) {
            return res.status(403).json({
                message: "Invalid parameters"
            })
        }


        // return response
        return res.status(200).json({
            message: "Posted message successfully",
            userConverstion
        })

    } catch {
        return res.status(500).json({
            message: "Something went wrong.."
        })
    }
}


const conversertionWithId = async (req, res) => {
    try {
        const conversertionId = req.params.id
        const userId = req.user.userId
        const content = req.body.content


        const conversertion = await Conversertion.findOne({
            _id: conversertionId,
            userId,
            messages: [

            ]
        })

        if (!conversertion) {
            return res.status(404).json({
                message: "Conversertion not found"
            })
        }

        conversertion.messages.push({
            role: "user",
            content
        })

        await conversertion.save()


        return res.status(200).json({
            message: "Messages added successfully",
            conversertion
        })


    } catch {
        return res.status(500).json({
            message: "Something went wrong.."
        })
    }
}


module.exports = { conversertion, conversertionWithId }