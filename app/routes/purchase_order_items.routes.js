    const purchase_order_items = require("../controllers/purchase_order_items.controller.js");
    const auth = require("../middleware/auth")

    var router = require("express").Router();
    const reqPerm = require("../middleware/reqPerm.js");

  
    // Create a new purchase_order_items
    router.post("/purchase_order_items",auth,reqPerm, purchase_order_items.create);
  
    // Retrieve all purchase_order_items
    router.get("/purchase_order_items",auth,reqPerm, purchase_order_items.findAll);
  
   // Retrieve a single purchase_order_items with id
    router.get("/purchase_order_items/:id",auth,reqPerm, purchase_order_items.findOne);
  
    // Update a purchase_order_items with id
    router.put("/purchase_order_items/:id",auth,reqPerm, purchase_order_items.update);
  
    // Delete a purchase_order_items with id
    router.delete("/purchase_order_items/:id",auth,reqPerm, purchase_order_items.delete);
  
    // Create a new purchase_order_items
  

    module.exports = router
