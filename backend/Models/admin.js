const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const adminSchema = new mongoose.Schema({
    name:{type:String , required:true},
    email: { type:String , required:true, unique:true},
    password:{type:String , required:true },
    role:{ type:String , default:"admin"}
})

adminSchema.methods.comparepassword = async function(currentpass) {
  
  return await bcrypt.compare(currentpass, this.password);
  
};

const adminModel = mongoose.model("admin",adminSchema)

module.exports = adminModel
