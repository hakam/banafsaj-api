    const vehicleservices = require("../controllers/vehicle_services.controller.js");
    const auth = require("../middleware/auth.js");

    var router = require("express").Router();
    const reqPerm = require("../middleware/reqPerm.js");

  
    // Create a new vehicleservices
    router.post("/vehicleservices",auth,reqPerm, vehicleservices.create);
  
    // Retrieve all vehicleservices
    router.get("/vehicleservices",auth,reqPerm, vehicleservices.findAll);
  
   // Retrieve a single vehicleservices with id
    router.get("/vehicleservices/:id",auth,reqPerm, vehicleservices.findOne);
  
    // Update a vehicleservices with id
    router.put("/vehicleservices/:id",auth,reqPerm, vehicleservices.update);
  
    // Delete a vehicleservices with id
    router.delete("/vehicleservices/:id",auth,reqPerm, vehicleservices.delete);
  
    // Create a new vehicleservices
  

    module.exports = router
