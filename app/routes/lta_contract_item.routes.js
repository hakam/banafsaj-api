    const lta_contract_item = require("../controllers/lta_contract_item.controller.js");
    const auth = require("../middleware/auth.js");
  
    const reqPerm = require("../middleware/reqPerm.js");

    var router = require("express").Router();
  
    // Create a new lta_contract_item
    router.post("/lta_contract_item",auth,reqPerm, lta_contract_item.create);
  
    // Retrieve all lta_contract_item
    router.get("/lta_contract_item",auth,reqPerm, lta_contract_item.findAll);
  
   // Retrieve a single lta_contract_item with id
    router.get("/lta_contract_item/:id",auth,reqPerm, lta_contract_item.findOne);
  
    // Update a lta_contract_item with id
    router.put("/lta_contract_item/:id",auth,reqPerm,lta_contract_item.update);
  
    // Delete a lta_contract_item with id
    router.delete("/lta_contract_item/:id",auth,reqPerm, lta_contract_item.delete);
  
    // Create a new lta_contract_item
  

    module.exports = router
