const mongoose = require('mongoose');
const bcrypt = require('bcrypt')


const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
},
    {
        timestamps: true
    }
)

UserSchema.pre("save", async function () {
    if (!this.isModified("password")) {
        return
    }

    this.password = await bcrypt.hash(this.password, 10)
})


const User = mongoose.model("User", UserSchema);

module.exports = User