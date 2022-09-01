    const serviceagreements = require("../controllers/service_agreements.controller.js");
    const auth = require("../middleware/auth.js");
  
    var router = require("express").Router();
    const reqPerm = require("../middleware/reqPerm.js");

  
    // Create a new serviceagreements
    router.post("/serviceagreements",auth,reqPerm, serviceagreements.create);
  
    // Retrieve all serviceagreements
    router.get("/serviceagreements",auth,reqPerm, serviceagreements.findAll);
  
   // Retrieve a single serviceagreements with id
    router.get("/serviceagreements/:id",auth,reqPerm, serviceagreements.findOne);
  
    // Update a serviceagreements with id
    router.put("/serviceagreements/:id",auth,reqPerm,serviceagreements.update);
  
    // Delete a serviceagreements with id
    router.delete("/serviceagreements/:id",auth,reqPerm, serviceagreements.delete);
  
    // Create a new serviceagreements
  

    module.exports = router
