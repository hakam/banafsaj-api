    const lta_request_items = require("../controllers/lta_request_items.controller.js");
    const auth = require("../middleware/auth")

    const reqPerm = require("../middleware/reqPerm.js");

    var router = require("express").Router();
  
    // Create a new lta_request_items
    router.post("/lta_request_items",auth,reqPerm, lta_request_items.create);
  
    // Retrieve all lta_request_items
    router.get("/lta_request_items",auth,reqPerm, lta_request_items.findAll);
  
   // Retrieve a single lta_request_items with id
    router.get("/lta_request_items/:id",auth,reqPerm, lta_request_items.findOne);
  
    // Update a lta_request_items with id
    router.put("/lta_request_items/:id",auth,reqPerm, lta_request_items.update);
  
    // Delete a lta_request_items with id
    router.delete("/lta_request_items/:id",auth,reqPerm, lta_request_items.delete);
  
    // Create a new lta_request_items
  

    module.exports = router
