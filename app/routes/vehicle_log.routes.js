    const vehiclelog = require("../controllers/vehicle_log.controller.js");
    const auth = require("../middleware/auth.js");

    var router = require("express").Router();
    const reqPerm = require("../middleware/reqPerm.js");

  
    // Create a new vehiclelog
    router.post("/vehiclelog",auth,reqPerm, vehiclelog.create);
  
    // Retrieve all vehiclelog
    router.get("/vehiclelog",auth,reqPerm, vehiclelog.findAll);
  
   // Retrieve a single vehiclelog with id
    router.get("/vehiclelog/:id",auth,reqPerm, vehiclelog.findOne);
  
    // Update a vehiclelog with id
    router.put("/vehiclelog/:id",auth,reqPerm, vehiclelog.update);
  
    // Delete a vehiclelog with id
    router.delete("/vehiclelog/:id",auth,reqPerm, vehiclelog.delete);
  
    // Create a new vehiclelog
  

    module.exports = router
