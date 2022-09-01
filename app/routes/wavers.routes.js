    const wavers = require("../controllers/wavers.controller.js");
    const auth = require("../middleware/auth.js");
    const reqPerm = require("../middleware/reqPerm.js");

  
    var router = require("express").Router();
  
    // Create a new wavers
    router.post("/wavers",auth,reqPerm, wavers.create);
  
    // Retrieve all wavers
    router.get("/wavers",auth,reqPerm, wavers.findAll);
  
   // Retrieve a single wavers with id
    router.get("/wavers/:id",auth,reqPerm, wavers.findOne);
  
    // Update a wavers with id
    router.put("/wavers/:id",auth,reqPerm,wavers.update);
  
    // Delete a wavers with id
    router.delete("/wavers/:id",auth,reqPerm, wavers.delete);
  
    // Create a new wavers
  
    module.exports = router
