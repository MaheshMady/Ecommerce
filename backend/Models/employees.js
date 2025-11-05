const mongoose = require("mongoose");

const productschema = new mongoose.Schema({
  product: { type: String, required: true },
  sellername:{type:String,required:true},
  description: { type: String },
  price: { type: Number,required:true },
  image: { type: String, default: null },
});

const employeeModel = mongoose.model("product", productschema);

module.exports = employeeModel;
