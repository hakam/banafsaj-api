    const fleetdocs = require("../controllers/fleetdocs.controller.js");
    const auth = require("../middleware/auth.js");
    const reqPerm = require("../middleware/reqPerm.js");

    var router = require("express").Router();
  
    // Create a new fleetdocs
    router.post("/fleetdocs",auth,reqPerm, fleetdocs.create);
  
    // Retrieve all fleetdocs
    router.get("/fleetdocs",auth,reqPerm, fleetdocs.findAll);
  
   // Retrieve a single fleetdocs with id
    router.get("/fleetdocs/:id",auth,reqPerm, fleetdocs.findOne);
  
    // Update a fleetdocs with id
    router.put("/fleetdocs/:id",auth,reqPerm,fleetdocs.update);
  
    // Delete a fleetdocs with id
    router.delete("/fleetdocs/:id",auth,reqPerm, fleetdocs.delete);
  
    // Create a new fleetdocs
  

    module.exports = router
