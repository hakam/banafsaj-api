    const empmissions = require("../controllers/empmissions.controller.js");
    const auth = require("../middleware/auth.js");
    const reqPerm = require("../middleware/reqPerm.js");

    var router = require("express").Router();
  
    // Create a new empmissions
    router.post("/empmissions",auth,reqPerm, empmissions.create);
  
    // Retrieve all empmissions
    router.get("/empmissions",auth,reqPerm, empmissions.findAll);
  
   // Retrieve a single empmissions with id
    router.get("/empmissions/:id",auth,reqPerm, empmissions.findOne);
  
    // Update a empmissions with id
    router.put("/empmissions/:id",auth,reqPerm, empmissions.update);
  
    // Delete a empmissions with id
    router.delete("/empmissions/:id",auth,reqPerm, empmissions.delete);
  
    // Create a new empmissions
  

    module.exports = router
