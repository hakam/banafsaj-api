    const projectdoc = require("../controllers/projectdoc.controller.js");
    const upload = require("../middleware/uploaddocument");
    const auth = require("../middleware/auth.js");
    const reqPerm = require("../middleware/reqPerm.js");

    var router = require("express").Router();
  
    // Create a new projectdoc
    router.post("/projectdoc",auth,reqPerm, projectdoc.create);
    router.post("/projectdoc/uploaddoc",upload.single("file"), projectdoc.uploadDoc);
  
    // Retrieve all projectdoc
    router.get("/projectdoc",auth,reqPerm, projectdoc.findAll);
  
   // Retrieve a single projectdoc with id
    router.get("/projectdoc/:id",auth,reqPerm, projectdoc.findOne);
  
    // Update a projectdoc with id
    router.put("/projectdoc/:id",auth,reqPerm, projectdoc.update);
  
    // Delete a projectdoc with id
    router.delete("/projectdoc/:id",auth,reqPerm, projectdoc.delete);
  
    // Create a new projectdoc
  

    module.exports = router
