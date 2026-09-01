

const mongoose = require('mongoose')

const connection = async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_DB_URI}`)
        console.log('MongoDb Connected Successfully')

    } catch (error) {
        console.log("MongoDb connection failed", error)
        process.exit(1)
    }
}

module.exports = connection