    const empdocs = require("../controllers/empdocs.controller.js");
    const upload = require("../middleware/uploaddocument");
    const auth = require("../middleware/auth.js");
    const reqPerm = require("../middleware/reqPerm.js");

    var router = require("express").Router();
  
    // Create a new empdocs
    router.post("/empdocs",auth,reqPerm, empdocs.create);
    router.post("/empdocs/uploaddoc",upload.single("file"), empdocs.uploadDoc);

    // Retrieve all empdocs
    router.get("/empdocs",auth,reqPerm, empdocs.findAll);
  
   // Retrieve a single empdocs with id
    router.get("/empdocs/:id",auth,reqPerm, empdocs.findOne);
  
    // Update a empdocs with id
    router.put("/empdocs/:id",auth,reqPerm, empdocs.update);
  
    // Delete a empdocs with id
    router.delete("/empdocs/:id",auth,reqPerm, empdocs.delete);
  
    // Create a new empdocs
  

    module.exports = router
