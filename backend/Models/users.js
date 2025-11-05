const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String},
    googleId: { type: String },
    phoneno:{type:Number},
    address:{type:String},
    role:{type:String,default:"user"},
    isVerified:{type:String , enum :["verified","unverified"] , default:"unverified"}
})

userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next()

    this.password = await bcrypt.hash(this.password,10)
    next()
})

userSchema.methods.comparepassword = async function (currentpass) {
    return await bcrypt.compare(currentpass,this.password)
}

const usermodel = mongoose.model("userdetails",userSchema)

module.exports = usermodel