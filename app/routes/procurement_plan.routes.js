    const procurementplan = require("../controllers/procurement_plan.controller.js");
    const auth = require("../middleware/auth.js");

    const reqPerm = require("../middleware/reqPerm.js");

    var router = require("express").Router();
  
    // Create a new procurementplan
    router.post("/procurementplan",auth,reqPerm, procurementplan.create);
  
    // Retrieve all procurementplan
    router.get("/procurementplan",auth,reqPerm, procurementplan.findAll);
  
   // Retrieve a single procurementplan with id
    router.get("/procurementplan/:id",auth,reqPerm, procurementplan.findOne);
  
    // Update a procurementplan with id
    router.put("/procurementplan/:id",auth,reqPerm, procurementplan.update);
  
    // Delete a procurementplan with id
    router.delete("/procurementplan/:id",auth,reqPerm, procurementplan.delete);
  
    // Create a new procurementplan
  

    module.exports = router
