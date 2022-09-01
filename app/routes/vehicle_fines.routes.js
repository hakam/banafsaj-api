    const vehiclefines = require("../controllers/vehicle_fines.controller.js");
    const auth = require("../middleware/auth.js");

    var router = require("express").Router();
    const reqPerm = require("../middleware/reqPerm.js");

  
    // Create a new vehiclefines
    router.post("/vehiclefines",auth,reqPerm, vehiclefines.create);
  
    // Retrieve all vehiclefines
    router.get("/vehiclefines",auth,reqPerm, vehiclefines.findAll);
  
   // Retrieve a single vehiclefines with id
    router.get("/vehiclefines/:id",auth,reqPerm, vehiclefines.findOne);
  
    // Update a vehiclefines with id
    router.put("/vehiclefines/:id",auth,reqPerm, vehiclefines.update);
  
    // Delete a vehiclefines with id
    router.delete("/vehiclefines/:id",auth,reqPerm, vehiclefines.delete);
  
    // Create a new vehiclefines
  

    module.exports = router
