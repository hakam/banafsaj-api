    const projectphases = require("../controllers/project_phases.controller.js");
    const auth = require("../middleware/auth.js");
    const reqPerm = require("../middleware/reqPerm.js");

    var router = require("express").Router();
  
    // Create a new projectphases
    router.post("/projectphases",auth,reqPerm, projectphases.create);
  
    // Retrieve all projectphases
    router.get("/projectphases",auth,reqPerm, projectphases.findAll);
  
   // Retrieve a single projectphases with id
    router.get("/projectphases/:id",auth,reqPerm, projectphases.findOne);
  
    // Update a projectphases with id
    router.put("/projectphases/:id",auth,reqPerm, projectphases.update);
  
    // Delete a projectphases with id
    router.delete("/projectphases/:id",auth,reqPerm, projectphases.delete);
  
    // Create a new projectphases
  

    module.exports = router
