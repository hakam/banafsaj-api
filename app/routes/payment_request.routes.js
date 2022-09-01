    const paymentrequest = require("../controllers/payment_request.controller.js");
    const auth = require("../middleware/auth.js");
    const reqPerm = require("../middleware/reqPerm.js");

    var router = require("express").Router();
  
    // Create a new paymentrequest
    router.post("/paymentrequest",auth,reqPerm, paymentrequest.create);
  
    // Retrieve all paymentrequest
    router.get("/paymentrequest",auth,reqPerm, paymentrequest.findAll);
  
   // Retrieve a single paymentrequest with id
    router.get("/paymentrequest/:id",auth,reqPerm, paymentrequest.findOne);
  
    // Update a paymentrequest with id
    router.put("/paymentrequest/:id",auth,reqPerm, paymentrequest.update);
  
    // Delete a paymentrequest with id
    router.delete("/paymentrequest/:id",auth,reqPerm, paymentrequest.delete);
  
    // Create a new paymentrequest
  

    module.exports = router
