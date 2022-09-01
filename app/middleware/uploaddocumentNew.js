const multer = require("multer");
const { v4 } = require('uuid');
var fs = require('fs');
var dir = './tmp'

const imageFilter = (req, file, cb) => {

  dir = req.body.path
  console.log(req.body);
  if(dir){
    console.log(dir);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
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
    cb(null, Date.now()  + '-' + `${file.originalname}`);
  },
});

var uploadFile = multer({ storage: storage, fileFilter: imageFilter });
module.exports = uploadFile;