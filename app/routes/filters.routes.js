    const filters = require("../controllers/filters.controller.js");
    const auth = require("../middleware/auth.js");
    const reqPerm = require("../middleware/reqPerm.js");

    var router = require("express").Router();
  
    // Create a new filters
    router.post("/filters",auth,reqPerm, filters.create);
  
    // Retrieve all filters
    router.get("/filters",auth,reqPerm, filters.findAll);
  
   // Retrieve a single filters with id
    router.get("/filters/:id",auth,reqPerm, filters.findOne);
  
    // Update a filters with id
    router.put("/filters/:id",auth,reqPerm, filters.update);
  
    // Delete a filters with id
    router.delete("/filters/:id",auth,reqPerm, filters.delete);
  
    // Create a new filters
  

    module.exports = router
