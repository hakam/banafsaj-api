    const exrate = require("../controllers/exrate.controller.js");
    const auth = require("../middleware/auth")
    var router = require("express").Router();
    const reqPerm = require("../middleware/reqPerm.js");

    // Create a new exrate
    router.post("/exrate",auth,reqPerm, exrate.create);
  
    // Retrieve all exrate
    router.get("/exrate",auth,reqPerm, exrate.findAll);
  
   // Retrieve a single exrate with id
    router.get("/exrate/:id",auth,reqPerm, exrate.findOne);
  
    // Update a exrate with id
    router.put("/exrate/:id",auth,reqPerm, exrate.update);
  
    // Delete a exrate with id
    router.delete("/exrate/:id",auth,reqPerm, exrate.delete);
  
    // Create a new exrate
  

    module.exports = router
