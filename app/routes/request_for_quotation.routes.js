    const requestforquotation = require("../controllers/request_for_quotation.controller.js");
    const auth = require("../middleware/auth.js");

    var router = require("express").Router();
    const reqPerm = require("../middleware/reqPerm.js");

  
    // Create a new requestforquotation
    router.post("/requestforquotation",auth,reqPerm, requestforquotation.create);
  
    // Retrieve all requestforquotation
    router.get("/requestforquotation",auth,reqPerm, requestforquotation.findAll);
  
   // Retrieve a single requestforquotation with id
    router.get("/requestforquotation/:id",auth,reqPerm, requestforquotation.findOne);
  
    // Update a requestforquotation with id
    router.put("/requestforquotation/:id",auth,reqPerm, requestforquotation.update);
  
    // Delete a requestforquotation with id
    router.delete("/requestforquotation/:id",auth,reqPerm, requestforquotation.delete);
  
    // Create a new requestforquotation
  

    module.exports = router
