    const latRequest = require("../controllers/lta_request.controller.js");
    const auth = require("../middleware/auth.js");
    const reqPerm = require("../middleware/reqPerm.js");

    var router = require("express").Router();
  
    // Create a new latRequest
    router.post("/latRequest",auth,reqPerm, latRequest.create);
  
    // Retrieve all latRequest
    router.get("/latRequest",auth,reqPerm, latRequest.findAll);
  
   // Retrieve a single latRequest with id
    router.get("/latRequest/:id",auth,reqPerm, latRequest.findOne);
  
    // Update a latRequest with id  
    router.put("/latRequest/:id",auth,reqPerm,latRequest.update);
    router.put("/latRequest/status/:id",auth,reqPerm, latRequest.updateStatus);

  
    // Delete a latRequest with id
    router.delete("/latRequest/:id",auth,reqPerm, latRequest.delete);
  
    // Create a new latRequest
  

    module.exports = router
