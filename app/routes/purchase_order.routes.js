    const purchaseorder = require("../controllers/purchase_order.controller.js");
    const auth = require("../middleware/auth.js");

    var router = require("express").Router();
    const reqPerm = require("../middleware/reqPerm.js");

  
    // Create a new purchaseorder
    router.post("/purchaseorder",auth,reqPerm, purchaseorder.create);
  
    // Retrieve all purchaseorder
    router.get("/purchaseorder",auth,reqPerm, purchaseorder.findAll);
  
   // Retrieve a single purchaseorder with id
    router.get("/purchaseorder/:id",auth,reqPerm, purchaseorder.findOne);
  
    // Update a purchaseorder with id
    router.put("/purchaseorder/:id",auth,reqPerm, purchaseorder.update);
  
    // Delete a purchaseorder with id
    router.delete("/purchaseorder/:id",auth,reqPerm, purchaseorder.delete);
  
    // Create a new purchaseorder
  

    module.exports = router
