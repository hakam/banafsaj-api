    const designation = require("../controllers/designation.controller.js");
    const auth = require("../middleware/auth.js");
    const reqPerm = require("../middleware/reqPerm.js");

    var router = require("express").Router();
  
    // Create a new designation
    router.post("/designation",auth,reqPerm, designation.create);
  
    // Retrieve all designation
    router.get("/designation",auth,reqPerm, designation.findAll);
  
   // Retrieve a single designation with id
    router.get("/designation/:id",auth,reqPerm, designation.findOne);
  
    // Update a designation with id
    router.put("/designation/:id",auth,reqPerm, designation.update);
  
    // Delete a designation with id
    router.delete("/designation/:id",auth,reqPerm, designation.delete);
  
    // Create a new designation
  

    module.exports = router
