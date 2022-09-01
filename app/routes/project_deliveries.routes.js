    const projectdeliveries = require("../controllers/project_deliveries.controller.js");
    const auth = require("../middleware/auth.js");
    const reqPerm = require("../middleware/reqPerm.js");

    var router = require("express").Router();
  
    // Create a new projectdeliveries
    router.post("/projectdeliveries",auth,reqPerm, projectdeliveries.create);
  
    // Retrieve all projectdeliveries
    router.get("/projectdeliveries",auth,reqPerm, projectdeliveries.findAll);
  
   // Retrieve a single projectdeliveries with id
    router.get("/projectdeliveries/:id",auth,reqPerm, projectdeliveries.findOne);
  
    // Update a projectdeliveries with id
    router.put("/projectdeliveries/:id",auth,reqPerm, projectdeliveries.update);
  
    // Delete a projectdeliveries with id
    router.delete("/projectdeliveries/:id",auth,reqPerm, projectdeliveries.delete);
  
    // Create a new projectdeliveries
  

    module.exports = router
