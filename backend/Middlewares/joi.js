const joi = require("joi")
const fs = require("fs")
const path = require("path")

const loginschema = joi.object({
    email : joi.string().required(),
    password: joi.string().min(8).max(20).required(),
    
})

const productschema = joi.object({
    product: joi.string().max(30).required(),
    sellername: joi.string().required(),
    description:joi.string(),
    price:joi.number().required()

})

const userschema = joi.object({
    name:joi.string().required(),
    email:joi.string().required(),
    password:joi.string().min(8).max(20).required(),
    phoneno:joi.number().required().min(10),
    address:joi.string().required()
})

const userupdateschema = joi.object({
    name:joi.string().required(),
    phoneno:joi.number().required().min(10),
    address:joi.string().required()
})

const orderSchema = joi.object({
    products : joi.array().required(),
    phoneno : joi.number().required().min(10),
    pincode : joi.number().required().min(6),
    address : joi.string().required(),
    paymentmethod : joi.string().required()

})

exports.validatelogin= function(req,res,next){

    const {error} = loginschema.validate(req.body);

    if(error){
        return res.status(400).json({success:false ,message: error.details[0].message})
    }

    next()
}

exports.validateemployee = function(req,res,next){
    const {error} = productschema.validate(req.body)

    if(error){

        if(req.file){

          const delfile = path.join(__dirname,"../uploads",req.file.filename)

          if(fs.existsSync(delfile)){
            fs.unlinkSync(delfile)
          }

        }
        return res.status(400).json({success:false ,message: error.details[0].message})
    }
    next()
}

exports.validateusers = function(req,res,next){
    
    const {error} = userschema.validate(req.body)

    if(error){
        return res.status(400).json({success:false ,message: error.details[0].message})
    }
    next()
}

exports.validateuserupdate = function(req,res,next){
    
    const {error} = userupdateschema.validate(req.body)

    if(error){
       
        return res.status(400).json({success:false ,message: error.details[0].message})
    }
    next()
}

exports.validateOrders = function(req,res,next){
    const {error} = orderSchema.validate(req.body)

    if(error){
        return res.status(400).json({success:false ,message: error.details[0].message})
    }
    next();
}