    const service_contract = require("../controllers/service_contract.controller.js");
    const auth = require("../middleware/auth.js");
  
    var router = require("express").Router();
    const reqPerm = require("../middleware/reqPerm.js");

  
    // Create a new service_contract
    router.post("/service_contract",auth,reqPerm, service_contract.create);
  
    // Retrieve all service_contract
    router.get("/service_contract",auth,reqPerm, service_contract.findAll);
  
   // Retrieve a single service_contract with id
    router.get("/service_contract/:id",auth,reqPerm, service_contract.findOne);
  
    // Update a service_contract with id
    router.put("/service_contract/:id",auth,reqPerm,service_contract.update);
  
    // Delete a service_contract with id
    router.delete("/service_contract/:id",auth,reqPerm, service_contract.delete);
  
    // Create a new service_contract
  

    module.exports = router
