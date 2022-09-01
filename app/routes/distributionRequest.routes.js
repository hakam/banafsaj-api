    const distributionRequest = require("../controllers/distributionRequest.controller.js");
    const auth = require("../middleware/auth.js");
    const reqPerm = require("../middleware/reqPerm.js");

    var router = require("express").Router();
  
    // Create a new distributionRequest
    router.post("/distributionRequest",auth,reqPerm, distributionRequest.create);
  
    // Retrieve all distributionRequest
    router.get("/distributionRequest",auth,reqPerm, distributionRequest.findAll);
  
   // Retrieve a single distributionRequest with id
    router.get("/distributionRequest/:id",auth,reqPerm, distributionRequest.findOne);
  
    // Update a distributionRequest with id
    router.put("/distributionRequest/:id",auth,reqPerm, distributionRequest.update);
  
    // Delete a distributionRequest with id
    router.delete("/distributionRequest/:id",auth,reqPerm, distributionRequest.delete);
  
    // Create a new distributionRequest
  

    module.exports = router
