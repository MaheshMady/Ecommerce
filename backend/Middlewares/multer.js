const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
    destination:path.join(__dirname,"../uploads"),
    filename: function(req,file,cb){
        let fileuploaded = file.originalname;
        let filename = Date.now()+"_"+fileuploaded;

        cb(null,filename)
    }
})

const filefilter = function(req,file,cb){
    
    const allowedtypes = /jpeg|jpg|png/
    let extension = path.extname(file.originalname)
    let mimetype = file.mimetype

    if(allowedtypes.test(extension && mimetype)){
        cb(null,true)
    }
    else{
        cb(new Error("Only Images are allowed in following format only 'jpeg,jpg,png'"))
    }

    
}

const uploads = multer({
    storage:storage,
    limits:{
        fileSize: 5 * 1024 *1024
    },
    fileFilter:filefilter
})



module.exports = uploads