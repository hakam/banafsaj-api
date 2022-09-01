    const prpayments = require("../controllers/pr_payments.controller.js");
    const auth = require("../middleware/auth.js");
    const reqPerm = require("../middleware/reqPerm.js");

    var router = require("express").Router();
  
    // Create a new prpayments
    router.post("/prpayments",auth,reqPerm, prpayments.create);
  
    // Retrieve all prpayments
    router.get("/prpayments",auth,reqPerm, prpayments.findAll);
  
   // Retrieve a single prpayments with id
    router.get("/prpayments/:id",auth,reqPerm, prpayments.findOne);
  
    // Update a prpayments with id
    router.put("/prpayments/:id",auth,reqPerm,prpayments.update);
  
    // Delete a prpayments with id
    router.delete("/prpayments/:id",auth,reqPerm, prpayments.delete);
  
    // Create a new prpayments
  

    module.exports = router
