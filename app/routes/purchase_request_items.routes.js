    const purchase_request_items = require("../controllers/purchase_request_items.controller.js");
    const auth = require("../middleware/auth")

    var router = require("express").Router();
    const reqPerm = require("../middleware/reqPerm.js");

  
    // Create a new Purchase_request_items
    router.post("/purchase_request_items",auth,reqPerm, purchase_request_items.create);
  
    // Retrieve all Purchase_request_items
    router.get("/purchase_request_items",auth,reqPerm, purchase_request_items.findAll);
  
   // Retrieve a single Purchase_request_items with id
    router.get("/purchase_request_items/:id",auth,reqPerm, purchase_request_items.findOne);
  
    // Update a Purchase_request_items with id
    router.put("/purchase_request_items/:id",auth,reqPerm, purchase_request_items.update);
  
    // Delete a Purchase_request_items with id
    router.delete("/purchase_request_items/:id",auth,reqPerm, purchase_request_items.delete);
  
    // Create a new Purchase_request_items
  
      
    module.exports = router
