const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../model/user.model');


const registerUser = async (req, res) => {

    try {
        const { username, email, password } = req.body

        if (!username || !email || !password) {
            return res.status(400).json({
                message: "Username, email, or password are required"
            })
        }

        const existingUser = await User.findOne({ email })


        if (existingUser) {
            return res.status(409).json({ message: "Email already exists" })
        }
        await User.create({
            username, email, password
        })

        return res.status(201).json({ message: "Your account is created successfully" })



    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong..." })
    }


}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body


        if (!email || !password) {
            return res.status(400).json({ message: "Email or Password are required" })
        }

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Unauthorized : Invalid email or password" })
        }

        let token = jwt.sign({
            userId: user._id,
            role: user.role,
        },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h",
            })

        return res.status(200).json({
            message: "You have logged in successfully...", token, user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        })


    } catch (error) {
        res.status(500).json({ message: "Something Went Wrong..." })
    }
}




module.exports = {
    registerUser,
    loginUser

}