const mongoose = require("mongoose")

const orderItemsSchema = new mongoose.Schema({
    productid : { type: mongoose.Schema.Types.ObjectId , ref: "product" ,required: true},
    quantity : { type:Number , required : true },
    price : { type:Number , required : true }
},{_id : false})

const orderSchema = new mongoose.Schema({
    userid : { type: mongoose.Schema.Types.ObjectId , ref :"userdetails", required:true},
    items : {type : [orderItemsSchema],required:true},
    totalprice:{type:Number ,required:true},
    phoneno : { type:Number,required:true},
    pincode : {type:Number,required:true},
    address : { type:String , required: true},
    paymentmethod : {type:String , enum : ["Card","CashOnDelivery","UPI"] , required:true},
    orderedAt : { type : Date , default : Date.now()},
    orderStatus : { type:String , enum : ["Packed","Shipped","Out for Delivery","Delivered"] , default:"Packed"},
    paymentStatus : { type:String , enum : ["success","failed","pending"] , default:"pending"}

})

const orderModel = mongoose.model("orderdetail",orderSchema)

module.exports = orderModel