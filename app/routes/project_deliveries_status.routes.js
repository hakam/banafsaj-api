    const Projectdeliveriesstatus = require("../controllers/project_deliveries_status.controller.js");
    const auth = require("../middleware/auth.js");
    const reqPerm = require("../middleware/reqPerm.js");

    var router = require("express").Router();
  
    // Create a new Projectdeliveriesstatus
    router.post("/Projectdeliveriesstatus",auth,reqPerm, Projectdeliveriesstatus.create);
  
    // Retrieve all Projectdeliveriesstatus
    router.get("/Projectdeliveriesstatus",auth,reqPerm, Projectdeliveriesstatus.findAll);
  
   // Retrieve a single Projectdeliveriesstatus with id
    router.get("/Projectdeliveriesstatus/:id",auth,reqPerm, Projectdeliveriesstatus.findOne);
  
    // Update a Projectdeliveriesstatus with id
    router.put("/Projectdeliveriesstatus/:id",auth,reqPerm, Projectdeliveriesstatus.update);
  
    // Delete a Projectdeliveriesstatus with id
    router.delete("/Projectdeliveriesstatus/:id",auth,reqPerm, Projectdeliveriesstatus.delete);
  
    // Create a new Projectdeliveriesstatus
  

    module.exports = router
