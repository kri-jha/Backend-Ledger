const mongoose = require("mongoose")




function connnecToDB()
{
    mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("connected to database")
    })
    .catch((err) => {
        console.error("error connecting to database", err)
        process.exit(1)
    })
}


module.exports = connnecToDB