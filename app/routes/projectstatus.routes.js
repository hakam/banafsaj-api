    const projectstatus = require("../controllers/projectstatus.controller.js");
    const auth = require("../middleware/auth.js");

    var router = require("express").Router();
    const reqPerm = require("../middleware/reqPerm.js");

  
    // Create a new projectstatus
    router.post("/projectstatus",auth,reqPerm, projectstatus.create);
  
    // Retrieve all projectstatus
    router.get("/projectstatus",auth,reqPerm, projectstatus.findAll);
  
   // Retrieve a single projectstatus with id
    router.get("/projectstatus/:id",auth,reqPerm, projectstatus.findOne);
  
    // Update a projectstatus with id
    router.put("/projectstatus/:id",auth,reqPerm, projectstatus.update);
  
    // Delete a projectstatus with id
    router.delete("/projectstatus/:id",auth,reqPerm, projectstatus.delete);
  
    // Create a new projectstatus
  

    module.exports = router
