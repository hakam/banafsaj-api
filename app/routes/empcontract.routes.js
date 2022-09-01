    const empcontract = require("../controllers/empcontract.controller.js");
    const auth = require("../middleware/auth.js");
    const reqPerm = require("../middleware/reqPerm.js");
    const upload = require("../middleware/uploaddocumentNew");

    var router = require("express").Router();
  
    // Create a new empcontract
    router.get("/empcontract/file/get/:folder/:id/:name",auth,reqPerm,empcontract.getFile);
    router.post("/empcontract",auth,reqPerm, empcontract.create);

    router.post("/empcontract/uploaddoc",upload.single("file"), empcontract.uploadDoc);

    // Retrieve all empcontract
  


    router.get("/empcontract",auth,reqPerm, empcontract.findAll);
  
   // Retrieve a single empcontract with id
    router.get("/empcontract/:id",auth,reqPerm, empcontract.findOne);
  
    // Update a empcontract with id
    router.put("/empcontract/:id",auth,reqPerm, empcontract.update);
  
    // Delete a empcontract with id
    router.delete("/empcontract/:id",auth,reqPerm, empcontract.delete);
  
    // Create a new empcontract
  

    module.exports = router
