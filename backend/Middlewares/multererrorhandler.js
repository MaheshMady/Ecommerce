const multer = require("multer")

exports.multererror = function(err,req,res,next){

   if (err instanceof multer.MulterError) {
   
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({ message: "File too large. Max size is 5MB.",success:false,status:400 });
    }
    if (err.code === "LIMIT_UNEXPECTED_FILE") {
      return res.status(400).json({ message: "Unexpected file field.",success:false,status:400 });
    }
    return res.status(400).json({ message: err.message ,success:false,status:400});
  }

  if (err.message === "Only image files are allowed (jpeg, png, gif).") {
    return res.status(400).json({ message: err.message,success:false,status:400 });
  }

  
  console.error(err);
  res.status(500).json({ message: "Internal Server Error",success:false,status:400 });
}