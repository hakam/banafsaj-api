    const fleet = require("../controllers/fleet.controller.js");
    const auth = require("../middleware/auth.js");
    const reqPerm = require("../middleware/reqPerm.js");

    var router = require("express").Router();
  
    // Create a new fleet
    router.post("/fleet",auth,reqPerm, fleet.create);
  
    // Retrieve all fleet
    router.get("/fleet",auth,reqPerm, fleet.findAll);
  
   // Retrieve a single fleet with id
    router.get("/fleet/:id",auth,reqPerm, fleet.findOne);
  
    // Update a fleet with id
    router.put("/fleet/:id",auth,reqPerm, fleet.update);
  
    // Delete a fleet with id
    router.delete("/fleet/:id",auth,reqPerm, fleet.delete);
  
    // Create a new fleet
  

    module.exports = router
