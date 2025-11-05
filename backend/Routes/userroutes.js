const express = require("express")
const {validateusers , validateOrders ,validateuserupdate} = require("../Middlewares/joi")
const {adduser,addgoogleuser ,verifyemail ,addorder ,getorders ,getuserdetail ,updateuserdetail , changepassword ,resetpass , updatePaymentStatus ,retrieveSession ,updateSession } = require("../Controller/usercontroller")
const {checktoken} = require("../Middlewares/jwt")

const userrouter = express.Router()

userrouter.post("/signin",validateusers,adduser)
userrouter.post("/googleauth",addgoogleuser)
userrouter.post("/verifyemail",verifyemail)
userrouter.post("/forgotpassword",changepassword)
userrouter.post("/resetpassword",resetpass)
userrouter.post("/order/:id",checktoken,validateOrders,addorder)
userrouter.get("/order/:id",checktoken,getorders)
userrouter.get("/userdetail",checktoken,getuserdetail)
userrouter.patch("/userdetailupdate",checktoken,validateuserupdate,updateuserdetail)
userrouter.post("/webhook",express.raw({type:"application/json"}),updatePaymentStatus)
userrouter.get("/stripesession/:id",checktoken,retrieveSession)
userrouter.delete("/updatestripesession/:id",checktoken,updateSession)

module.exports = userrouter