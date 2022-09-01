    const payment_threshold = require("../controllers/payment_threshold.controller.js");
    const auth = require("../middleware/auth.js");
    const reqPerm = require("../middleware/reqPerm.js");

    var router = require("express").Router();
  
    // Create a new payment_threshold
    router.post("/payment_threshold",auth,reqPerm, payment_threshold.create);
  
    // Retrieve all payment_threshold
    router.get("/payment_threshold",auth,reqPerm, payment_threshold.findAll);
  
   // Retrieve a single payment_threshold with id
    router.get("/payment_threshold/:id",auth,reqPerm, payment_threshold.findOne);
  
    // Update a payment_threshold with id
    router.put("/payment_threshold/:id",auth,reqPerm,payment_threshold.update);
  
    // Delete a payment_threshold with id
    router.delete("/payment_threshold/:id",auth,reqPerm, payment_threshold.delete);
  
    // Create a new payment_threshold
  

    module.exports = router
