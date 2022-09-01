    const prsSteps = require("../controllers/prsSteps.controller.js");
    const auth = require("../middleware/auth.js");

    var router = require("express").Router();
    const reqPerm = require("../middleware/reqPerm.js");

  
    // Create a new prsSteps
    router.post("/prsSteps",auth,reqPerm, prsSteps.create);
  
    // Retrieve all prsSteps
    router.get("/prsSteps",auth,reqPerm, prsSteps.findAll);
  
   // Retrieve a single prsSteps with id
    router.get("/prsSteps/:id",auth,reqPerm, prsSteps.findOne);
  
    // Update a prsSteps with id
    router.put("/prsSteps/:id",auth,reqPerm, prsSteps.update);
  
    // Delete a prsSteps with id
    router.delete("/prsSteps/:id",auth,reqPerm, prsSteps.delete);
  
    // Create a new prsSteps
  

    module.exports = router
