    const vendorsectors = require("../controllers/vendorsectors.controller.js");
    const auth = require("../middleware/auth")
    var router = require("express").Router();
    const reqPerm = require("../middleware/reqPerm.js");

  
    // Create a new vendorsectors
    router.post("/vendorsectors",auth,reqPerm, vendorsectors.create);
  
    // Retrieve all vendorsectors
    router.get("/vendorsectors",auth,reqPerm,vendorsectors.findAll);
  
   // Retrieve a single vendorsectors with id
    router.get("/vendorsectors/:id",auth,reqPerm, vendorsectors.findOne);
  
    // Update a vendorsectors with id
    router.put("/vendorsectors/:id",auth,reqPerm, vendorsectors.update);
  
    // Delete a vendorsectors with id
    router.delete("/vendorsectors/:id",auth, reqPerm,vendorsectors.delete);
  
    // Create a new vendorsectors
  

    module.exports = router
