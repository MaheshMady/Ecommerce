const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.providetoken = function (detail, secretkey, expiresin) {
  return jwt.sign({ ...detail }, secretkey, { ...expiresin });
};

exports.checktoken = function (req, res, next) {
  const tokenheader = req.headers["authorization"];
  const token = tokenheader && tokenheader.split(" ")[1];

  if (!token) {
    return res.status(500).json({ success: false, message: "Token required" });
  }

  jwt.verify(token, process.env.SECRET_TOKEN, (err, payload) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Invalid Token" });
    }
    
   
    req.user = payload._doc._id;
    next();
  });
};

exports.passresettoken =  (email,secretkey) => {
  
  return jwt.sign({email:email},secretkey,{ expiresIn : "15m"})
}

exports.emailverificationtoken = (email,secretkey)=>{
  return jwt.sign({ email:email},secretkey,{ expiresIn :"1h"})
}
  