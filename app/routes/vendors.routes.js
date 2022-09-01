    const vendors = require("../controllers/vendors.controller.js");
    const auth = require("../middleware/auth.js");

    var router = require("express").Router();
    const reqPerm = require("../middleware/reqPerm.js");

  
    // Create a new vendors
    router.post("/vendors",auth,reqPerm, vendors.create);
  
    // Retrieve all vendors
    router.get("/vendors",auth,reqPerm, vendors.findAll);
  
   // Retrieve a single vendors with id
    router.get("/vendors/:id",auth,reqPerm, vendors.findOne);
  
    // Update a vendors with id
    router.put("/vendors/:id",auth,reqPerm, vendors.update);
  
    // Delete a vendors with id
    router.delete("/vendors/:id",auth,reqPerm, vendors.delete);
  
    // Create a new vendors
  

    module.exports = router
