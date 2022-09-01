    const fuel = require("../controllers/fuel.controller.js");
    const auth = require("../middleware/auth.js");
    const reqPerm = require("../middleware/reqPerm.js");

    var router = require("express").Router();
  
    // Create a new fuel
    router.post("/fuel",auth,reqPerm, fuel.create);
  
    // Retrieve all fuel
    router.get("/fuel",auth,reqPerm, fuel.findAll);
  
   // Retrieve a single fuel with id
    router.get("/fuel/:id",auth,reqPerm, fuel.findOne);
  
    // Update a fuel with id
    router.put("/fuel/:id",auth,reqPerm, fuel.update);
  
    // Delete a fuel with id
    router.delete("/fuel/:id",auth,reqPerm, fuel.delete);
  
    // Create a new fuel
  

    module.exports = router
