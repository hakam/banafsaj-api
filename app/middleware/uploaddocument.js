const multer = require("multer");
const {v4} = require('uuid');
var fs = require('fs');
var dir = './tmp'

const imageFilter = (req, file, cb) => {
  
   if(req.body.path){
    dir = "../"+req.body.path 
   }else{
    dir = "../assets/empdoc/avatar/"
   }

if (!fs.existsSync(dir)){
  fs.mkdirSync(dir);
}

 // if (file.mimetype.startsWith("image") || file.mimetype.startsWith("application/pdf")) {
    cb(null, true);
//  } else {
 //   cb("Please upload only images.", false);
 // }
};


var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, v4() + '.' +`${file.originalname.split('.').pop()}`);
  },
});

var uploadFile = multer({ storage: storage, fileFilter: imageFilter });
module.exports = uploadFile;