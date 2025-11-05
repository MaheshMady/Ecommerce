const adminModel = require("../Models/admin");
const productModel = require("../Models/employees");
const usermodel = require("../Models/users");
const orderModel = require("../Models/orders");
const { providetoken } = require("../Middlewares/jwt");
const { sendEmailverifymail } = require("../Middlewares/nodemailer")
const { emailverificationtoken } = require("../Middlewares/jwt")
require("dotenv").config;
const fs = require("fs");
const path = require("path");

exports.login = async function (req, res) {
  const adminemail = req.body.email;
  const password = req.body.password;

  try {
    let result = await adminModel.findOne({ email: adminemail });

    if (!result) {
      result = await usermodel.findOne({ email: adminemail });
    }
    
    if (!result) {
      return res.status(400).json({ success: false, message: "Invalid Email Credentials" });
    }

    if (result.email === adminemail) {

      let passcheck = await result.comparepassword(password)
      if (passcheck) {

        if(result.isVerified === "unverified" ){
             
           const verifytoken =  emailverificationtoken(result.email,process.env.SECRET_TOKEN)
          
              const verifylink = `${process.env.APP_URL}verify/token?token=${verifytoken}`
          
              await sendEmailverifymail(result.email,verifylink)

          return res.status(400).json({ success : false ,status :400 ,message: "Your email is not verified. A new verification link has been sent to your email."})
        }

        const token = providetoken({ ...result }, process.env.SECRET_TOKEN, {
          expiresIn: "6h",
        });
        res.status(200).json({
          success: true,
          token: token,
          id: result._id,
          role: result.role,
          message: "Login Success",
        });
      } else {
        return res
          .status(500)
          .json({ success: false, message: "Invalid Password Credentials" });
      }
    } else {
      return res
        .status(500)
        .json({ success: false, message: "Invalid Email Credentials" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.addemployee = async function (req, res) {
  const productdetails = { ...req.body };
  const filename = req.file ? req.file.filename : null;

  try {
    const result = await productModel.create({
      ...productdetails,
      image: filename,
    });

    if (result) {
      res.status(200).json({ success: true, message: "Employee Added" });
    } else {
      res
        .status(500)
        .json({ success: true, message: "Error Occured Try again" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteemployee = async function (req, res) {
  const deletedid = req.params.id;

  try {
    const result = await productModel.deleteOne({ _id: deletedid });

    if (result.deletedCount === 1) {
      res
        .status(200)
        .json({ success: true, message: "Employee deleted Successfully" });
    } else {
      res
        .status(500)
        .json({ success: true, message: "Error occured try again" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getemployee = async function (req, res) {
  const employeeid = req.params.id;
  try {
    const result = await productModel.findById(employeeid);

    if (result) {
      res.status(200).json({ success: true, data: result });
    } else {
      res.status(500).json({ success: false, message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.dispemployee = async function (req, res) {
  try {
    const result = await productModel.find();

    if (result) {
      res.status(200).json({ success: true, data: result });
    } else {
      res.status(500).json({ success: false, message: "Error Occured" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateproduct = async function (req, res) {
  const updateproductid = req.params.id;

  const product = { ...req.body };

  try {
    let imagename = await productModel.findById(updateproductid);
    const oldimagepath = imagename.image;
    const image = req.file ? req.file.filename : imagename.image;

    let result = await productModel.updateOne(
      { _id: updateproductid },
      { $set: { ...product, image: image } }
    );

    if (result.modifiedCount) {
      if (req.file && oldimagepath) {
        try {
          if (fs.existsSync(path.join(__dirname, "../uploads", oldimagepath))) {
            fs.unlinkSync(path.join(__dirname, "../uploads", oldimagepath));
          }
        } catch (err) {
          console.error("Error deleting old image:", err.message);
        }
      }

      return res
        .status(200)
        .json({ message: "Updated Successfully", status: 200, success: true });
    } else {
      return res.status(200).json({
        message: "No changes detected, update skipped",
        status: 200,
        success: true,
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message, status: 500, success: false });
  }
};

exports.getorders = async function (req, res) {
  try {

    let result = await orderModel.find({ paymentStatus : "success"}).populate("userid").populate("items.productid")
 
    if (result ) {
      res.status(200).json({
        success: true,
        status: 200,
        message: "Orders Detail sended",
        data: result,
      });
    } else {
      res.status(500).json({
        success: false,
        status: 500,
        message: "Error Occured on Fetching Orders",
      });
    }
  } catch (err) {
    res.status(500).json({ success: false, status: 500, message: err.message });
  }
};

exports.updatestatus = async function (req, res) {
  let productid = req.params.id;

  try {
    let result = await orderModel.findByIdAndUpdate(productid, {
      $set: { orderStatus: req.body.status },
    });
    if (result) {
      res
        .status(200)
        .json({ success: true, status: 200, message: "Update Success" });
    } else {
      res.status(500).json({
        success: false,
        status: 500,
        message: "Error Occured on updating order status",
      });
    }
  } catch (err) {
    res.status(500).json({ success: false, status: 500, message: err.message });
  }
};
