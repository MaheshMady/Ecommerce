const mongoose = require("mongoose")

const dbconnect = async function () {
    try{
       await mongoose.connect("mongodb+srv://maheshmdu27_db_user:rOtbwbvEcXXExCsn@cluster0.ajejyjz.mongodb.net/test")
       console.log("Database Connected")
    }
    catch(err){
       console.log(err.message)
    }
}

module.exports = dbconnect